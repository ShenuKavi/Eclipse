import { useState } from 'react';
import { motion } from 'framer-motion';
import './Login.css'; // ✅ Reuse the same styles

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome to Eclipse, ${username} 🌙`);
  };

  return (
    <section className="login-hero">
      <div className="login__inner">
        {/* Left Column – Signup Form */}
        <motion.div
          className="login__copy"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Create Your <br />
            <span>Eclipse</span> Account
          </h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </form>

          <div className="login-links">
            <p>Already have an account? <a href="/login">Sign in</a></p>
          </div>
        </motion.div>

        {/* Right Column – Animated Eclipse */}
        <motion.div
          className="hero__eclipse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <motion.div
            className="eclipse__shadow"
            initial={{ x: 0 }}
            animate={{ x: 330 }}
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
