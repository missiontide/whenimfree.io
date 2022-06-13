import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

import "@fontsource/montserrat";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CreateScheduler.css';
import '../styles/EventNameInput.css'
import '../styles/Calendar.css'
import '../styles/TimeSelector.css'
import '../styles/AvailabilityApp.css'
import '../styles/AvailabilityGrid.css'
import '../styles/AvailabilityList.css'
import '../styles/phoneStyles.css'

function MyApp({ Component, pageProps }) {
    /*
    Enable Fathom Analytics on site
     */
    const router = useRouter();

    useEffect(() => {
        // Initialize Fathom when the app loads
        // Example: yourdomain.com
        //  - Do not include https://
        //  - This must be an exact match of your domain.
        //  - If you're using www. for your domain, make sure you include that here.
        Fathom.load("GAATAYPY", {
            includedDomains: ['whenimfree.io'],
        });

        function onRouteChangeComplete() {
            Fathom.trackPageview();
        }
        // Record a pageview when route changes
        router.events.on('routeChangeComplete', onRouteChangeComplete);

        // Unassign event listener
        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete);
        };
    }, []);

    return <Component {...pageProps} />
}

export default MyApp
