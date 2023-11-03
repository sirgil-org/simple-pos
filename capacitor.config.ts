import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'hotspot-admin',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.178.27:3000',
    cleartext: true,
  },
};

export default config;
