import 'dotenv/config';

export default {
  extra: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    "eas": {
      "projectId": "c5dc094c-e017-46cb-8d6b-70c6e4f2b6d2"
    }
  },
  name: "dreamTeam",
  slug: "dreamTeam",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    "supportsTablet": true,
    "googleServicesFile": "./GoogleService-Info.plist",
    "bundleIdentifier": "com.champi.dreamteam"
  },
  android: {
    "package": "com.champi.dreamteam",
    "googleServicesFile": "./google-services.json",
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    },
    "permissions": [
      "android.permission.RECORD_AUDIO"
    ]
  },
  web: {
    "favicon": "./assets/favicon.png"
  },
  plugins: [
    "expo-font",
    [
      "expo-image-picker",
      {
        "photosPermission": "Allow dreamTeam to access your photos",
        "cameraPermission": "Allow dreamTeam to take pictures",
        "microphonePermission": "Allow dreamTeam to access your microphone"
      }
    ],
    "expo-localization"
  ]
};