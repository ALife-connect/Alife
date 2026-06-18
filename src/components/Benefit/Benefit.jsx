import React from "react";
import { motion } from "framer-motion";
import "../Benefit/Benefit.css";

const Benefit = () => {
  // Framer Motion Animation Variants for Staggered Card Loadins
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section className="benefits-section">
      <div className="benefits-header">
        <span className="section-eyebrow">Why It Matters</span>
        <h2>The Power of Giving</h2>
        <p>Donating support isn't just life-saving for others—it transforms your own world too.</p>
      </div>

      <motion.div 
        className="benefits-modern-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Card 1: Health */}
        <motion.div className="benefit-card-modern" variants={cardVariants}>
          <div className="icon-wrapper brand-red">
            <img src="/images/Heart.png" alt="Heart Icon" />
          </div>
          <h3>Health Vitality</h3>
          <p>
            Regular donation reduces iron overload, balances cardiovascular health, 
            and provides crucial real-time health updates during screenings.
          </p>
        </motion.div>

        {/* Card 2: Mental */}
        <motion.div className="benefit-card-modern" variants={cardVariants}>
          <div className="icon-wrapper brand-green">
            <img src="/images/Brain.png" alt="Brain Icon" />
          </div>
          <h3>Mental Well-being</h3>
          <p>
            Experience the psychological validation of altruism. Purpose-driven activities 
            are clinically shown to boost personal life satisfaction scales.
          </p>
        </motion.div>

        {/* Card 3: Scheduling */}
        <motion.div className="benefit-card-modern" variants={cardVariants}>
          <div className="icon-wrapper brand-teal">
            <img src="/images/phone.png" alt="Phone Icon" />
          </div>
          <h3>Instant Coordination</h3>
          <p>
            No waiting rooms, no massive queues. Book rapid-response windows around your 
            schedule using our decentralized layout engine.
          </p>
        </motion.div>

        {/* Card 4: Community */}
        <motion.div className="benefit-card-modern" variants={cardVariants}>
          <div className="icon-wrapper brand-red">
            <img src="/images/heads.png" alt="Community Icon" />
          </div>
          <h3>Global Alliance</h3>
          <p>
            Join a borderless network of verified crisis response heroes making local 
            communities safer, healthier, and more resilient under stress.
          </p>
        </motion.div>

        {/* Card 5: Transparency */}
        <motion.div className="benefit-card-modern" variants={cardVariants}>
          <div className="icon-wrapper brand-teal">
            <img src="/images/chat.png" alt="Chat Icon" />
          </div>
          <h3>Absolute Transparency</h3>
          <p>
            Track your contribution path from point of transfer to destination. 
            See precisely how your support directly changes lives in real-time.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Benefit;