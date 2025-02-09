import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Code, LogIn } from 'lucide-react'
import { Button } from "@/components/ui/button"
const Header = () => {
    
  return (
    <header className={`z-[999] py-[0.5rem] px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 absolute w-[80%] left-[10%] top-[5%] rounded-full`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white flex items-center space-x-2"
          >
            <span>Codecrackers</span>
          </motion.div>
          <motion.nav
            className="bg-black backdrop-blur-sm px-6 py-[1rem] rounded-full w-[25rem] shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-between">
              {["Dashboard", "Doubts", "Profile", "Queries"].map((item) => (
                <motion.a
                  key={item}
                  href={`/student/${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors duration-200 text-white hover:text-gray-200`}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        </div>
    </header>
  )
}

export default Header

