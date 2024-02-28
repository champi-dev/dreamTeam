import 'dotenv/config';

export default {
  name: "MyApp",
  slug: "my-app",
  version: "1.0.0",
  android: {
    package: "com.champi.dreamteam"
  },
  ios: {
    "bundleIdentifier": "com.champi.dreamteam"
  },
  extra: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    "eas": {
      "projectId": "10819dba-f5b6-4eef-abd4-234f3093e7c0"
    }
  },
};