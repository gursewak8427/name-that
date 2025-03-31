import React from 'react';
import { motion } from 'motion/react';
import { colorStyle } from '../utils';

const CustomModal = ({ open, onClose, children }) => {
    if (!open) return null;

    const handleOuterClick = (e) => {
        if (typeof e.target.className === 'string' && e.target.className.includes('custom-modal-overlay')) {
            onClose();
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };

    return (
        <div
            className="custom-modal-overlay fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={handleOuterClick}
        >
            <motion.div
                className="custom-modal-content p-5 rounded-lg shadow-lg"
                style={{ minWidth: '70%', minHeight: '70vh', ...colorStyle }}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default CustomModal;
