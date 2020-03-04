import axios from 'axios';
import settings from '../settings.json';

export async function fetchAppCenterUrl(appName, releaseId) {
    try {
        const response = await axios.get(
            `https://api.appcenter.ms/v0.1/apps/companyName/${appName}/releases/${releaseId}`,
            {
                headers: {
                    'X-API-Token': settings.appCenterApiKey
                }
            });
        return response.data.download_url;
    } catch (error) {
        console.error(error);
        return '';
    }
};

export async function fetchLatestReleaseId(appName, distGroup) {
    try {
        const response = await axios.get(
            `https://api.appcenter.ms/v0.1/apps/companyName/${appName}/distribution_groups/${distGroup}/releases`,
            {
                headers: {
                    'X-API-Token': settings.appCenterApiKey
                }
            });
        return response.data[0].id;
    } catch (error) {
        console.error(error);
        return '';
    }
}