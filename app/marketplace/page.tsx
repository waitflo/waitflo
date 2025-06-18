"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, User, Upload, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  { id: "hero", name: "Hero Section", description: "Main banner with headline and CTA" },
  { id: "features", name: "Features", description: "Highlight key features or benefits" },
  { id: "testimonials", name: "Testimonials", description: "Customer reviews and social proof" },
  { id: "faq", name: "FAQ", description: "Frequently asked questions" },
  { id: "cta", name: "Call to Action", description: "Final conversion section" },
]

export default function MarketplacePage() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [customizeModal, setCustomizeModal] = useState(false)
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [formData, setFormData] = useState({
    websiteName: "",
    logo: null,
    primaryColor: "#8B5CF6",
    secondaryColor: "#06B6D4",
    selectedSections: ["hero", "features"],
    generateAI: false,
    images: {},
  })

  useEffect(() => {
    setLoading(true)
    fetch("/api/templates/public")
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data.templates || [])
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load templates.")
        setLoading(false)
      })
  }, [])

  const handleCustomize = (template) => {
    setSelectedTemplate(template)
    setCustomizeModal(true)
  }

  const handleContinueToPayment = () => {
    setCustomizeModal(false)
    setCheckoutModal(true)
  }

  const handleSectionToggle = (sectionId) => {
    setFormData((prev) => ({
      ...prev,
      selectedSections: prev.selectedSections.includes(sectionId)
        ? prev.selectedSections.filter((id) => id !== sectionId)
        : [...prev.selectedSections, sectionId],
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <a
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                Waitflo
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="/marketplace" className="text-purple-400 font-medium">
                Templates
              </a>
              <a href="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </a>
              <a href="/signup" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Browse{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Landing Page Templates
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Instantly personalize and launch your site. No sign-up needed.
            </p>
            <Button
              onClick={() => document.getElementById("templates").scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Template Grid */}
      <section id="templates" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Choose Your Template</h2>
            <p className="text-gray-300 text-lg">Professional templates designed by experts</p>
          </motion.div>

          {loading ? (
            <div className="text-center text-gray-400 py-20 text-lg">Loading templates...</div>
          ) : error ? (
            <div className="text-center text-red-400 py-20 text-lg">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => {
                const isNew = template.created_at && (Date.now() - new Date(template.created_at).getTime() < 7 * 24 * 60 * 60 * 1000)
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img
                          src={template.preview_url || "/placeholder.svg"}
                          alt={template.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium">
                          ${template.price}
                        </div>
                        {isNew && (
                          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow">New</div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{template.title}</h3>
                        </div>
                        <div className="flex items-center text-gray-400 mb-3">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-sm">{template.creator_name}</span>
                        </div>
                        {/* Optionally add more info here if needed */}
                        <Button
                          onClick={() => window.location.href = `/templates/customize?id=${template.id}`}
                          className="w-full bg-white text-black hover:bg-gray-100 transition-colors"
                        >
                          Customize & Buy
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Creator CTA */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-12 border border-purple-500/20"
          >
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Want to earn from your templates?</h2>
            <p className="text-xl text-gray-300 mb-8">Join as a creator and earn every time someone buys your work.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <a href="/dashboard">Become a Creator</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Customize Modal */}
      <Dialog open={customizeModal} onOpenChange={setCustomizeModal}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Customize "{selectedTemplate?.title}"</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="websiteName" className="text-white">
                  Website Name
                </Label>
                <Input
                  id="websiteName"
                  value={formData.websiteName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, websiteName: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter your website name"
                />
              </div>

              <div>
                <Label className="text-white">Upload Logo</Label>
                <div className="mt-2 flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor" className="text-white">
                    Primary Color
                  </Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="color"
                      id="primaryColor"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-10 rounded border-gray-700"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor" className="text-white">
                    Secondary Color
                  </Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-12 h-10 rounded border-gray-700"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white mb-4 block">Select Sections</Label>
                <div className="space-y-3">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={section.id}
                        checked={formData.selectedSections.includes(section.id)}
                        onCheckedChange={() => handleSectionToggle(section.id)}
                        className="border-gray-600"
                      />
                      <div className="flex-1">
                        <Label htmlFor={section.id} className="text-white font-medium cursor-pointer">
                          {section.name}
                        </Label>
                        <p className="text-sm text-gray-400">{section.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="generateAI"
                  checked={formData.generateAI}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, generateAI: checked }))}
                  className="border-gray-600"
                />
                <Label htmlFor="generateAI" className="text-white cursor-pointer">
                  Generate content with AI
                </Label>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="bg-white rounded-lg p-4 text-black min-h-[300px]">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2" style={{ color: formData.primaryColor }}>
                    {formData.websiteName || "Your Website Name"}
                  </h1>
                  <p className="text-gray-600 mb-4">Preview of your customized template</p>
                  <div className="space-y-2">
                    {formData.selectedSections.map((sectionId) => {
                      const section = sections.find((s) => s.id === sectionId)
                      return (
                        <div
                          key={sectionId}
                          className="p-3 rounded border-2"
                          style={{ borderColor: formData.secondaryColor }}
                        >
                          {section?.name}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCustomizeModal(false)}
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={handleContinueToPayment} className="bg-purple-600 hover:bg-purple-700 text-white">
              Continue to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={checkoutModal} onOpenChange={setCheckoutModal}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Complete Your Purchase</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span>{selectedTemplate?.title}</span>
                <span>${selectedTemplate?.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Customization</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-4">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>${selectedTemplate?.price}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input id="firstName" className="bg-gray-800 border-gray-700 text-white" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input id="lastName" className="bg-gray-800 border-gray-700 text-white" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="cardNumber" className="text-white">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-white">
                    Expiry Date
                  </Label>
                  <Input id="expiry" className="bg-gray-800 border-gray-700 text-white" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-white">
                    CVC
                  </Label>
                  <Input id="cvc" className="bg-gray-800 border-gray-700 text-white" placeholder="123" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setCheckoutModal(false)}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Back
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Complete Purchase
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
