import { useEffect, useRef } from "react";

import NavBar from "./Components/NavBar";
//import cardImage from "./assets/images/robotic-equipment-industrial-background-vector-16631660.jpg";
import "./home.css";
import { Outlet } from "react-router-dom";

function App() {
  const HomePageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (HomePageRef.current) {
      HomePageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <NavBar />
      <div>
        <Outlet />
        {/* <AnimatedComponennt ref={HomePageRef} />
        <HomePage /> */}
      </div>
    </>
  );
}

export default App;
