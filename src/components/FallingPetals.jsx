import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import lily1 from "../assets/petals/lily1.png";
import lily from "../assets/petals/lily.png";
import rose from "../assets/petals/rose.png";
import marigold from "../assets/petals/marigold.png";
import lotus from "../assets/petals/lotus.png";
// import hibiscus1 from "../assets/petals/hibiscus1.png";
// import hibiscus2 from "../assets/petals/hibiscus1.png";
import mangnolia from "../assets/petals/mangnolia.png";
import peony from "../assets/petals/peony.png";
import peony1 from "../assets/petals/peony1.png";
import cherryblossom from "../assets/petals/cherryblossom.png";
import cherryblossom1 from "../assets/petals/cherryblossom1.png";
import cherryblossom2 from "../assets/petals/cherryblossom2.png";
import poppy from "../assets/petals/poppy.png";
import sunflower from "../assets/petals/sunflower.png";
import whitejasmine from "../assets/petals/whitejasmine.png";
import hisbicus1 from "../assets/petals/hisbicus1.png";
import hisbicus2 from "../assets/petals/hisbicus2.png";

export default function FallingPetals() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 h-full w-full"
      options={{
        fullScreen: { enable: false }, // ← must be false so it uses the parent height
        fpsLimit: 60,
        particles: {
          number: { value: 22, density: { enable: true, area: 900 } },
          move: {
            direction: "bottom",
            enable: true,
            speed: 1.2,
            outModes: { default: "out" },
          },
          rotate: { random: true, animation: { enable: true, speed: 5 } },
          opacity: { value: { min: 0.35, max: 0.85 } },
          size: { value: { min: 18, max: 38 }, random: true },
          shape: {
            type: "image",
            image: [
              // Add one entry for each type of petal you generated
              { src: lily, width: 64, height: 64 },
              { src: rose, width: 64, height: 64 },
              { src: lily1, width: 64, height: 64 },
              { src: marigold, width: 64, height: 64 },
              { src: lotus, width: 64, height: 64 },
              { src: mangnolia, width: 64, height: 64 },
              { src: peony, width: 64, height: 64 },
              { src: peony1, width: 64, height: 64 },
              { src: cherryblossom, width: 64, height: 64 },
              { src: cherryblossom1, width: 64, height: 64 },
              { src: cherryblossom2, width: 64, height: 64 },
              { src: poppy, width: 64, height: 64 },
              { src: sunflower, width: 64, height: 64 },
              { src: whitejasmine, width: 64, height: 64 },
              { src: hisbicus1, width: 60, height: 60 },
              { src: hisbicus2, width: 60, height: 60 },

              // …add more entries as you create them
            ],
          },
        },
      }}
    />
  );
}
