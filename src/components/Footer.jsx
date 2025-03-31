import { HelpCircle, Settings } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CustomSidebar from "./CustomSidebar";

const Footer = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="p-4 absolute bottom-4 flex w-full items-center justify-between">
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          className="cursor-pointer left-4"
        >
          <HelpCircle size={36} />
        </motion.button>
        <motion.button
          onClick={() => setSettingsOpen(true)}
          whileTap={{
            scale: 0.8,
          }}
          className="cursor-pointer right-4"
        >
          <Settings size={36} />
        </motion.button>
      </div>

      <CustomSidebar open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Sidebar />
      </CustomSidebar>
    </>
  );
};

export default Footer;
