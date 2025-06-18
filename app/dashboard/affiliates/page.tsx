"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Copy,
  Twitter,
  Mail,
  MessageCircle,
  MousePointer,
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  HelpCircle,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../layout"

interface ReferredUser {
  id: string
  name: string
  email: string
  signupDate: string
  converted: boolean
  plan: string
  earnings: number
}

export default function AffiliatesPage() {
  const { theme } = useTheme()
  const [referralEnabled, setReferralEnabled] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)

  const referralLink = "https://waitflo.com/ref/johndoe"
  const currentBalance = 128.34
  const minimumPayout = 50
  const lastPayout = "June 10, 2024"

  const stats = {
    totalClicks: 1247,
    signups: 89,
    converted: 23,
    earnings: currentBalance,
  }

  const chartData = [
    { date: "Jan", earnings: 45.2 },
    { date: "Feb", earnings: 67.8 },
    { date: "Mar", earnings: 89.4 },
    { date: "Apr", earnings: 112.6 },
    { date: "May", earnings: 98.3 },
    { date: "Jun", earnings: 128.34 },
  ]

  const referredUsers: ReferredUser[] = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
      signupDate: "2024-01-15",
      converted: true,
      plan: "Pro",
      earnings: 8.7,
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      email: "mike@startup.io",
      signupDate: "2024-01-12",
      converted: true,
      plan: "Pro",
      earnings: 8.7,
    },
    {
      id: "3",
      name: "Emma Watson",
      email: "emma@design.co",
      signupDate: "2024-01-10",
      converted: false,
      plan: "Free",
      earnings: 0,
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "alex@tech.com",
      signupDate: "2024-01-08",
      converted: true,
      plan: "Starter",
      earnings: 4.5,
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const text = "Check out Waitflo - the best way to create AI-powered waitlists and onboarding flows!"
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`
    window.open(url, "_blank")
  }

  const shareViaEmail = () => {
    const subject = "Check out Waitflo"
    const body = `I've been using Waitflo to create amazing onboarding flows and thought you'd love it too! Check it out: ${referralLink}`
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(url)
  }

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

  const cardClasses =
    theme === "dark"
      ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
      : "bg-white border-gray-200 hover:border-purple-500/50"

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Earn with Waitflo 🎯
          </h1>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
            Share your link and earn 30% from every referral
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowFAQ(true)}>
          <HelpCircle className="w-4 h-4 mr-2" />
          Affiliate FAQ
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Referral Link Section */}
          <motion.div variants={fadeInUp}>
            <Card className={`${cardClasses} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Your Referral Link
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Active</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={referralEnabled}
                        onChange={(e) => setReferralEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Input
                    value={referralLink}
                    readOnly
                    className={`flex-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
                  />
                  <Button onClick={copyToClipboard} className="bg-purple-600 hover:bg-purple-700 text-white">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                    <Twitter className="w-4 h-4 mr-2" />
                    Share on X
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Discord
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareViaEmail}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Earnings Summary */}
          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: MousePointer, label: "Total Clicks", value: stats.totalClicks, color: "blue" },
                { icon: Users, label: "Signups", value: stats.signups, color: "green" },
                { icon: TrendingUp, label: "Converted", value: stats.converted, color: "purple" },
                { icon: DollarSign, label: "Earnings", value: `$${stats.earnings}`, color: "yellow" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`${cardClasses} transition-all duration-300`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {stat.label}
                          </p>
                          <motion.p
                            className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {stat.value}
                          </motion.p>
                        </div>
                        <div
                          className={`p-2 rounded-full ${
                            theme === "dark" ? `bg-${stat.color}-600/20` : `bg-${stat.color}-100`
                          }`}
                        >
                          <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Earnings Chart */}
          <motion.div variants={fadeInUp}>
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Earnings Over Time
                </h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {chartData.map((data, index) => (
                    <div key={data.date} className="flex flex-col items-center flex-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.earnings / 150) * 200}px` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg mb-2 relative group"
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ${data.earnings}
                        </div>
                      </motion.div>
                      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {data.date}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Referred Users Table */}
          <motion.div variants={fadeInUp}>
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Referred Users
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                        <th
                          className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          User
                        </th>
                        <th
                          className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Signup Date
                        </th>
                        <th
                          className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Status
                        </th>
                        <th
                          className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Earnings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {referredUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} transition-colors`}
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {user.name}
                              </p>
                              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                {user.email}
                              </p>
                            </div>
                          </td>
                          <td className={`py-3 px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {new Date(user.signupDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.converted
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                                }`}
                              >
                                {user.converted ? "Converted" : "Free"}
                              </span>
                              {user.converted && (
                                <span
                                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                                  title={`Subscribed to ${user.plan} plan`}
                                >
                                  ({user.plan})
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`font-semibold ${user.earnings > 0 ? "text-green-500" : theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                            >
                              ${user.earnings.toFixed(2)}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Payout Section */}
          <motion.div variants={fadeInUp}>
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Payout
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Current Balance</p>
                    <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ${currentBalance.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Minimum Payout</p>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ${minimumPayout}
                    </p>
                  </div>

                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Last Payout</p>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {lastPayout}
                    </p>
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={currentBalance < minimumPayout}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Request Payout
                  </Button>

                  {currentBalance < minimumPayout && (
                    <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"} text-center`}>
                      ${(minimumPayout - currentBalance).toFixed(2)} more needed
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payout Methods */}
          <motion.div variants={fadeInUp}>
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Payout Methods
                </h3>
                <div className="space-y-3">
                  {["PayPal", "Bank Transfer", "Crypto"].map((method, index) => (
                    <div
                      key={method}
                      className={`flex items-center justify-between p-3 rounded-lg border ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <span className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{method}</span>
                      <Button variant="outline" size="sm">
                        {index === 0 ? "Connected" : "Setup"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp}>
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  This Month
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      New Referrals
                    </span>
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Conversions
                    </span>
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Conversion Rate
                    </span>
                    <span className="font-semibold text-green-500">33.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* FAQ Modal */}
      <AnimatePresence>
        {showFAQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowFAQ(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-2xl ${theme === "dark" ? "bg-gray-900" : "bg-white"} rounded-lg p-6 max-h-[80vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Affiliate Program FAQ
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFAQ(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {[
                  {
                    q: "How much do I earn per referral?",
                    a: "You earn 30% of the subscription fee for each user who signs up through your link and converts to a paid plan. For a $29/month Pro plan, you'd earn $8.70 per month for as long as they remain subscribed.",
                  },
                  {
                    q: "When do I get paid?",
                    a: "Payouts are processed monthly, with a minimum balance of $50. You can request a payout once you reach this threshold.",
                  },
                  {
                    q: "What payment methods are supported?",
                    a: "We support PayPal, bank transfers, and cryptocurrency payments. You can set up your preferred method in the payout section.",
                  },
                  {
                    q: "How long do referral cookies last?",
                    a: "Referral cookies are valid for 60 days. If someone clicks your link and signs up within 60 days, you'll get credit for the referral.",
                  },
                  {
                    q: "Can I refer myself or use multiple accounts?",
                    a: "No, self-referrals and creating multiple accounts to game the system is strictly prohibited and will result in account termination.",
                  },
                ].map((faq, index) => (
                  <div key={index}>
                    <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {faq.q}
                    </h3>
                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>{faq.a}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Have more questions?{" "}
                  <a href="mailto:support@waitflo.com" className="text-purple-500 hover:text-purple-400">
                    Contact our support team
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
