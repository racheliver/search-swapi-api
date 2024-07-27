const path = require('path');

module.exports = {
  // ... other configurations
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/types')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};
