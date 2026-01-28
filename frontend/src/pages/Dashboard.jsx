// Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "../index.css";
import Hero from "../components/Hero";
import QuickActions from "../components/QuickActions";
import TransactionsPreview from "../components/Transactions";
import CardComponent from "../components/Card";

// ---------------------------
// Animation Variants
// ---------------------------

// Parent container stagger
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

// Slide + fade preset generator
const slide = (x = 0, y = 20) => ({
  hidden: { opacity: 0, x, y },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: .55, ease: "easeOut" },
  },
});

export default function Dashboard() {
  const navigate = useNavigate();



  return (
    <>
      <style>
        {`
        main{
          min-height: calc(100vh - 60px);
          width: 100%;
          max-width:1200px;
          margin: 0 auto;
        }
          `}
      </style>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="min-h-screen bg-slate-50 dark:bg-ink-900 text-slate-100 antialiased"
      >





        <div className="flex">


          <main>
            <div className="md:px-6">

              {/* HERO (slides from top -> down) */}
              <motion.div variants={slide(0, -50)}>
                <Hero />
              </motion.div>

              <div className="space-y-6">

                {/* QUICK ACTIONS (slides left -> right) */}
                <motion.div variants={slide(-60, 0)}>
                  <QuickActions />
                </motion.div>

                 {/* TRANSACTIONS PREVIEW (slides right -> left) */}
                <motion.div variants={slide(50, 0)}>
                  <TransactionsPreview
                    onShowAll={() => navigate("/transactions")}
                  />
                </motion.div>

                <motion.div variants={slide(-60, 0)}>
                  <CardComponent />
                </motion.div>

               

              </div>
            </div>
          </main>

          <motion.aside variants={slide(0, 75)} className="space-y-6">
            {/* <Buttons /> 
          <CardComponent /> */}
            {/* <GoalsRewards /> */}
          </motion.aside>
        </div>
      </motion.div>

    </>

  );
}
