import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import config from '../../../secrets/planox-c7beb-firebase-adminsdk-2ibxe-2ae0eb81bd.json';

// const config = {
//     privateKey: process.env.PRIVATE_KEY,
//     clientEmail: process.env.CLIENT_EMAIL,
//     projectId: process.env.PROJECT_ID
// };

// console.log("Config:", config);

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(config as ServiceAccount),
        databaseURL: ` https://${process.env.PROJECT_ID}.firebaseio.com`,
    });
}

export { firebaseAdmin };