import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { colorStyle } from "../utils";

export default function Sidebar() {
  const [settings, setSettings] = useState({
    rounds: 3,
    questionsPerRound: 5,
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));
    console.log({ savedSettings })
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);


  const updateSetting = (key, delta) => {
    setSettings((prev) => {
      const updatedSettings = {
        ...prev,
        [key]: Math.max(1, prev[key] + delta), // Ensure value doesn't go below 1
      };
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  return (
    <div
      className="w-[400px] h-screen text-white p-6 rounded-lg shadow-lg"
      style={colorStyle}
    >
      <h2 className="text-xl font-bold text-center mb-4">Settings</h2>
      <hr className="border-gray-400 mb-4" />
      <div className="space-y-4">
        <SettingItem
          label="Rounds"
          value={settings.rounds}
          onIncrement={() => updateSetting("rounds", 1)}
          onDecrement={() => updateSetting("rounds", -1)}
        />
        <SettingItem
          label="Questions Per Round"
          value={settings.questionsPerRound}
          onIncrement={() => updateSetting("questionsPerRound", 1)}
          onDecrement={() => updateSetting("questionsPerRound", -1)}
        />
      </div>
    </div>
  );
}

function SettingItem({ label, value, onIncrement, onDecrement }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-lg">{label}</span>
      <div className="flex items-center gap-2">
        <motion.button
          className="w-8 h-8 bg-gray-700 rounded text-white text-xl cursor-pointer"
          onClick={onDecrement}
          whileTap={{ scale: 0.9 }}
        >
          -
        </motion.button>
        <span className="text-lg font-semibold">{value}</span>
        <motion.button
          className="w-8 h-8 bg-gray-700 rounded text-white text-xl cursor-pointer"
          onClick={onIncrement}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
