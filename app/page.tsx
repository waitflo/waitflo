"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  ArrowRight,
  Zap,
  Code,
  Rocket,
  Star,
  Check,
  Twitter,
  Github,
  MessageCircle,
  Menu,
  X,
  Users,
  DollarSign,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function WaitfloSaaSLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isYearly, setIsYearly] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Flow Generator",
      description: "Generate complete onboarding flows from simple product descriptions using advanced AI.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "No-Code Builder",
      description: "Drag-and-drop interface with real-time preview. No technical skills required.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Instant Launch",
      description: "Deploy your waitlist and onboarding pages with a single click. Go live in seconds.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Describe Your Product",
      description: "Tell our AI about your startup, app, or service in plain English.",
      icon: <MessageCircle className="w-12 h-12" />,
    },
    {
      number: "02",
      title: "Let AI Generate Your Flow",
      description: "Watch as AI creates a customized onboarding experience tailored to your needs.",
      icon: <Zap className="w-12 h-12" />,
    },
    {
      number: "03",
      title: "Publish and Share",
      description: "Get your custom link and start collecting high-quality signups immediately.",
      icon: <Rocket className="w-12 h-12" />,
    },
  ]

  const testimonials = [
    {
      quote: "Waitflo helped us launch our fintech startup and collect 2,500+ qualified leads in just 3 weeks.",
      author: "Sarah Chen",
      role: "CEO, FinanceFlow",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
    },
    {
      quote: "The no-code builder saved us 2 months of development time. Our conversion rate increased by 340%.",
      author: "Marcus Rodriguez",
      role: "Founder, DataSync",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
    },
    {
      quote:
        "Best onboarding tool for startups. The templates are professionally designed and analytics help us optimize.",
      author: "Emily Watson",
      role: "Product Lead, CloudBase",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
    },
  ]

  const creatorStats = [
    { icon: <DollarSign className="w-6 h-6" />, value: "$2.5M+", label: "Paid to Creators" },
    { icon: <Users className="w-6 h-6" />, value: "500+", label: "Active Creators" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "$1,200", label: "Avg Monthly Earnings" },
  ]

  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: ["Up to 100 signups", "3 premium templates", "Basic analytics", "AI flow generation"],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing businesses",
      monthlyPrice: 29,
      yearlyPrice: 279, // ~20% discount for yearly
      features: [
        "Unlimited signups",
        "All premium templates",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="w-full max-w-full">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none w-full">
          <div className="absolute inset-0">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

            {/* Animated Particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 1, 0.2],
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
        </div>

        {/* Header */}
        <motion.header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
              ? "bg-black/90 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
              : "bg-transparent"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between py-4">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Waitflo
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { name: "Home", href: "/" },
                  { name: "Features", href: "#features" },
                  { name: "Templates", href: "/marketplace" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Login", href: "/login" },
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/signup" passHref>
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 px-6 py-2 text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-purple-500/20 bg-black/95 backdrop-blur-xl"
              >
                <nav className="flex flex-col space-y-4 py-6 px-4">
                  {["Home", "Features", "Templates", "Pricing", "Login"].map((item) => (
                    <a
                      key={item}
                      href={item === "Templates" ? "/marketplace" : `#${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors text-sm py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32">
          <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-purple-600/10 border border-purple-600/20 rounded-full text-sm text-purple-300 mb-8 backdrop-blur-sm"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                Trusted by 10,000+ startups worldwide
              </motion.div>

              <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight" variants={fadeInUp}>
                Launch with{" "}
                <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Flow
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                AI-powered waitlist & onboarding pages in minutes.
              </motion.p>

              <motion.div variants={fadeInUp} className="mb-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/signup" passHref>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group"
                    >
                      Start for Free
                      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Floating Dashboard Mockup */}
              <motion.div variants={fadeInUp} className="relative max-w-5xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl" />
                  <motion.div
                    className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700/50">
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="h-80 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl flex items-center justify-center border border-gray-600/30">
                        <div className="text-gray-400 text-xl font-medium">Waitflo Dashboard Preview</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Icons Section */}
        <section id="features" className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="bg-gray-900/30 backdrop-blur-sm border-gray-800/50 hover:border-purple-500/50 transition-all duration-500 h-full group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-6 relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3-Step Workflow */}
        <section className="relative py-20 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">How it works</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">From idea to launch in three simple steps</p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-16"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
                >
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full mb-8 backdrop-blur-sm border border-purple-500/20">
                      <div className="text-purple-400">{step.icon}</div>
                    </div>
                    <div className="text-sm font-bold text-purple-400 mb-4 tracking-wider">STEP {step.number}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{step.title}</h3>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-lg">{step.description}</p>
                  </div>

                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                      <div className="h-48 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl flex items-center justify-center border border-gray-600/20">
                        <div className="text-gray-400 text-lg font-medium">Step {index + 1} Preview</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-16 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Trusted by founders</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of founders who've launched successfully with Waitflo
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="bg-gray-900/30 backdrop-blur-sm border-gray-800/50 hover:border-purple-500/30 transition-all duration-500 h-full">
                    <CardContent className="p-6">
                      <div className="flex mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-8 leading-relaxed text-lg">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full mr-4 bg-gray-600 border-2 border-purple-500/20"
                        />
                        <div>
                          <p className="font-semibold text-white">{testimonial.author}</p>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Create to Earn Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Create to Earn</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Publish your own onboarding templates and earn every time they're used.
              </p>
            </motion.div>

            {/* Creator Stats - Blended with background */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative mb-16 p-8 md:p-12 rounded-3xl overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 backdrop-blur-sm rounded-3xl border border-purple-500/10"></div>

              {/* Stats grid */}
              <div className="relative z-10 grid md:grid-cols-3 gap-6">
                {creatorStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="text-center p-6 backdrop-blur-sm rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-blue-500/5"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-purple-400">{stat.icon}</div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group"
                >
                  Become a Creator
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section id="pricing" className="relative py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Simple pricing</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                Start free, scale as you grow. No hidden fees.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-lg ${!isYearly ? "text-white font-medium" : "text-gray-400"}`}>Monthly</span>
                <div className="relative">
                  <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
                <span className={`text-lg ${isYearly ? "text-white font-medium" : "text-gray-400"}`}>
                  Yearly <span className="text-green-400 text-sm font-medium ml-1">Save 20%</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {pricingPlans.map((plan, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  {plan.popular ? (
                    // Pro Plan Card - Completely Recreated
                    <div className="relative">
                      {/* Most Popular Badge */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          Most Popular
                        </div>
                      </div>

                      {/* Card Container */}
                      <div className="relative overflow-hidden rounded-2xl border border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm shadow-2xl shadow-purple-500/20 hover:border-purple-400/70 transition-all duration-500">
                        {/* Background Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />

                        {/* Card Content */}
                        <div className="relative z-10 p-10 pt-12">
                          <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                          <p className="text-purple-200 mb-6">{plan.description}</p>

                          <div className="mb-8">
                            <div className="text-6xl font-bold text-white mb-2">
                              ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                              <span className="text-xl font-normal text-purple-200">
                                /{isYearly ? "year" : "month"}
                              </span>
                            </div>
                            {isYearly && plan.monthlyPrice > 0 && (
                              <p className="text-green-400 font-medium">
                                ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)} saved annually
                              </p>
                            )}
                          </div>

                          <ul className="space-y-4 mb-10">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-white">
                                <Check className="w-5 h-5 mr-3 flex-shrink-0 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Button className="w-full bg-white text-black hover:bg-gray-100 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                              {plan.cta}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Free Plan Card
                    <Card className="bg-gray-900/30 backdrop-blur-sm border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 h-full">
                      <CardContent className="p-10">
                        <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                        <p className="text-gray-400 mb-6">{plan.description}</p>
                        <p className="text-6xl font-bold mb-8 text-white">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          <span className="text-xl font-normal text-gray-400">/{isYearly ? "year" : "month"}</span>
                        </p>
                        <ul className="space-y-4 mb-10">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <Check className="w-5 h-5 mr-3 flex-shrink-0 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Button className="w-full bg-white text-black hover:bg-gray-100 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                            {plan.cta}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-gradient-to-r from-purple-500/20 to-blue-500/20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20"
          >
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                  Waitflo
                </h3>
                <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
                  AI-powered onboarding and waitlist builder for modern startups, creators, and developers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-6 text-white text-lg">Navigation</h4>
                <ul className="space-y-4 text-gray-400">
                  {["Home", "Templates", "Docs", "Login", "Privacy"].map((item) => (
                    <li key={item}>
                      <a
                        href={item === "Templates" ? "/marketplace" : `#${item.toLowerCase()}`}
                        className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-6 text-white text-lg">Connect</h4>
                <div className="flex space-x-6">
                  {[
                    { icon: <Github className="w-6 h-6" />, href: "#" },
                    { icon: <Twitter className="w-6 h-6" />, href: "#" },
                    { icon: <MessageCircle className="w-6 h-6" />, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-purple-600/10"
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-16 pt-8 text-center">
              <p className="text-gray-400">&copy; 2024 Waitflo. All rights reserved.</p>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  )
}
