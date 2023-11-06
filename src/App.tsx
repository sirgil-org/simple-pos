import { Router, Link } from "wouter";
import { logo } from "./assets/index.ts";

// import "./App.css";

import PageRouter from "./components/router.tsx";
import Seo from "./components/seo.tsx";

import { animated } from "react-spring";
import { useWiggle } from "./hooks/wiggle";

import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css'; 


import { IonHeader, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import './theme/variables.css';

setupIonicReact();
import { Notifications } from 'react-push-notification';

// Home function that is reflected across the site
export default function Home() {
  const [style, trigger]: any = useWiggle({ x: 5, y: 5, scale: 1 });

  return (
    <Router>
      <Notifications />

      <Seo />
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Hotspot</IonTitle>
          </IonToolbar>
        </IonHeader>
        <nav className="flex items-center mb-[50px]">
          <animated.div onMouseEnter={trigger} style={style}>
            <img src={logo} width="50" />
          </animated.div>
          <div className="grow text-center">
            <Link href="/">Home</Link>
            <span className="divider">|</span>
            <Link href="/about">About</Link>
            <span className="divider">|</span>
            <Link href="/new">New Order</Link>
            <span className="divider">|</span>
            <Link href="/expenses">Expenses</Link>
            <span className="divider">|</span>
            <Link href="/reports">Reports</Link>
            </div>
        </nav>
        <main role="main" className="grow flex flex-col">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </main>
      {/* Footer links to Home and About, Link elements matched in router.tsx */}
    </Router>
  );
}
