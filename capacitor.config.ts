import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.sirgil.app',
  appName: 'SimplePos',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.178.27:3000',
    cleartext: true,
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
  },
};

export default config;
