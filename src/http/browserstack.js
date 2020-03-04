import axios from 'axios';
import settings from '../settings.json';
import FormData from 'form-data';

export async function uploadApp(url) {
    try {
        const body = new FormData();
        body.append("data", `{\"url\": \"${url}\"}`);

        const { data } = await axios.post(
            'https://api-cloud.browserstack.com/app-automate/upload',
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=' + body.getBoundary()
                },
                auth: {
                    username: settings.browserstackUsername,
                    password: settings.browserstackSecret
                }
            });

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}