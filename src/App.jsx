import { Router, Link } from "wouter";
import { logo } from "./assets";

import "./App.css";

import PageRouter from "./components/router.jsx";
import Seo from "./components/seo.jsx";

import { animated } from "react-spring";
import { useWiggle } from "./hooks/wiggle";

// Home function that is reflected across the site
export default function Home() {
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });

  return (
    <Router>
      <Seo />
      <nav className="flex items-center mb-[50px]">
        <animated.div onMouseEnter={trigger} style={style}>
          <img src={logo} width="50" />
        </animated.div>
        <div className="grow text-center">
          <Link href="/">Home</Link>
          <span className="divider">|</span>
          <Link href="/about">About</Link>
        </div>
      </nav>
      <main role="main">
        {/* Router specifies which component to insert here as the main content */}
        <PageRouter />
      </main>
      {/* Footer links to Home and About, Link elements matched in router.jsx */}
    </Router>
  );
}
