import { motion } from "framer-motion";
import clsx from "clsx";

const sizeMap = {
  10: "w-10 h-10",
  12: "w-12 h-12",
  14: "w-14 h-14",
  16: "w-16 h-16",
};

const headingSizeMap = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const Header = ({ iconSize = 14, headingSize = "3xl" }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src="/icons/logo.svg"
        alt="Logo"
        className={clsx(sizeMap[iconSize] || sizeMap[14])}
      />
      <h1
        className={clsx(
          headingSizeMap[headingSize] || headingSizeMap["3xl"],
          "font-bold text-gray-800 flex"
        )}
      >
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
