module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: 
      [
        [
          'module-resolver',
          {
            extensions: [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
              '.android.js',
              '.android.tsx',
              '.ios.js',
              '.ios.tsx'
            ],
            root: ['.'],
            alias: {
              "@navigation/*": ["./src/navigation/*"],
              "@components/*": ["./src/components/*"],
              "@assets/*": ["./src/assets/*"],
              "@services/*": ["./src/services/*"],
              "@views/*": ["./src/views/*"],
              "@utils/*": ["./src/utils/*"]
            }
          }
        ]
      ]
    
  };  