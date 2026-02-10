import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(
  new URL('.', import.meta.url)
);

export default config;
