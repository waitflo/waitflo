"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Illustration */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <motion.div
              className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="text-center">
                <motion.div
                  className="w-24 h-24 bg-purple-600/30 rounded-full mx-auto mb-6 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-full"></div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Welcome back to Waitflo</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  Continue building amazing onboarding experiences with AI-powered tools.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div className="w-full max-w-md mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Logo */}
          <motion.div className="text-center mb-8" variants={fadeInUp}>
            <h1 className="text-3xl font-bold text-white mb-2">Waitflo</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              </motion.div>

              <motion.div className="flex items-center justify-between" variants={fadeInUp}>
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-base font-medium rounded-lg group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Log in
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </motion.div>

              <motion.div className="text-center" variants={fadeInUp}>
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    Sign up
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
