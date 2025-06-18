"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Plus,
  LayoutTemplate,
  Sparkles,
  FileText,
  TrendingUp,
  Users,
  Clock,
  Eye,
  Edit,
  DollarSign,
  CreditCard,
  X,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "./layout"
import Link from "next/link"

export default function DashboardHome() {
  const { theme } = useTheme()
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState("paypal")
  const [payoutAmount, setPayoutAmount] = useState("")

  // Revenue data
  const totalRevenue = 347.82
  const affiliateRevenue = 128.34
  const templateRevenue = 219.48
  const minimumPayout = 50
  const lastPayout = "June 10, 2024"

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

  const recentFlows = [
    {
      name: "SaaS Waitlist",
      status: "Live",
      signups: 1247,
      date: "2 days ago",
      image: "/placeholder.svg?height=120&width=200",
      category: "SaaS",
    },
    {
      name: "Mobile App Launch",
      status: "Draft",
      signups: 0,
      date: "1 week ago",
      image: "/placeholder.svg?height=120&width=200",
      category: "Mobile",
    },
    {
      name: "Newsletter Signup",
      status: "Live",
      signups: 892,
      date: "3 days ago",
      image: "/placeholder.svg?height=120&width=200",
      category: "Newsletter",
    },
  ]

  const stats = [
    { icon: Users, label: "Total Signups", value: "2,139", change: "+12%" },
    { icon: FileText, label: "Active Flows", value: "8", change: "+2" },
    { icon: TrendingUp, label: "Conversion Rate", value: "68%", change: "+5%" },
    { icon: Clock, label: "Avg. Time", value: "2.4m", change: "-0.3m" },
  ]

  const handlePayoutRequest = () => {
    console.log("Payout requested:", { method: payoutMethod, amount: payoutAmount })
    setShowPayoutModal(false)
    setPayoutAmount("")
  }

  const cardClasses =
    theme === "dark"
      ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
      : "bg-white border-gray-200 hover:border-purple-500/50"

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-4 lg:space-y-6 max-w-full"
    >
      {/* Welcome Section */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Welcome back, John! 👋
          </h1>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Ready to create amazing onboarding experiences?
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 lg:px-6 py-2 lg:py-3 text-base lg:text-lg w-full lg:w-auto">
            <Plus className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
            Create New Flow
          </Button>
        </Link>
      </motion.div>

      {/* Revenue Section */}
      <motion.div variants={fadeInUp}>
        <Card
          className={`${cardClasses} transition-all duration-300 border-2 border-purple-200 dark:border-purple-800`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Total Revenue Earned
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center md:text-left">
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Earnings</p>
                    <p
                      className={`text-2xl lg:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      ${totalRevenue.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-center md:text-left">
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>From Affiliates</p>
                    <p className={`text-xl font-semibold text-green-600`}>${affiliateRevenue.toFixed(2)}</p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                      {((affiliateRevenue / totalRevenue) * 100).toFixed(1)}% of total
                    </p>
                  </div>

                  <div className="text-center md:text-left">
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>From Templates</p>
                    <p className={`text-xl font-semibold text-blue-600`}>${templateRevenue.toFixed(2)}</p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                      {((templateRevenue / totalRevenue) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Last payout: {lastPayout}
                  </span>
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>•</span>
                  <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Minimum payout: ${minimumPayout}
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => setShowPayoutModal(true)}
                  disabled={totalRevenue < minimumPayout}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Request Payout
                </Button>

                {totalRevenue < minimumPayout && (
                  <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"} text-center`}>
                    ${(minimumPayout - totalRevenue).toFixed(2)} more needed
                  </p>
                )}

                <div className="flex space-x-2">
                  <Link href="/dashboard/affiliates">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Affiliates
                    </Button>
                  </Link>
                  <Link href="/dashboard/my-templates">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Templates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className={`${cardClasses} transition-all duration-300`}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs lg:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {stat.label}
                      </p>
                      <p
                        className={`text-xl lg:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs lg:text-sm text-green-500">{stat.change}</p>
                    </div>
                    <div
                      className={`p-2 lg:p-3 rounded-full ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-100"}`}
                    >
                      <stat.icon className="w-5 lg:w-6 h-5 lg:h-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Flows */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg lg:text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Recent Flows
          </h2>
          <Link href="/dashboard/flows">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {recentFlows.map((flow, index) => (
            <motion.div key={flow.name} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className={`${cardClasses} transition-all duration-300 h-full overflow-hidden group`}>
                <CardContent className="p-0">
                  {/* Flow Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={flow.image || "/placeholder.svg"}
                      alt={flow.name}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-medium rounded-full">
                        {flow.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          flow.status === "Live" ? "bg-green-500/90 text-white" : "bg-gray-500/90 text-white"
                        }`}
                      >
                        {flow.status}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Flow Details */}
                  <div className="p-4">
                    <h3 className={`font-semibold text-base mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {flow.name}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          Signups
                        </span>
                        <span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {flow.signups.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          Last updated
                        </span>
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {flow.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <h2 className={`text-lg lg:text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <Link href="/dashboard/templates">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className={`${cardClasses} transition-all duration-300 cursor-pointer`}>
                <CardContent className="p-4 lg:p-6 text-center">
                  <div
                    className={`w-12 lg:w-16 h-12 lg:h-16 rounded-full ${theme === "dark" ? "bg-blue-600/20" : "bg-blue-100"} flex items-center justify-center mx-auto mb-3 lg:mb-4`}
                  >
                    <LayoutTemplate className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
                  </div>
                  <h3
                    className={`font-semibold mb-2 text-sm lg:text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Browse Templates
                  </h3>
                  <p className={`text-xs lg:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Start with professionally designed templates
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link href="/dashboard/ai">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className={`${cardClasses} transition-all duration-300 cursor-pointer`}>
                <CardContent className="p-4 lg:p-6 text-center">
                  <div
                    className={`w-12 lg:w-16 h-12 lg:h-16 rounded-full ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-100"} flex items-center justify-center mx-auto mb-3 lg:mb-4`}
                  >
                    <Sparkles className="w-6 lg:w-8 h-6 lg:h-8 text-purple-500" />
                  </div>
                  <h3
                    className={`font-semibold mb-2 text-sm lg:text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Start with AI
                  </h3>
                  <p className={`text-xs lg:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Let AI create your perfect onboarding flow
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <a href="https://docs.waitflo.com" target="_blank" rel="noopener noreferrer">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className={`${cardClasses} transition-all duration-300 cursor-pointer`}>
                <CardContent className="p-4 lg:p-6 text-center">
                  <div
                    className={`w-12 lg:w-16 h-12 lg:h-16 rounded-full ${theme === "dark" ? "bg-green-600/20" : "bg-green-100"} flex items-center justify-center mx-auto mb-3 lg:mb-4`}
                  >
                    <FileText className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
                  </div>
                  <h3
                    className={`font-semibold mb-2 text-sm lg:text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    View Docs
                  </h3>
                  <p className={`text-xs lg:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Learn how to maximize your conversions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </a>
        </div>
      </motion.div>

      {/* Payout Modal */}
      <AnimatePresence>
        {showPayoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowPayoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md ${theme === "dark" ? "bg-gray-900" : "bg-white"} rounded-lg p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Request Payout
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowPayoutModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="payout-amount" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Payout Amount
                  </Label>
                  <Input
                    id="payout-amount"
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder={`Max: $${totalRevenue.toFixed(2)}`}
                    className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                  />
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Available balance: ${totalRevenue.toFixed(2)}
                  </p>
                </div>

                <div>
                  <Label htmlFor="payout-method" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Payout Method
                  </Label>
                  <select
                    id="payout-method"
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  >
                    <option value="paypal">PayPal</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>

                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                  <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Payout Breakdown
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Affiliate earnings:
                      </span>
                      <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        ${affiliateRevenue.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Template earnings:
                      </span>
                      <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        ${templateRevenue.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium pt-1 border-t border-gray-300 dark:border-gray-600">
                      <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>Total available:</span>
                      <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        ${totalRevenue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowPayoutModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handlePayoutRequest}
                    disabled={!payoutAmount || Number.parseFloat(payoutAmount) > totalRevenue}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Request Payout
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
