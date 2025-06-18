"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  DollarSign,
  Users,
  Globe,
  Lock,
  FileText,
  TrendingUp,
  Settings,
  X,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../layout"

interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  usedCount: number
  status: "Listed" | "Unlisted" | "Draft"
  revenue: number
  tags: string[]
  category: string
  createdAt: string
  lastModified: string
}

export default function MyTemplatesPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    tags: "",
    category: "SaaS",
    status: "Draft" as const,
  })

  const templates: Template[] = [
    {
      id: "1",
      name: "SaaS Onboarding Pro",
      description: "Complete onboarding flow for B2B SaaS products",
      thumbnail: "/placeholder.svg?height=200&width=300",
      usedCount: 247,
      status: "Listed",
      revenue: 142.35,
      tags: ["SaaS", "B2B", "Onboarding"],
      category: "SaaS",
      createdAt: "2024-01-15",
      lastModified: "2 days ago",
    },
    {
      id: "2",
      name: "Creator Waitlist",
      description: "Perfect for content creators and influencers",
      thumbnail: "/placeholder.svg?height=200&width=300",
      usedCount: 89,
      status: "Listed",
      revenue: 67.2,
      tags: ["Creator", "Social", "Waitlist"],
      category: "Creator",
      createdAt: "2024-01-10",
      lastModified: "1 week ago",
    },
    {
      id: "3",
      name: "Fintech Launch",
      description: "Specialized template for financial apps",
      thumbnail: "/placeholder.svg?height=200&width=300",
      usedCount: 156,
      status: "Unlisted",
      revenue: 98.4,
      tags: ["Fintech", "Finance", "Security"],
      category: "Fintech",
      createdAt: "2024-01-05",
      lastModified: "3 days ago",
    },
    {
      id: "4",
      name: "E-commerce Store",
      description: "Product launch template for online stores",
      thumbnail: "/placeholder.svg?height=200&width=300",
      usedCount: 0,
      status: "Draft",
      revenue: 0,
      tags: ["E-commerce", "Retail", "Product"],
      category: "E-commerce",
      createdAt: "2024-01-20",
      lastModified: "1 day ago",
    },
  ]

  const totalEarnings = templates.reduce((sum, template) => sum + template.revenue, 0)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || template.status.toLowerCase() === filterStatus
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

  const toggleTemplateStatus = (templateId: string) => {
    // Toggle between Listed and Unlisted
    console.log("Toggle status for template:", templateId)
  }

  const handleCreateTemplate = () => {
    console.log("Creating template:", newTemplate)
    setShowCreateModal(false)
    setNewTemplate({
      name: "",
      description: "",
      tags: "",
      category: "SaaS",
      status: "Draft",
    })
  }

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>My Templates</h1>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
            Create, manage, and monetize your custom templates
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full lg:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Template
        </Button>
      </motion.div>

      {/* Earnings Overview */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`${cardClasses} transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Earnings</p>
                  <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ${totalEarnings.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-500">+12% this month</p>
                </div>
                <div className={`p-3 rounded-full ${theme === "dark" ? "bg-green-600/20" : "bg-green-100"}`}>
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardClasses} transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Uses</p>
                  <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {templates.reduce((sum, t) => sum + t.usedCount, 0)}
                  </p>
                  <p className="text-sm text-blue-500">+8 this week</p>
                </div>
                <div className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-600/20" : "bg-blue-100"}`}>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardClasses} transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Listed Templates</p>
                  <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {templates.filter((t) => t.status === "Listed").length}
                  </p>
                  <p className="text-sm text-purple-500">2 earning revenue</p>
                </div>
                <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-100"}`}>
                  <Globe className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
          >
            <option value="all">All Status</option>
            <option value="listed">Listed</option>
            <option value="unlisted">Unlisted</option>
            <option value="draft">Draft</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowSettingsModal(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </motion.div>

      {/* Templates Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={`${cardClasses} transition-all duration-300 overflow-hidden group relative`}>
              <CardContent className="p-0">
                {/* Template Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-medium rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.status === "Listed"
                          ? "bg-green-500/90 text-white"
                          : template.status === "Unlisted"
                            ? "bg-yellow-500/90 text-white"
                            : "bg-gray-500/90 text-white"
                      }`}
                    >
                      {template.status === "Listed" && <Globe className="w-3 h-3 inline mr-1" />}
                      {template.status === "Unlisted" && <Lock className="w-3 h-3 inline mr-1" />}
                      {template.status === "Draft" && <FileText className="w-3 h-3 inline mr-1" />}
                      {template.status}
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

                {/* Template Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className={`font-semibold text-base ${theme === "dark" ? "text-white" : "text-gray-900"} truncate flex-1`}
                    >
                      {template.name}
                    </h3>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-3 line-clamp-2`}>
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {template.tags.length > 2 && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                      >
                        +{template.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        <Users className="w-3 h-3 inline mr-1" />
                        Used {template.usedCount} times
                      </span>
                      <span
                        className={`text-sm font-semibold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                      >
                        <DollarSign className="w-3 h-3 inline" />
                        {template.revenue.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                        Modified {template.lastModified}
                      </span>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-auto"
                          onClick={() => toggleTemplateStatus(template.id)}
                        >
                          {template.status === "Listed" ? "Unlist" : "List"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Template Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md ${theme === "dark" ? "bg-gray-900" : "bg-white"} rounded-lg p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Create New Template
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Template Name
                  </Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Enter template name"
                    className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="template-description"
                    className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Description
                  </Label>
                  <Textarea
                    id="template-description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Describe your template"
                    className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                  />
                </div>

                <div>
                  <Label htmlFor="template-category" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Category
                  </Label>
                  <select
                    id="template-category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="Creator">Creator</option>
                    <option value="Fintech">Fintech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Newsletter">Newsletter</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="template-tags" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Tags (comma separated)
                  </Label>
                  <Input
                    id="template-tags"
                    value={newTemplate.tags}
                    onChange={(e) => setNewTemplate({ ...newTemplate, tags: e.target.value })}
                    placeholder="e.g., SaaS, B2B, Onboarding"
                    className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleCreateTemplate}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"} rounded-lg p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Template Settings
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowSettingsModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div
                  className={`p-4 rounded-lg border ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}
                >
                  <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Revenue Share
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-3`}>
                    You earn 70% of the revenue when someone uses your template. Waitflo keeps 30% for platform costs.
                  </p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Your share: <strong>70%</strong>
                    </span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg border ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}
                >
                  <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Template Pricing
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-3`}>
                    Each template use generates $0.99 revenue. You earn $0.69 per use.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Price per use:</span>
                      <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>$0.99</div>
                    </div>
                    <div>
                      <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Your earnings:</span>
                      <div className="font-semibold text-green-500">$0.69</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Notification Preferences
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Email me when someone uses my template",
                      "Weekly earnings summary",
                      "New template marketplace features",
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {setting}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={index < 2} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowSettingsModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setShowSettingsModal(false)}
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <div
            className={`w-16 h-16 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center mx-auto mb-4`}
          >
            <FileText className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            No templates found
          </h3>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Create your first template to start earning revenue
          </p>
          <Button onClick={() => setShowCreateModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
            Create Your First Template
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
