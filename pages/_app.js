import '../styles/globals.css'
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
library.add(fas, fab);
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
