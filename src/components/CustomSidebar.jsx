import React from "react";
import { motion } from "motion/react";

const CustomSidebar = ({ open, onClose, children }) => {
  if (!open) return null;

  const handleOuterClick = (e) => {
    if (e.target.className.includes("custom-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="custom-modal-overlay fixed inset-0 bg-black/40 z-50"
      onClick={handleOuterClick}
    >
      <motion.div
        className="custom-sidebar fixed top-0 right-0 h-full shadow-lg"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CustomSidebar;
