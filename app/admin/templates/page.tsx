"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, Eye, Check, X, Star, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Template {
  id: string
  title: string
  creator: string
  creatorEmail: string
  useCount: number
  status: "Public" | "Private" | "Pending" | "Rejected"
  revenue: number
  featured: boolean
  category: string
  createdDate: string
  thumbnail: string
}

export default function TemplatesControl() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const templates: Template[] = [
    {
      id: "1",
      title: "SaaS Onboarding Pro",
      creator: "Sarah Chen",
      creatorEmail: "sarah@example.com",
      useCount: 247,
      status: "Public",
      revenue: 142.35,
      featured: true,
      category: "SaaS",
      createdDate: "2024-01-15",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "2",
      title: "Creator Waitlist",
      creator: "Mike Rodriguez",
      creatorEmail: "mike@startup.io",
      useCount: 89,
      status: "Public",
      revenue: 67.2,
      featured: false,
      category: "Creator",
      createdDate: "2024-01-12",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "3",
      title: "Fintech Launch",
      creator: "Emma Watson",
      creatorEmail: "emma@design.co",
      useCount: 0,
      status: "Pending",
      revenue: 0,
      featured: false,
      category: "Fintech",
      createdDate: "2024-01-20",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "4",
      title: "E-commerce Store",
      creator: "Alex Thompson",
      creatorEmail: "alex@tech.com",
      useCount: 156,
      status: "Private",
      revenue: 98.4,
      featured: false,
      category: "E-commerce",
      createdDate: "2024-01-10",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || template.status.toLowerCase() === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleTemplateAction = (templateId: string, action: string) => {
    console.log(`${action} template:`, templateId)
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
          <h1 className="text-3xl font-bold text-white">Templates Control</h1>
          <p className="text-gray-400 mt-1">Review and manage user-submitted templates</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            Revenue Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Templates", value: templates.length, icon: Users },
            { label: "Pending Review", value: templates.filter((t) => t.status === "Pending").length, icon: Eye },
            { label: "Featured", value: templates.filter((t) => t.featured).length, icon: Star },
            {
              label: "Total Revenue",
              value: `$${templates.reduce((sum, t) => sum + t.revenue, 0).toFixed(2)}`,
              icon: DollarSign,
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
                  placeholder="Search templates by title or creator..."
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
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
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

      {/* Templates Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div key={template.id} variants={fadeInUp} className="group">
            <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                {/* Template Image */}
                <div className="relative">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-medium rounded-full">
                      {template.category}
                    </span>
                    {template.featured && (
                      <span className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-medium rounded-full">
                        <Star className="w-3 h-3 inline mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.status === "Public"
                          ? "bg-green-500/90 text-white"
                          : template.status === "Pending"
                            ? "bg-yellow-500/90 text-white"
                            : template.status === "Private"
                              ? "bg-gray-500/90 text-white"
                              : "bg-red-500/90 text-white"
                      }`}
                    >
                      {template.status}
                    </span>
                  </div>
                </div>

                {/* Template Details */}
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-2">{template.title}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">
                        {template.creator
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white">{template.creator}</p>
                      <p className="text-xs text-gray-400">{template.creatorEmail}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-400">Uses:</span>
                      <div className="font-semibold text-white">{template.useCount}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span>
                      <div className="font-semibold text-green-500">${template.revenue.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateAction(template.id, "view")}
                      className="flex-1 border-gray-700 text-black bg-white hover:bg-gray-100"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>

                    {template.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleTemplateAction(template.id, "approve")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleTemplateAction(template.id, "reject")}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </>
                    )}

                    {template.status === "Public" && (
                      <Button
                        size="sm"
                        onClick={() => handleTemplateAction(template.id, "feature")}
                        className={
                          template.featured ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-600 hover:bg-gray-700"
                        }
                      >
                        <Star className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">No templates found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}
