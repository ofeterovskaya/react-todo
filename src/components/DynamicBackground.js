import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import PropTypes from "prop-types";
import styles from "./SharedStyles.module.css"

export const P5Wrapper = ({ sketch }) => {
  const myRef = useRef();

  useEffect(() => {
    new p5(sketch, myRef.current);
  }, [sketch]);

  return <div className = {styles.DynamicBackground} ref={myRef} />;
};

const DynamicBackground = (p) => {
    let stars = [];
    const starsCount = 2000;
  
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      for (let i = 0; i < starsCount; i++) {
        stars[i] = {
          x: p.random(-p.width, p.width),
          y: p.random(-p.height, p.height),
          z: p.random(p.width),
        };
      }
    };
  
    p.draw = () => {
        // Update the canvas size
        p.resizeCanvas(p.windowWidth, document.body.offsetHeight);
      
        p.background(p.color(2, 11, 58));
        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const sx = p.map(star.x / star.z, 0, 1, 0, p.width);
          const sy = p.map(star.y / star.z, 0, 1, 0, p.height);
          const r = p.map(star.z, 0, p.width, 7, 0);
          p.ellipse(sx, sy, r, r);
          star.z -= 1;
          if (star.z < 1) {
            star.z = p.width;
            star.x = p.random(-p.width, p.width);
            star.y = p.random(-p.height, p.height);
          }
        }
      };
  };


  DynamicBackground.propTypes = {
    color: PropTypes.string,
    imageUrl: PropTypes.string
};
export default DynamicBackground;