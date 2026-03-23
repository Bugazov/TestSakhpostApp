module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@app': './src/app',
          '@pages': './src/pages',
          '@widgets': './src/widgets',
          '@entities': './src/entities',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
