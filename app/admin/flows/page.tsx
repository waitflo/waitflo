"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, Eye, Trash2, User, Globe, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Flow {
  id: string
  name: string
  owner: string
  ownerEmail: string
  createdDate: string
  status: "Live" | "Draft" | "Paused"
  signups: number
  category: string
  lastModified: string
}

export default function FlowsOversight() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const flows: Flow[] = [
    {
      id: "1",
      name: "SaaS Waitlist Pro",
      owner: "Sarah Chen",
      ownerEmail: "sarah@example.com",
      createdDate: "2024-01-15",
      status: "Live",
      signups: 1247,
      category: "SaaS",
      lastModified: "2 days ago",
    },
    {
      id: "2",
      name: "Mobile App Launch",
      owner: "Mike Rodriguez",
      ownerEmail: "mike@startup.io",
      createdDate: "2024-01-12",
      status: "Draft",
      signups: 0,
      category: "Mobile",
      lastModified: "1 week ago",
    },
    {
      id: "3",
      name: "Newsletter Signup",
      owner: "Emma Watson",
      ownerEmail: "emma@design.co",
      createdDate: "2024-01-10",
      status: "Live",
      signups: 892,
      category: "Newsletter",
      lastModified: "3 days ago",
    },
    {
      id: "4",
      name: "Product Beta",
      owner: "Alex Thompson",
      ownerEmail: "alex@tech.com",
      createdDate: "2024-01-08",
      status: "Paused",
      signups: 456,
      category: "Product",
      lastModified: "5 days ago",
    },
    {
      id: "5",
      name: "Event Registration",
      owner: "John Doe",
      ownerEmail: "john@company.com",
      createdDate: "2024-01-05",
      status: "Live",
      signups: 2103,
      category: "Events",
      lastModified: "1 day ago",
    },
  ]

  const filteredFlows = flows.filter((flow) => {
    const matchesSearch =
      flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flow.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || flow.status.toLowerCase() === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleFlowAction = (flowId: string, action: string) => {
    console.log(`${action} flow:`, flowId)
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
          <h1 className="text-3xl font-bold text-white">Flows Oversight</h1>
          <p className="text-gray-400 mt-1">Monitor all onboarding flows across the platform</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Flows", value: flows.length, icon: FileText },
            { label: "Live Flows", value: flows.filter((f) => f.status === "Live").length, icon: Globe },
            { label: "Draft Flows", value: flows.filter((f) => f.status === "Draft").length, icon: FileText },
            {
              label: "Total Signups",
              value: flows.reduce((sum, f) => sum + f.signups, 0).toLocaleString(),
              icon: User,
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

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search flows by name or owner..."
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
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="paused">Paused</option>
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

      {/* Flows Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Flow</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Owner</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Signups</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Created</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFlows.map((flow, index) => (
                    <motion.tr
                      key={flow.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-white">{flow.name}</p>
                          <p className="text-sm text-gray-400">{flow.category}</p>
                          <p className="text-xs text-gray-500">ID: {flow.id}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {flow.owner
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{flow.owner}</p>
                            <p className="text-sm text-gray-400">{flow.ownerEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            flow.status === "Live"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : flow.status === "Draft"
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {flow.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">{flow.signups.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white">{new Date(flow.createdDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-400">Modified {flow.lastModified}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFlowAction(flow.id, "view")}
                            className="border-gray-700 text-black bg-white hover:bg-gray-100"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFlowAction(flow.id, "delete")}
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

      {/* Empty State */}
      {filteredFlows.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">No flows found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}
