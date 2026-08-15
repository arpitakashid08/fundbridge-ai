import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-0 z-50 px-6 py-6 md:px-10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9a76a]/50">
            <span className="h-2 w-2 rounded-full bg-[#c9a76a]" />
          </div>

          <span className="text-sm font-medium tracking-wide">
            FundBridge <span className="text-[#c9a76a]">AI</span>
          </span>
        </div>

        <div className="hidden items-center gap-9 text-xs text-white/45 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>

          <a href="#ecosystem" className="transition hover:text-white">
            Funding ecosystem
          </a>

          <a href="#about" className="transition hover:text-white">
            About
          </a>
        </div>

        <button className="border border-white/15 px-5 py-2.5 text-xs text-white/70 transition duration-300 hover:border-[#c9a76a]/50 hover:text-[#c9a76a]">
          Enter platform
        </button>
      </div>
    </motion.nav>
  );
}