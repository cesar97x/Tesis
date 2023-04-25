import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ups.cocoments',
  appName: 'La Picanteria',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '155971214151-58jinri3itmuf09mor4iq5jjiunbgcg8.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;