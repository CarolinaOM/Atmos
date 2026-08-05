import React, { useEffect, useState } from "react";
import { useSpring, useTransform } from "framer-motion";

function AnimatedNumber({ value }) {
  const numericValue = typeof value === "number" ? value : parseFloat(value) || 0;
  
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [currentValue, setCurrentValue] = useState(numericValue);

  useEffect(() => {
    spring.set(numericValue);
  }, [numericValue, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setCurrentValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return <span>{currentValue}</span>;
}

export default AnimatedNumber;