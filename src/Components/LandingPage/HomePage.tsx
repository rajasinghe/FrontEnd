import anime from "animejs";
import "./homepage.css";
import { useEffect, useRef } from "react";
import AnimatedComponennt from "../AnimatedComponent/AnimatedComponennt";
import solarBackgroundImage from "../../assets/images/-1x-1.jpg";
import { Link } from "react-router-dom";
function HomePage() {
  /* const animeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    anime({
      targets: animeRef.current,
      rotate: anime.random(-360, 360),
      translateX: anime.random(0, 50),
      translateY: anime.random(0, 50),
      loop:3
    });
  }); */
  console.log("rendering component");
  return (
    <div className=" position-relative ">
      <div className="solarTechImg">
        <img src={solarBackgroundImage} alt="" />
      </div>
      <div className="gradient-overlay"></div>
      <div className="position-absolute top-0 text-overlay ">
        <p className="display-1 fw-bold text-white">Worlds No.1 Technology.</p>
        <p className=" display-1  fw-semibold ">Change With the World.</p>
        <p className=" display-2">Explore The Technology.</p>
        <Link to={"products"} className="btn btn-primary">
          Explore
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
