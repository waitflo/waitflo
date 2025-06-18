"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, MousePointer, Clock, Download, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "../layout"

export default function AnalyticsPage() {
  const { theme } = useTheme()

  const stats = [
    { icon: Users, label: "Total Signups", value: "12,847", change: "+23%", trend: "up" },
    { icon: MousePointer, label: "Conversion Rate", value: "68.4%", change: "+5.2%", trend: "up" },
    { icon: Clock, label: "Avg. Time on Page", value: "2m 34s", change: "-12s", trend: "down" },
    { icon: TrendingUp, label: "Growth Rate", value: "+127%", change: "+8%", trend: "up" },
  ]

  const recentSignups = [
    { email: "john@example.com", flow: "SaaS Waitlist", date: "2 minutes ago", location: "US" },
    { email: "sarah@company.com", flow: "Mobile App Launch", date: "5 minutes ago", location: "UK" },
    { email: "mike@startup.io", flow: "Newsletter Signup", date: "8 minutes ago", location: "CA" },
    { email: "emma@design.co", flow: "Event Registration", date: "12 minutes ago", location: "AU" },
    { email: "alex@tech.com", flow: "Product Beta", date: "15 minutes ago", location: "DE" },
  ]

  const chartData = [
    { month: "Jan", signups: 400 },
    { month: "Feb", signups: 600 },
    { month: "Mar", signups: 800 },
    { month: "Apr", signups: 1200 },
    { month: "May", signups: 1600 },
    { month: "Jun", signups: 2100 },
  ]

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

  const cardClasses = theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Analytics</h1>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
            Track your flow performance and user engagement
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            <Card className={`${cardClasses} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-100"}`}>
                    <stat.icon className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Signups Chart */}
        <motion.div variants={fadeInUp}>
          <Card className={cardClasses}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Signups Over Time
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.signups / 2100) * 200}px` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg mb-2"
                    />
                    <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div variants={fadeInUp}>
          <Card className={cardClasses}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Conversion Funnel
              </h3>
              <div className="space-y-4">
                {[
                  { stage: "Page Views", count: 10000, percentage: 100 },
                  { stage: "Form Started", count: 7500, percentage: 75 },
                  { stage: "Email Entered", count: 6000, percentage: 60 },
                  { stage: "Completed Signup", count: 4200, percentage: 42 },
                ].map((stage, index) => (
                  <div key={stage.stage} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium">
                      <span className={theme === "dark" ? "text-white" : "text-gray-900"}>{stage.stage}</span>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`h-8 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} relative overflow-hidden`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.percentage}%` }}
                          transition={{ delay: index * 0.2, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg"
                        />
                        <span
                          className={`absolute inset-0 flex items-center justify-center text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          {stage.count.toLocaleString()} ({stage.percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Signups */}
      <motion.div variants={fadeInUp}>
        <Card className={cardClasses}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Recent Signups
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                    <th
                      className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Email
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Flow
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Location
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentSignups.map((signup, index) => (
                    <motion.tr
                      key={signup.email}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} transition-colors`}
                    >
                      <td className={`py-3 px-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {signup.email}
                      </td>
                      <td className={`py-3 px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {signup.flow}
                      </td>
                      <td className={`py-3 px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {signup.location}
                      </td>
                      <td className={`py-3 px-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {signup.date}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
