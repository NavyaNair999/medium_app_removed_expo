module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],

    plugins: [
      [
        'module-resolver',
        {
          cwd: 'packagejson',
          root: ['./'],

          alias: {
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
