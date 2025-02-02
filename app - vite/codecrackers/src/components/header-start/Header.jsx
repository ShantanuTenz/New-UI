import React from 'react'
import { motion } from "framer-motion"
import { Code, LogIn } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

const Header = ({openStepsDialog}) => {
    const navigate = useNavigate();
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white flex items-center space-x-2"
          >
            <Code className="h-8 w-8" />
            <span>Codecrackers</span>
          </motion.div>
          <nav className="hidden md:flex space-x-4">
            {["Home", "Community", "Pricing", "About"].map((item) => (
              <motion.a
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-indigo-200 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={openStepsDialog}
                variant="outline"
                className="bg-white text-indigo-600 hover:bg-indigo-100"
              >
                Try Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={()=> navigate("/login")} variant="ghost" className="text-white hover:bg-indigo-500">
                <LogIn className="h-4 w-4 mr-2" />
                <span>Login</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </header>
  )
}

export default Header
