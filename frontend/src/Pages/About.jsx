import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./About.css";

/**
 * A galaxy‑themed "About" page for Team Eclipse – modern, lightweight & fully responsive.
 * – Smaller avatar cards
 * – Extra "Vision" section
 * – Denser star‑field & animated parallax layers for depth
 */
export default function AboutGalaxy() {
  const particlesRef = useRef([]);

  // ──────────────────────────────────────────
  // Create floating particles once on mount
  // ──────────────────────────────────────────
  useEffect(() => {
    const createParticles = () => {
      const total = 40; // more particles → richer background
      const list = [];
      for (let i = 0; i < total; i++) {
        list.push({
          id: i,
          size: Math.random() * 3 + 1,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speed: Math.random() * 0.4 + 0.15,
        });
      }
      particlesRef.current = list;
    };

    createParticles();
    // (Optional) regenerate on resize for better density
    // window.addEventListener("resize", createParticles);
    // return () => window.removeEventListener("resize", createParticles);
  }, []);

  // ──────────────────────────────────────────
  return (
    <section className="about-hero">
      {/* ✨ Dynamic floating particles */}
      {particlesRef.current.map((p) => (
        <span
          key={p.id}
          className="floating-particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            animationDuration: `${6 + p.speed * 12}s`,
            opacity: 0.9,
          }}
        />
      ))}

      <div className="about-content">
        {/* ───── Hero title ───── */}
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          🌖 About Team Eclipse
        </motion.h1>

        {/* ───── Intro paragraph ───── */}
        <motion.p
          className="about-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          We are two passionate undergraduates who believe even the darkest nights
          are followed by dawn. Eclipse is our ode to mental wellness — blending
          technology, kindness & art to help people rediscover their inner light.
        </motion.p>

        {/* ───── Team grid ───── */}
        <div className="team-grid">
          {/* Member 1 */}
          <motion.article
            className="member-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="photo-wrapper">
              <img src="/team/ishini.jpg" alt="Ishini" className="avatar" />
            </div>
            <h2 className="member-name">E.K Ishini Upekha Ellewela</h2>
            <p className="member-role">Frontend Developer · UI Designer</p>
          </motion.article>

          {/* Member 2 */}
          <motion.article
            className="member-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="photo-wrapper">
              <img src="/team/shehani.jpg" alt="Shehani" className="avatar" />
            </div>
            <h2 className="member-name">S.D Shehani Kavindya</h2>
            <p className="member-role">Content Creator · Co‑Developer</p>
          </motion.article>
        </div>

        {/* ───── Mission & Vision ───── */}
        <motion.section
          className="mission-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          <h3>Our Mission</h3>
          <p>
            "To craft a digital sanctuary where anyone feeling lost can pause, reflect, and reconnect with their inner light."
          </p>
        </motion.section>

        <motion.section
          className="mission-block vision"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <h3>Our Vision</h3>
          <p>
            A world where technology uplifts mental health — turning every eclipse into a moment of awe rather than fear.
          </p>
        </motion.section>
      </div>
    </section>
  );
}