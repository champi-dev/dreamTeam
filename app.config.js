import 'dotenv/config';

export default {
  name: "MyApp",
  slug: "my-app",
  version: "1.0.0",
  extra: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  },
};