"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowRight, ArrowLeft, Sparkles, LayoutTemplateIcon as Template, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    projectName: "",
    industry: "",
    productDescription: "",
    choice: "",
  })

  const industries = [
    "SaaS/Software",
    "E-commerce",
    "Fintech",
    "Healthcare",
    "Education",
    "Marketing",
    "Real Estate",
    "Other",
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5 },
  }

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.5 },
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChoice = (choice: string) => {
    setFormData({ ...formData, choice })
    // Navigate to next page or complete onboarding
    console.log("Onboarding completed with choice:", choice)
  }

  const progressPercentage = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Setup Waitflo</h1>
            <span className="text-sm text-gray-400">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-4xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome to Waitflo</h2>
                <p className="text-gray-400">Let's set up your first project</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="projectName" className="text-white text-sm font-medium mb-2 block">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    type="text"
                    placeholder="e.g., My Awesome App"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="industry" className="text-white text-sm font-medium mb-2 block">
                    Industry
                  </Label>
                  <div className="relative">
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-black border border-gray-700 text-white h-12 px-3 rounded-lg focus:border-purple-500 focus:ring-purple-500/20 appearance-none"
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                <Button
                  onClick={nextStep}
                  disabled={!formData.projectName || !formData.industry}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white h-12 text-base font-medium rounded-lg group"
                >
                  Next
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Tell us about your product</h2>
                <p className="text-gray-400">Help our AI understand what you're building</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="productDescription" className="text-white text-sm font-medium mb-2 block">
                    Product Description
                  </Label>
                  <Textarea
                    id="productDescription"
                    placeholder="Describe your product, target audience, and key features..."
                    value={formData.productDescription}
                    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                    className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 min-h-32 resize-none"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-purple-300 mb-1">AI Suggestion</h4>
                      <p className="text-sm text-gray-400">
                        "A project management tool for remote teams that helps track tasks, deadlines, and team
                        collaboration in real-time."
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex space-x-4">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-800 h-12"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!formData.productDescription.trim()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white h-12"
                  >
                    Next
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">How would you like to start?</h2>
                <p className="text-gray-400">Choose your preferred way to build your onboarding flow</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer h-full"
                    onClick={() => handleChoice("templates")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Template className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Browse Templates</h3>
                      <p className="text-gray-400 text-sm">
                        Start with professionally designed templates and customize them to your needs.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer h-full"
                    onClick={() => handleChoice("ai")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Generate with AI</h3>
                      <p className="text-gray-400 text-sm">
                        Let AI create a custom onboarding flow based on your product description.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 border-gray-600 text-white hover:bg-gray-800 h-12"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={() => handleChoice("ai")}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white h-12 text-base font-medium rounded-lg"
                  >
                    Let's Build 🚀
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
