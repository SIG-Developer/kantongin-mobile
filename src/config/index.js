let config = require('./production');
if (__DEV__) {
  config = require('./development');
}
export default config.default;
