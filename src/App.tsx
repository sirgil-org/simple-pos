import { Router, Link } from "wouter";
import { logo } from "./assets/index.ts";

import "./App.css";

import PageRouter from "./components/router.tsx";
import Seo from "./components/seo.tsx";

import { animated } from "react-spring";
import { useWiggle } from "./hooks/wiggle";

import { Notifications } from "react-push-notification";

// Home function that is reflected across the site
export default function Home() {
  const [style, trigger]: any = useWiggle({ x: 5, y: 5, scale: 1 });

  return (
    <Router>
      <Notifications />

      <Seo />
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
