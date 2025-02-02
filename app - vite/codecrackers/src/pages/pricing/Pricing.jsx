import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Header from "../../components/header-start/Header"

const PricingOption = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  badge = "",
  showCounter = false,
  onIncrement,
  onDecrement,
  doubtsCount,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
    className="h-full"
  >
    <Card
      className={`w-full max-w-sm mx-auto relative ${isPopular ? "border-indigo-500 border-2" : ""} h-full flex flex-col`}
    >
      {badge && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white shadow-lg">
            {badge}
          </span>
        </div>
      )}
      <CardHeader className="text-center flex-grow-0">
        <CardTitle className="text-2xl font-bold text-gray-800">{title}</CardTitle>
        <CardDescription className="text-gray-600">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold">₹{typeof price === "number" ? price * doubtsCount : price}</span>
          </div>
          {showCounter && (
            <div className="flex items-center justify-center mt-4 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onDecrement}
                disabled={doubtsCount <= 4}
                className="rounded-full h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold text-gray-700">{doubtsCount} doubts</span>
              <Button variant="outline" size="icon" onClick={onIncrement} className="rounded-full h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-center mb-6 text-gray-600">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <Check className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-grow-0">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Select Plan</Button>
      </CardFooter>
    </Card>
  </motion.div>
)

const Pricing = () => {
  const [doubtsCount, setDoubtsCount] = useState(4)

  const handleIncrement = () => {
    setDoubtsCount((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setDoubtsCount((prev) => Math.max(4, prev - 1))
  }

  const plans = [
    {
      title: "Geek",
      price: "80",
      description: "Perfect for quick questions and individual learners",
      features: [
        "1 doubt resolution",
        "Priority AI assistance",
        "Community support"
      ],
      isPopular: true,
      badge: "MOST POPULAR",
    },
    {
      title: "Consistence",
      price: "200",
      description: "Ideal for small teams and collaborative learning",
      features: [
        "3 doubt resolutions",
        "Advanced AI assistance",
        "Priority support",
      ],
      badge: "BEST VALUE",
    },
    {
      title: "Custom",
      price: 67,
      description: "Flexible plan tailored to your specific needs",
      features: [
        "Choose 4 or more doubts",
        "Advanced AI assistance",
        "Priority support",
      ],
      badge: "FLEXIBLE",
      showCounter: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <Header />
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base font-semibold text-indigo-600"
            >
              Pricing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
            >
              Find the perfect plan for your learning journey. Get instant access to expert solutions and AI-powered
              assistance.
            </motion.p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <PricingOption
                  {...plan}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  doubtsCount={doubtsCount}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600">
              All plans include access to our community forum and basic learning resources.
              <br />
              Need a custom plan?{" "}
              <a href="#contact" className="text-indigo-600 font-medium hover:text-indigo-500">
                Contact us
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Pricing

