import { useEffect, useRef, useState } from "react";

//import cardImage from "./assets/images/robotic-equipment-industrial-background-vector-16631660.jpg";
import { useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NormalNavbar/NavBar";

type NavBarContext = {
  navBarInfo: DOMRect | null;
};

function MainPage() {
  const HomePageRef = useRef<HTMLDivElement>(null);

  const [navBarInfo, setNavBarInfo] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (HomePageRef.current) {
      HomePageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <NavBar setNavBarInfo={setNavBarInfo} />
      <Outlet />
    </>
  );
}

export const useNavBarInfo = () => {
  return useOutletContext<NavBarContext>();
};

export default MainPage;
