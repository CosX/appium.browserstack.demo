import wd from 'wd';
import glob from 'glob';
import path from 'path';
import { fetchAppCenterUrl, fetchLatestReleaseId } from './http/appcenter';
import { uploadApp } from './http/browserstack';
import { configureLogging } from './helpers/logging';
import settings from './settings.json';
import deviceConfig from './deviceConfig.json';

const asserters = wd.asserters;

async function activateUpload(deviceGroup){
    const url = await fetchAppCenterUrl(
        settings[`${deviceGroup.os}AppName`],
        await fetchLatestReleaseId(settings[`${deviceGroup.os}AppName`],
        settings.distGroup));
    
    const appId = await uploadApp(url);
    for (const device of deviceGroup.devices) {
        await doTests(deviceGroup, device, appId);
    }
}

async function doTests(deviceGroup, device, appId) {
    for (const version of device.versions) {
        let capabilities = {
            'device': device.name,
            'os_version': version,
            'browserstack.user': settings.browserstackUsername,
            'browserstack.key': settings.browserstackSecret,
            'build': deviceGroup.os,
            'app': appId.app_url,
            'browserstack.networkProfile': '4g-lte-high-latency'
        }
    
        const driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
        configureLogging(driver);

        for (const test of glob.sync(`./tests/${deviceGroup.os}/*.js`).map(file => require(path.resolve(file)))) {
            try {
                await test.execute(driver, asserters, capabilities);
            } catch (ex){
                console.error(ex);
            }
        }
    }
}

for (const deviceGroup of deviceConfig) {
    activateUpload(deviceGroup);
}