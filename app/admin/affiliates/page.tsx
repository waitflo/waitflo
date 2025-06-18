"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, Check, X, DollarSign, Users, MousePointer, TrendingUp, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Affiliate {
  id: string
  user: string
  email: string
  clicks: number
  signups: number
  conversions: number
  payoutDue: number
  commissionRate: number
  status: "Active" | "Pending" | "Suspended"
  joinDate: string
}

export default function AffiliateControl() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [globalCommission, setGlobalCommission] = useState(30)

  const affiliates: Affiliate[] = [
    {
      id: "1",
      user: "Sarah Chen",
      email: "sarah@example.com",
      clicks: 1247,
      signups: 89,
      conversions: 23,
      payoutDue: 128.34,
      commissionRate: 30,
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      user: "Mike Rodriguez",
      email: "mike@startup.io",
      clicks: 892,
      signups: 45,
      conversions: 12,
      payoutDue: 67.2,
      commissionRate: 30,
      status: "Active",
      joinDate: "2024-01-12",
    },
    {
      id: "3",
      user: "Emma Watson",
      email: "emma@design.co",
      clicks: 456,
      signups: 23,
      conversions: 8,
      payoutDue: 45.6,
      commissionRate: 25,
      status: "Pending",
      joinDate: "2024-01-20",
    },
    {
      id: "4",
      user: "Alex Thompson",
      email: "alex@tech.com",
      clicks: 234,
      signups: 12,
      conversions: 3,
      payoutDue: 18.9,
      commissionRate: 30,
      status: "Suspended",
      joinDate: "2024-01-18",
    },
  ]

  const filteredAffiliates = affiliates.filter((affiliate) => {
    const matchesSearch =
      affiliate.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || affiliate.status.toLowerCase() === filterStatus
    return matchesSearch && matchesStatus
  })

  const handlePayoutAction = (affiliateId: string, action: string) => {
    console.log(`${action} payout for affiliate:`, affiliateId)
  }

  const totalPayoutsDue = affiliates.reduce((sum, affiliate) => sum + affiliate.payoutDue, 0)

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
          <h1 className="text-3xl font-bold text-white">Affiliate Program Control</h1>
          <p className="text-gray-400 mt-1">Manage affiliate partners and payouts</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            Payout History
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Commission Settings
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Affiliates", value: affiliates.length, icon: Users },
            {
              label: "Active Affiliates",
              value: affiliates.filter((a) => a.status === "Active").length,
              icon: TrendingUp,
            },
            { label: "Pending Payouts", value: `$${totalPayoutsDue.toFixed(2)}`, icon: DollarSign },
            {
              label: "Avg. Conversion",
              value: `${(affiliates.reduce((sum, a) => sum + (a.conversions / a.signups) * 100, 0) / affiliates.length || 0).toFixed(1)}%`,
              icon: MousePointer,
            },
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className="w-6 h-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Commission Settings */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Global Commission Rate</h3>
                <p className="text-gray-400">Set the default commission percentage for new affiliates</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={globalCommission}
                    onChange={(e) => setGlobalCommission(Number(e.target.value))}
                    className="w-20 bg-black border-gray-700 text-white"
                    min="0"
                    max="100"
                  />
                  <span className="text-white">%</span>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Update Rate</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search affiliates by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg border bg-black border-gray-700 text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Affiliates Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Affiliate</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Performance</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Commission</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Payout Due</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAffiliates.map((affiliate, index) => (
                    <motion.tr
                      key={affiliate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {affiliate.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{affiliate.user}</p>
                            <p className="text-sm text-gray-400">{affiliate.email}</p>
                            <p className="text-xs text-gray-500">
                              Joined {new Date(affiliate.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Clicks:</span>
                            <span className="text-white">{affiliate.clicks}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Signups:</span>
                            <span className="text-white">{affiliate.signups}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Conversions:</span>
                            <span className="text-white">{affiliate.conversions}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">{affiliate.commissionRate}%</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-green-500 font-semibold">${affiliate.payoutDue.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            affiliate.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : affiliate.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {affiliate.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handlePayoutAction(affiliate.id, "approve")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={affiliate.payoutDue < 50}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handlePayoutAction(affiliate.id, "deny")}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Empty State */}
      {filteredAffiliates.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">No affiliates found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}
