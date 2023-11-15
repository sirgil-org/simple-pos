import { Router, Link } from "wouter";
import { logo } from "./assets/index.ts";
import { SlBasket, SlBasketLoaded, SlHome, SlInfo, SlList, SlPieChart } from "react-icons/sl";

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
import { Key } from "react";

// Home function that is reflected across the site
export default function Home() {
  const [style, trigger]: any = useWiggle({ x: 5, y: 5, scale: 1 });

  const routes = [
    { name: 'Home', path: '/', icon: <SlHome className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'New Order', path: '/new', icon: <SlBasket className="w-5 h-5 sm:w-6 sm:h-6"/> },
    { name: 'Expenses', path: '/expenses', icon: <SlList className="w-5 h-5 sm:w-6 sm:h-6"/> },
    { name: 'Reports', path: '/reports', icon: <SlPieChart className="w-5 h-5 sm:w-6 sm:h-6"/> },
    { name: 'About', path: '/about', icon: <SlInfo className="w-5 h-5 sm:w-6 sm:h-6"/> }
  ]

  return (
    <Router>
      <Notifications />

      <Seo />
      {/* <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Hotspot</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <div className="bg-base-100">

        <nav role="tablet & desktop nav" className="fixed top-0 left-0 h-screen w-fit xl:w-64 bg-base-200/90 hidden sm:flex flex-col gap-2 justify-content-center px-1.5 sm:py-4 backdrop-blur-md">
          <div className="px-1 flex items-center justify-center xl:justify-start gap-2">
            <animated.div onMouseEnter={trigger} style={style}>
              <img src={logo} width="50" />
            </animated.div>
            <span className="hidden xl:block text-xl font-extrabold text-base-content">HOTSPOT</span>
          </div>
          {
            routes.map((route, key: Key) => (
              <Link to={route.path} className="flex flex-col xl:flex-row !text-base-content items-center font-semibold gap-2 xl:gap-4 cursor-pointer py-2 px-2 xl:px-4 rounded-lg hover:bg-base-100" key={key + route.name}>
                <span>{route.icon}</span>
                <span className="text-[.6rem] xl:text-base">{route.name}</span>
              </Link>
            ))
          }
        </nav>

        <nav role="mobile nav" className="sm:hidden bg-base-200/90 backdrop-blur-md px-2 py-2 fixed flex justify-around items-center z-50 bottom-0 w-full">
          {
            routes.map((route, key: Key) => (
              <Link to={route.path} className="flex flex-col gap-0.5 justify-center items-center !text-base-content " key={key + route.name}>
                <span>{route.icon}</span>
                <span className="text-[.6rem]">{route.name}</span>
              </Link>
            ))
          }
        </nav>

        <main role="main" className="sm:ml-20 xl:ml-64 w-auto h-screen py-5 px-3">
          {/* Router specifies which component to insert here as the main content */}
            <PageRouter />
        </main>
      </div>


      {/* <nav className="flex items-center mb-[50px]">
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
      </nav> */}      .
      {/* Footer links to Home and About, Link elements matched in router.tsx */}
    </Router>
  );
}
