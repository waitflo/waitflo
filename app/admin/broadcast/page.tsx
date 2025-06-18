"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send, Users, Crown, DollarSign, Upload, Eye, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function BroadcastPage() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    audience: "all",
    image: null as File | null,
  })

  const [previousAnnouncements] = useState([
    {
      id: "1",
      title: "New AI Features Available",
      message: "We've launched new AI capabilities for all Pro users...",
      audience: "Pro Users",
      sentDate: "2024-01-20",
      openRate: "68%",
      recipients: 2847,
    },
    {
      id: "2",
      title: "Platform Maintenance Notice",
      message: "Scheduled maintenance will occur on Sunday...",
      audience: "All Users",
      sentDate: "2024-01-18",
      openRate: "45%",
      recipients: 12847,
    },
    {
      id: "3",
      title: "Affiliate Program Updates",
      message: "We're increasing commission rates for top performers...",
      audience: "Affiliates",
      sentDate: "2024-01-15",
      openRate: "82%",
      recipients: 156,
    },
  ])

  const handleSendAnnouncement = () => {
    console.log("Sending announcement:", announcement)
    // Reset form
    setAnnouncement({
      title: "",
      message: "",
      audience: "all",
      image: null,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnnouncement({ ...announcement, image: e.target.files[0] })
    }
  }

  const getAudienceCount = (audience: string) => {
    switch (audience) {
      case "all":
        return 12847
      case "paid":
        return 3421
      case "affiliates":
        return 156
      default:
        return 0
    }
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
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-white">Broadcast Announcements</h1>
        <p className="text-gray-400 mt-1">Send announcements to users across the platform</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create Announcement */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Create Announcement</h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-white text-sm font-medium mb-2 block">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={announcement.title}
                    onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                    placeholder="Enter announcement title"
                    className="bg-black border-gray-700 text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white text-sm font-medium mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={announcement.message}
                    onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                    placeholder="Write your announcement message..."
                    className="bg-black border-gray-700 text-white placeholder-gray-500 min-h-32 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="audience" className="text-white text-sm font-medium mb-2 block">
                    Target Audience
                  </Label>
                  <select
                    id="audience"
                    value={announcement.audience}
                    onChange={(e) => setAnnouncement({ ...announcement, audience: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border bg-black border-gray-700 text-white"
                  >
                    <option value="all">All Users ({getAudienceCount("all").toLocaleString()})</option>
                    <option value="paid">Paid Users Only ({getAudienceCount("paid").toLocaleString()})</option>
                    <option value="affiliates">
                      Affiliates Only ({getAudienceCount("affiliates").toLocaleString()})
                    </option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="image" className="text-white text-sm font-medium mb-2 block">
                    Optional Image
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          {announcement.image ? announcement.image.name : "Click to upload image"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    onClick={handleSendAnnouncement}
                    disabled={!announcement.title || !announcement.message}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audience Stats */}
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Audience Overview</h3>
              <div className="space-y-4">
                {[
                  { icon: Users, label: "All Users", count: 12847, color: "blue" },
                  { icon: Crown, label: "Paid Users", count: 3421, color: "purple" },
                  { icon: DollarSign, label: "Affiliates", count: 156, color: "green" },
                ].map((audience, index) => (
                  <div key={audience.label} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${audience.color}-600/20`}>
                        <audience.icon className={`w-5 h-5 text-${audience.color}-500`} />
                      </div>
                      <span className="text-white font-medium">{audience.label}</span>
                    </div>
                    <span className="text-white font-semibold">{audience.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Engagement Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                  <p className="text-purple-300 font-medium">📧 Subject Line</p>
                  <p className="text-gray-400">Keep titles under 50 characters for better open rates</p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <p className="text-blue-300 font-medium">⏰ Timing</p>
                  <p className="text-gray-400">Send between 10 AM - 2 PM for optimal engagement</p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <p className="text-green-300 font-medium">🎯 Targeting</p>
                  <p className="text-gray-400">Segment your audience for more relevant messaging</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Previous Announcements */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Previous Announcements</h3>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>

            <div className="space-y-4">
              {previousAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{announcement.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{announcement.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>To: {announcement.audience}</span>
                        <span>•</span>
                        <span>Sent: {new Date(announcement.sentDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{announcement.recipients.toLocaleString()} recipients</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-500">{announcement.openRate}</div>
                      <div className="text-xs text-gray-400">Open Rate</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
