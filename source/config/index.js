import * as dev from './dev';
import * as prod from './prod';
const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return prod;
  }
  return dev;
};
const config = getConfig();
export default config;
