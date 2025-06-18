"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Eye, EyeOff, ArrowRight, Check, X, Zap, Code, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  })

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    })
  }

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password })
    validatePassword(password)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    // Handle signup logic here
    console.log("Signup attempt:", formData)
  }

  const isPasswordValid = Object.values(passwordValidation).every(Boolean)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ""

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Flow Generator",
      description: "Generate complete onboarding flows from simple product descriptions using advanced AI.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "No-Code Builder",
      description: "Drag-and-drop interface with real-time preview. No technical skills required.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Instant Launch",
      description: "Deploy your waitlist and onboarding pages with a single click. Go live in seconds.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Signups Generated" },
    { number: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

          {/* Animated Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-lg">
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                Waitflo
              </h1>
              <h2 className="text-3xl font-bold mb-4 text-white">Launch with Flow</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                AI-powered waitlist & onboarding pages in minutes. Join thousands of startups who've launched
                successfully.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-purple-400">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        {/* Mobile Background Effects */}
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="relative w-full max-w-md mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Mobile Logo */}
          <motion.div className="lg:hidden text-center mb-8" variants={fadeInUp}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-2">
              Waitflo
            </h1>
            <p className="text-gray-400">Create your account</p>
          </motion.div>

          {/* Desktop Header */}
          <motion.div className="hidden lg:block text-center mb-8" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-gray-400">Start building your waitlist today</p>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <Label htmlFor="name" className="text-white text-sm font-medium mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 h-12"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Label htmlFor="email" className="text-white text-sm font-medium mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 h-12"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Label htmlFor="password" className="text-white text-sm font-medium mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Validation */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 space-y-2"
                  >
                    {[
                      { key: "length", text: "At least 8 characters" },
                      { key: "uppercase", text: "One uppercase letter" },
                      { key: "lowercase", text: "One lowercase letter" },
                      { key: "number", text: "One number" },
                    ].map((rule) => (
                      <div key={rule.key} className="flex items-center text-sm">
                        {passwordValidation[rule.key as keyof typeof passwordValidation] ? (
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 mr-2" />
                        )}
                        <span
                          className={
                            passwordValidation[rule.key as keyof typeof passwordValidation]
                              ? "text-green-500"
                              : "text-gray-400"
                          }
                        >
                          {rule.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Label htmlFor="confirmPassword" className="text-white text-sm font-medium mb-2 block">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 h-12 pr-12 ${
                      formData.confirmPassword && (passwordsMatch ? "border-green-500" : "border-red-500")
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center text-sm"
                  >
                    {passwordsMatch ? (
                      <>
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-green-500">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-red-500">Passwords don't match</span>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  disabled={!isPasswordValid || !passwordsMatch}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white h-12 text-base font-medium rounded-lg group relative overflow-hidden shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              <motion.div className="text-center" variants={fadeInUp}>
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    Log in
                  </Link>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
