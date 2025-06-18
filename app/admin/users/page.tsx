"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, Eye, Ban, Trash2, Crown, UserPlus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface User {
  id: string
  name: string
  email: string
  plan: "Free" | "Pro" | "Starter"
  status: "Active" | "Suspended" | "Banned"
  createdDate: string
  lastActive: string
  flows: number
  revenue: number
}

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPlan, setFilterPlan] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const users: User[] = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
      plan: "Pro",
      status: "Active",
      createdDate: "2024-01-15",
      lastActive: "2 hours ago",
      flows: 12,
      revenue: 89.5,
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      email: "mike@startup.io",
      plan: "Free",
      status: "Active",
      createdDate: "2024-01-12",
      lastActive: "1 day ago",
      flows: 3,
      revenue: 0,
    },
    {
      id: "3",
      name: "Emma Watson",
      email: "emma@design.co",
      plan: "Pro",
      status: "Suspended",
      createdDate: "2024-01-10",
      lastActive: "3 days ago",
      flows: 8,
      revenue: 45.2,
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "alex@tech.com",
      plan: "Starter",
      status: "Active",
      createdDate: "2024-01-08",
      lastActive: "5 hours ago",
      flows: 6,
      revenue: 23.8,
    },
    {
      id: "5",
      name: "John Doe",
      email: "john@company.com",
      plan: "Pro",
      status: "Banned",
      createdDate: "2024-01-05",
      lastActive: "1 week ago",
      flows: 15,
      revenue: 127.9,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = filterPlan === "all" || user.plan.toLowerCase() === filterPlan
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus
    return matchesSearch && matchesPlan && matchesStatus
  })

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user:`, userId)
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

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Users Management</h1>
          <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="px-4 py-2 rounded-lg border bg-black border-gray-700 text-white"
                >
                  <option value="all">All Plans</option>
                  <option value="free">Free</option>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg border bg-black border-gray-700 text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
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

      {/* Users Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 font-medium text-gray-400">User</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Plan</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Flows</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Revenue</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Last Active</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            <p className="text-xs text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.plan === "Pro"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                              : user.plan === "Starter"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : user.status === "Suspended"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">{user.flows}</td>
                      <td className="py-4 px-6 text-white">${user.revenue.toFixed(2)}</td>
                      <td className="py-4 px-6 text-gray-400">{user.lastActive}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction(user.id, "view")}
                            className="border-gray-700 text-black bg-white hover:bg-gray-100"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction(user.id, "upgrade")}
                            className="border-gray-700 text-white hover:bg-gray-800"
                          >
                            <Crown className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction(user.id, "suspend")}
                            className="border-gray-700 text-yellow-500 hover:bg-gray-800"
                          >
                            <Ban className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserAction(user.id, "delete")}
                            className="border-gray-700 text-red-500 hover:bg-gray-800"
                          >
                            <Trash2 className="w-3 h-3" />
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

      {/* Pagination */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            Previous
          </Button>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            Next
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
