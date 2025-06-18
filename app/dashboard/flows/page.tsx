"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, Eye, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../layout"
import Link from "next/link"

export default function FlowsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const flows = [
    { id: 1, name: "SaaS Waitlist", status: "Live", signups: 1247, created: "2024-01-15", lastModified: "2 days ago" },
    {
      id: 2,
      name: "Mobile App Launch",
      status: "Draft",
      signups: 0,
      created: "2024-01-10",
      lastModified: "1 week ago",
    },
    {
      id: 3,
      name: "Newsletter Signup",
      status: "Live",
      signups: 892,
      created: "2024-01-08",
      lastModified: "3 days ago",
    },
    { id: 4, name: "Product Beta", status: "Paused", signups: 456, created: "2024-01-05", lastModified: "5 days ago" },
    {
      id: 5,
      name: "Event Registration",
      status: "Live",
      signups: 2103,
      created: "2024-01-03",
      lastModified: "1 day ago",
    },
  ]

  const filteredFlows = flows.filter((flow) => {
    const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || flow.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
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
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            My Flows
          </h1>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1 text-sm lg:text-base`}>
            Manage your onboarding flows and waitlists
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Flow
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          />
          <Input
            placeholder="Search flows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 lg:px-4 py-2 rounded-lg border text-sm lg:text-base ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
          >
            <option value="all">All Status</option>
            <option value="live">Live</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </select>
          <Button variant="outline" size="sm" className="text-xs lg:text-sm">
            <Filter className="w-4 h-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">More Filters</span>
          </Button>
        </div>
      </motion.div>

      {/* Flows Grid */}
      <motion.div variants={staggerContainer} className="grid gap-3 lg:gap-4">
        {filteredFlows.map((flow, index) => (
          <motion.div
            key={flow.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={`${cardClasses} transition-all duration-300`}>
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                    <div
                      className={`w-10 lg:w-12 h-10 lg:h-12 rounded-lg ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-100"} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-purple-500 font-semibold text-sm lg:text-base">{flow.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-semibold text-sm lg:text-base ${theme === "dark" ? "text-white" : "text-gray-900"} truncate`}
                      >
                        {flow.name}
                      </h3>
                      <p
                        className={`text-xs lg:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} truncate`}
                      >
                        {flow.signups.toLocaleString()} signups • Created {flow.created} • Modified {flow.lastModified}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
                    <span
                      className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${
                        flow.status === "Live"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : flow.status === "Draft"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {flow.status}
                    </span>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-xs lg:text-sm">
                        <Eye className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs lg:text-sm">
                        <Edit className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-3 lg:w-4 h-3 lg:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredFlows.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-8 lg:py-12">
          <div
            className={`w-12 lg:w-16 h-12 lg:h-16 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center mx-auto mb-4`}
          >
            <Search className={`w-6 lg:w-8 h-6 lg:h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <h3
            className={`text-base lg:text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            No flows found
          </h3>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4 text-sm lg:text-base`}>
            Try adjusting your search or filter criteria
          </p>
          <Link href="/dashboard/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Create Your First Flow</Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}
