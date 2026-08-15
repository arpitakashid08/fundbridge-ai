import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleField from "../animations/ParticleField";
import RobotScene from "./RobotScene";

interface RobotIntroProps {
  onComplete: () => void;
}

const messages = [
  "Initializing funding intelligence",
  "Mapping the funding ecosystem",
  "Analyzing capital opportunities",
  "Preparing your funding journey",
];

export default function RobotIntro({
  onComplete,
}: RobotIntroProps) {
  const [message, setMessage] = useState(0);
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage((current) => {
        if (current < messages.length - 1) {
          return current + 1;
        }

        return current;
      });
    }, 1300);

    const welcomeTimer = setTimeout(() => {
      setWelcome(true);
    }, 5600);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 8500);

    return () => {
      clearInterval(interval);
      clearTimeout(welcomeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0b0b0a]"
    >
      <ParticleField />

      {/* Extremely subtle center light */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#c9a76a]/[0.035]
          blur-[150px]
        "
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center">

        {/* Status */}
        <AnimatePresence mode="wait">
          {!welcome && (
            <motion.div
              key={message}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                absolute
                top-[11%]
                text-center
                text-[10px]
                uppercase
                tracking-[0.38em]
                text-white/35
              "
            >
              {messages[message]}
              <span className="ml-2 text-[#c9a76a]">•••</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot */}
        <motion.div
          animate={{
            y: welcome ? -35 : 0,
            scale: welcome ? 0.86 : 1,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <RobotScene active />
        </motion.div>

        {/* Welcome */}
        <AnimatePresence>
          {welcome && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 1,
              }}
              className="
                absolute
                bottom-[11%]
                text-center
              "
            >
              <p
                className="
                  mb-4
                  text-[11px]
                  uppercase
                  tracking-[0.45em]
                  text-[#c9a76a]
                "
              >
                Welcome to
              </p>

              <h1
                className="
                  text-5xl
                  font-medium
                  tracking-[-0.06em]
                  text-white
                  md:text-7xl
                "
              >
                FundBridge{" "}
                <span className="text-[#c9a76a]">
                  AI
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                }}
                className="
                  mt-5
                  text-sm
                  tracking-wide
                  text-white/35
                "
              >
                Where ideas find capital.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom progress line */}
        {!welcome && (
          <div
            className="
              absolute
              bottom-[8%]
              h-px
              w-32
              overflow-hidden
              bg-white/[0.06]
            "
          >
            <motion.div
              className="h-full bg-[#c9a76a]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 5.5,
                ease: "linear",
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}