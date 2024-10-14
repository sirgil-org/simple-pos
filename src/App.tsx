import PageRouter from "./router/router.tsx";
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { IonApp, setupIonicReact } from "@ionic/react";
// import "./theme/variables.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./swiper_styles.css";
// import AppUrlListener from "./app_url_listener";

setupIonicReact();

// Home function that is reflected across the site
export default function App() {
  return (
    <IonApp>
      {/* <AppUrlListener /> */}
      <PageRouter />
    </IonApp>
  );
}
