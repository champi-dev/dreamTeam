import 'dotenv/config';

export default {
  extra: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    expoProjectId: process.env.expoProjectId,
    "eas": {
      "projectId": "c5dc094c-e017-46cb-8d6b-70c6e4f2b6d2"
    }
  },
  name: "dreamTeam",
  slug: "dreamteam",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon_dreamteam.png",
  userInterfaceStyle: "automatic",
  splash: {
    "image": "./assets/splash_screen_dreamteam.png",
    "resizeMode": "cover",
    "backgroundColor": "#181829"
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
    "useNextNotificationsApi": true,
    "adaptiveIcon": {
      "foregroundImage": "./assets/icon_dreamteam.png",
      "backgroundColor": "#181829"
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
    "expo-localization",
    "react-native-compressor"
  ]
};