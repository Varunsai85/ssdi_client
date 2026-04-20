import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

const TopLoader = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress to 0 on mount/update
    setProgress(0);

    // Create a sequence of timers to simulate smooth progress
    // Step 1: Rapid start to 30%
    const t1 = setTimeout(() => setProgress(30), 100);
    // Step 2: Slower progress to 70%
    const t2 = setTimeout(() => setProgress(70), 400);
    // Step 3: Complete to 100%
    const t3 = setTimeout(() => setProgress(100), 800);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
         <motion.div
            key={location.pathname} // Crucial: Force a fresh animation on every route change
            initial={{ width: "0%", opacity: 1 }}
            animate={{ 
                width: `${progress}%`,
                opacity: progress === 100 ? 0 : 1
            }}
            transition={{ 
                width: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.5, delay: 0.2 } 
            }}
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
    </div>
  );
};

export default TopLoader;
