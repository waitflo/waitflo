"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { User, Lock, Bell, CreditCard, Trash2, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../layout"

export default function SettingsPage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc",
    website: "https://acme.com",
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
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

  const cardClasses = theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Profile Picture
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New
                      </Button>
                      <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Company
                      </Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )

      case "account":
        return (
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="current-password"
                        className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password" className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="confirm-password"
                        className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className={`mt-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                      />
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className={`${cardClasses} border-red-500/50`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-red-500">Danger Zone</h3>
                  <p className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )

      case "notifications":
        return (
          <motion.div variants={fadeInUp}>
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Email notifications for new signups", checked: true },
                    { label: "Weekly analytics reports", checked: true },
                    { label: "Product updates and announcements", checked: false },
                    { label: "Marketing emails", checked: false },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {notification.label}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={notification.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case "billing":
        return (
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Current Plan
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Pro Plan
                      </p>
                      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        $29/month • Next billing: Jan 15, 2024
                      </p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Payment Method
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          •••• •••• •••• 4242
                        </p>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          Expires 12/25
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Recent Invoices
                  </h3>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 15, 2023", amount: "$29.00", status: "Paid" },
                      { date: "Nov 15, 2023", amount: "$29.00", status: "Paid" },
                      { date: "Oct 15, 2023", amount: "$29.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {invoice.date}
                          </p>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            {invoice.amount}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                            {invoice.status}
                          </span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Settings</h1>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div variants={fadeInUp} className="lg:col-span-1">
          <Card className={cardClasses}>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-600 text-white"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-3">{renderTabContent()}</div>
      </div>
    </motion.div>
  )
}
