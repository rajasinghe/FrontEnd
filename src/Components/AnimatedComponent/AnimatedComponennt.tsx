import { forwardRef, useEffect } from "react";
import "./AnimatedComponent.css";
import anime, { easings } from "animejs";
import useWindowSize from "../../Hooks/useWindowSize";

interface props {}

const AnimatedComponennt = forwardRef((props: props, ref: any) => {
  const timeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 750,
  });

  let { width, height } = useWindowSize();
  let columns: number = width / 50;
  let rows: number = height / 50;

  console.log(width);

  useEffect(() => {
    timeline.add({
      targets: ".item",
      scale: [
        /*{ value: 1, easing: "easeInOutQuad", duration: 1200 },*/
        { value: 0, easing: "easeOutSine", duration: 500 },
      ],
      delay: anime.stagger(anime.random(300, 500), {
        grid: [columns, rows],
        from: "center",
      }),
    });
  });

  return (
    <div className="staggeringGrid position-absolute top-0 left-0" ref={ref}>
      {Array.from({ length: rows }).map(() => (
        <div className="d-flex">
          {Array.from({ length: columns }).map(() => (
            <div className="item"></div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default AnimatedComponennt;
