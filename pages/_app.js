import '@styles/globals.css';
import Footer from '../components/Footer';
import Hamburger from '../components/Hamburger';
import { PageTransition } from "../components/PageTransition";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";
import Script from 'next/script';


function Application({ Component, pageProps }) {
 

  return ( 
    <>
      
      
     <div className="center">
     {/* <Script
        src="https://js.wpadmngr.com/static/adManager.js"
        data-admpid="82683"
        strategy="afterInteractive"
      /> */}
        <GoogleAnalytics measurementId="G-REYHDZZ5K8" />
        {/* <Script async data-id="101405628" src="//static.getclicky.com/js"></Script> */}
     
        <PageTransition>  
          <Hamburger />
         <Component {...pageProps} />
          <Footer />
        </PageTransition>
     </div>
   </>
  );
}




export default Application;
