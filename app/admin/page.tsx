"use client"

import { motion } from "framer-motion"
import { Users, FileText, LayoutTemplate, DollarSign, Eye, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: "Total Users", value: "12,847", change: "+23%", color: "blue" },
    { icon: FileText, label: "Flows Created", value: "8,392", change: "+18%", color: "green" },
    { icon: LayoutTemplate, label: "Templates Listed", value: "247", change: "+12%", color: "purple" },
    { icon: DollarSign, label: "Payouts This Month", value: "$4,892", change: "+34%", color: "yellow" },
  ]

  const chartData = [
    { month: "Jan", users: 8500, templates: 180, earnings: 2800 },
    { month: "Feb", users: 9200, templates: 195, earnings: 3200 },
    { month: "Mar", users: 10100, templates: 210, earnings: 3600 },
    { month: "Apr", users: 11300, templates: 225, earnings: 4100 },
    { month: "May", users: 12100, templates: 235, earnings: 4500 },
    { month: "Jun", users: 12847, templates: 247, earnings: 4892 },
  ]

  const recentActivity = [
    { type: "user", message: "New user registered: sarah@example.com", time: "2 minutes ago" },
    { type: "template", message: "Template 'SaaS Onboarding Pro' approved", time: "5 minutes ago" },
    { type: "payout", message: "Payout of $127.50 processed for John Doe", time: "12 minutes ago" },
    { type: "flow", message: "Flow 'Mobile App Launch' created by Emma Watson", time: "18 minutes ago" },
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

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Platform overview and management</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/broadcast">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Announcement
            </Button>
          </Link>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Eye className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-green-500">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-600/20`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Monthly Growth Trends</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.users / 15000) * 200}px` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg mb-2"
                    />
                    <span className="text-xs text-gray-400">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-400">Users</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "user"
                          ? "bg-blue-500"
                          : activity.type === "template"
                            ? "bg-purple-500"
                            : activity.type === "payout"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-gray-700 text-black bg-white hover:bg-gray-100">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/users">
                <div className="p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                  <Users className="w-8 h-8 text-blue-500 mb-2" />
                  <h4 className="font-medium text-white">Manage Users</h4>
                  <p className="text-sm text-gray-400">View and manage user accounts</p>
                </div>
              </Link>

              <Link href="/admin/templates">
                <div className="p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                  <LayoutTemplate className="w-8 h-8 text-purple-500 mb-2" />
                  <h4 className="font-medium text-white">Review Templates</h4>
                  <p className="text-sm text-gray-400">Approve or reject templates</p>
                </div>
              </Link>

              <Link href="/admin/affiliates">
                <div className="p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer">
                  <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                  <h4 className="font-medium text-white">Process Payouts</h4>
                  <p className="text-sm text-gray-400">Manage affiliate payments</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
