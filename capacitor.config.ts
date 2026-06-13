import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ge.tsu.studentportal',
  appName: 'TSU Student Portal',
  webDir: '.output/public',
  server: {
    url: 'https://tsu-dashboard-5.vercel.app/',
    cleartext: false
  },
};

export default config;

