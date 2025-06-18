"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Save, DollarSign, Percent, Globe, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function PlatformSettings() {
  const [settings, setSettings] = useState({
    // Pricing Settings
    starterPrice: 9,
    proPrice: 29,

    // Revenue Share
    templateRevenueShare: 70,
    affiliateCommission: 30,

    // Homepage Content
    heroHeadline: "Build AI-Powered Waitlists in Minutes",
    heroSubtext: "Create stunning onboarding flows with our no-code builder and AI assistance",
    ctaText: "Start Free Trial",

    // Feature Toggles
    aiAccessFree: false,
    templateMarketplace: true,
    affiliateProgram: true,

    // System Settings
    maintenanceMode: false,
    newUserRegistration: true,
  })

  const handleSave = () => {
    console.log("Saving platform settings:", settings)
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
          <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
          <p className="text-gray-400 mt-1">Configure global platform settings and features</p>
        </div>
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pricing Settings */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <DollarSign className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-white">Pricing Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="starter-price" className="text-white text-sm font-medium mb-2 block">
                    Starter Plan Price (USD/month)
                  </Label>
                  <Input
                    id="starter-price"
                    type="number"
                    value={settings.starterPrice}
                    onChange={(e) => setSettings({ ...settings, starterPrice: Number(e.target.value) })}
                    className="bg-black border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="pro-price" className="text-white text-sm font-medium mb-2 block">
                    Pro Plan Price (USD/month)
                  </Label>
                  <Input
                    id="pro-price"
                    type="number"
                    value={settings.proPrice}
                    onChange={(e) => setSettings({ ...settings, proPrice: Number(e.target.value) })}
                    className="bg-black border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Share Settings */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Percent className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-white">Revenue Share</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-share" className="text-white text-sm font-medium mb-2 block">
                    Template Creator Share (%)
                  </Label>
                  <Input
                    id="template-share"
                    type="number"
                    value={settings.templateRevenueShare}
                    onChange={(e) => setSettings({ ...settings, templateRevenueShare: Number(e.target.value) })}
                    className="bg-black border-gray-700 text-white"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-400 mt-1">Platform keeps {100 - settings.templateRevenueShare}%</p>
                </div>

                <div>
                  <Label htmlFor="affiliate-commission" className="text-white text-sm font-medium mb-2 block">
                    Affiliate Commission (%)
                  </Label>
                  <Input
                    id="affiliate-commission"
                    type="number"
                    value={settings.affiliateCommission}
                    onChange={(e) => setSettings({ ...settings, affiliateCommission: Number(e.target.value) })}
                    className="bg-black border-gray-700 text-white"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Homepage Content */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-white">Homepage Content</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="hero-headline" className="text-white text-sm font-medium mb-2 block">
                    Hero Headline
                  </Label>
                  <Input
                    id="hero-headline"
                    value={settings.heroHeadline}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    className="bg-black border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="hero-subtext" className="text-white text-sm font-medium mb-2 block">
                    Hero Subtext
                  </Label>
                  <Textarea
                    id="hero-subtext"
                    value={settings.heroSubtext}
                    onChange={(e) => setSettings({ ...settings, heroSubtext: e.target.value })}
                    className="bg-black border-gray-700 text-white resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="cta-text" className="text-white text-sm font-medium mb-2 block">
                    CTA Button Text
                  </Label>
                  <Input
                    id="cta-text"
                    value={settings.ctaText}
                    onChange={(e) => setSettings({ ...settings, ctaText: e.target.value })}
                    className="bg-black border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Toggles */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-white">Feature Toggles</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "aiAccessFree",
                    label: "AI Access on Free Plan",
                    description: "Allow free users to use AI features",
                  },
                  {
                    key: "templateMarketplace",
                    label: "Template Marketplace",
                    description: "Enable template sharing and monetization",
                  },
                  {
                    key: "affiliateProgram",
                    label: "Affiliate Program",
                    description: "Enable affiliate referral system",
                  },
                  {
                    key: "newUserRegistration",
                    label: "New User Registration",
                    description: "Allow new users to sign up",
                  },
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{feature.label}</p>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[feature.key as keyof typeof settings] as boolean}
                        onChange={(e) => setSettings({ ...settings, [feature.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Settings */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-white">System Settings</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                <div>
                  <p className="font-medium text-white">Maintenance Mode</p>
                  <p className="text-sm text-gray-400">Temporarily disable the platform for maintenance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-medium text-white mb-2">Platform Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Users:</span>
                    <span className="text-white">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Flows:</span>
                    <span className="text-white">8,392</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Templates:</span>
                    <span className="text-white">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Revenue:</span>
                    <span className="text-green-500">$24,891</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
