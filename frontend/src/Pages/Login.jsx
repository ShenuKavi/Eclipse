import { useState } from 'react';
import { motion } from 'framer-motion';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome back to Eclipse, ${email} 🌙`);
  };

  return (
    <section className="login-hero">
      <div className="login__inner">
        <motion.div
          className="login__copy"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Sign In to <br />
            <span>Eclipse</span>
          </h1>

          <form className="login-form" onSubmit={handleSubmit}>
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
              Sign In
            </motion.button>
          </form>

          <div className="login-links">
            <a href="#">Forgot your password?</a>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          </div>
        </motion.div>

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