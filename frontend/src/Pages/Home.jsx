import "./Home.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // Import useNavigate

export default function Home() {
  const navigate = useNavigate();  // Initialize navigate

  // Handler for button click
  const startJourney = () => {
    navigate("/mood-tracker");  // Change this path if your route differs
  };

  return (
    <section className="hero">
      <div className="hero__inner">
        {/* ── Left column ─────────────────────────────────── */}
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Shedding light on<br />
            your darkest days
          </h1>

          <p>
            Eclipse is your gentle companion for mental-health awareness and
            self-care. Explore our mood checker, light moments, <br />
            and more — all in one safe space✨🤍✨.
          </p>

          {/* Attach onClick handler here */}
          <button onClick={startJourney}>Start Your Journey</button>
        </motion.div>

        {/* ── Right column — animated eclipse ─────────────── */}
        <motion.div
          className="hero__eclipse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          {/* dark disc slides completely off → bright moon shows */}
          <motion.div
            className="eclipse__shadow"
            initial={{ x: 0 }}          // start fully covering
            animate={{ x: 330 }}        // 320-px disc + 10-px buffer
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

