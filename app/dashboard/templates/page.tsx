"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, Star, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../layout"

export default function TemplatesPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["All", "SaaS", "E-commerce", "Creator", "Newsletter", "Events", "Mobile App"]

  const templates = [
    {
      id: 1,
      name: "SaaS Waitlist Pro",
      category: "SaaS",
      description: "Perfect for B2B software launches with advanced features",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      downloads: 1247,
      featured: true,
    },
    {
      id: 2,
      name: "Mobile App Launch",
      category: "Mobile App",
      description: "Optimized for app pre-launches and beta signups",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      downloads: 892,
      featured: false,
    },
    {
      id: 3,
      name: "Creator Platform",
      category: "Creator",
      description: "Built for content creators and influencers",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      downloads: 654,
      featured: true,
    },
    {
      id: 4,
      name: "E-commerce Store",
      category: "E-commerce",
      description: "Ideal for product launches and store openings",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      downloads: 1103,
      featured: false,
    },
    {
      id: 5,
      name: "Newsletter Signup",
      category: "Newsletter",
      description: "Great for building email audiences",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      downloads: 789,
      featured: false,
    },
    {
      id: 6,
      name: "Event Registration",
      category: "Events",
      description: "Perfect for event registration and ticketing",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      downloads: 456,
      featured: true,
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || template.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
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
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Templates</h1>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
          Choose from professionally designed templates
        </p>
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
        <Button variant="outline" size="sm" className="lg:w-auto w-full">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.toLowerCase()
                ? "bg-purple-600 text-white"
                : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Templates Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Card className={`${cardClasses} transition-all duration-300 overflow-hidden group relative`}>
              {template.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">Featured</span>
                </div>
              )}

              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {template.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {template.rating}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                      <Download className="w-3 h-3 inline mr-1" />
                      {template.downloads.toLocaleString()} downloads
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full">
                      {template.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredTemplates.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <div
            className={`w-16 h-16 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center mx-auto mb-4`}
          >
            <Search className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            No templates found
          </h3>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
