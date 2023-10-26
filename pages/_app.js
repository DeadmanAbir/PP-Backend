import '../styles/globals.css'
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Footer from '../components/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from '../components/Navbar';
import { RecoilRoot } from 'recoil';
config.autoAddCss = false;
library.add(fas, fab);
function MyApp({ Component, pageProps }) {

  
  return <>
  <RecoilRoot>
  <Navbar />
  <Component {...pageProps} />
<Footer />
</RecoilRoot>

  </>
}

export default MyApp
