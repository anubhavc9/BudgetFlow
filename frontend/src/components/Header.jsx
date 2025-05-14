import { motion } from "framer-motion";

const Header = ({ iconSize = 14, headingSize = "3xl" }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src="/icons/logo.svg"
        alt="Logo"
        className={`w-${iconSize} h-${iconSize}`}
      />
      <h1 className={`text-${headingSize} font-bold text-gray-800 flex`}>
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
