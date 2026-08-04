import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

function AnimatedNumber({ value }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return display.on("change", (v) => setCurrentValue(v));
  }, [display]);

  return <span>{currentValue}</span>;
}

export default AnimatedNumber;