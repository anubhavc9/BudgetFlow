import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="flex items-center space-x-4">
      <img src="/icons/logo.svg" alt="Logo" className="w-14 h-14" />
      <h1 className="text-3xl font-bold text-gray-800 flex">
        Budget
        <motion.span
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
            delay: 0.2,
          }}
          className="text-indigo-600 ml-0.5"
        >
          Flow
        </motion.span>
      </h1>
    </div>
  );
};

export default Header;
