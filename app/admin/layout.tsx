"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Bell,
  User,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Settings,
  Home,
  Users,
  FileText,
  LayoutTemplate,
  DollarSign,
  Megaphone,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

// Theme Context
const ThemeContext = createContext<{
  theme: "dark" | "light"
  toggleTheme: () => void
}>({
  theme: "dark",
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: LayoutTemplate, label: "Templates", href: "/admin/templates" },
  { icon: FileText, label: "Flows", href: "/admin/flows" },
  { icon: DollarSign, label: "Affiliates", href: "/admin/affiliates" },
  { icon: Megaphone, label: "Broadcast", href: "/admin/broadcast" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    router.push("/admin/login")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-black text-white">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col h-screen w-64 bg-gray-900 border-r border-gray-800 fixed left-0 top-0 z-40">
          {/* Sidebar Header */}
          <div className="flex items-center p-6 border-b border-gray-800">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Waitflo</div>
              <div className="text-xs text-gray-400">Admin Panel</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin Master</p>
                <p className="text-xs text-gray-400 truncate">Platform Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 lg:hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">Waitflo</div>
                      <div className="text-xs text-gray-400">Admin Panel</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Layout Container */}
        <div className="ml-0 lg:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-xl border-b border-gray-800">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Left - Mobile Menu & Logo */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="lg:hidden text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Waitflo Admin
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2"
                      >
                        <div className="px-4 py-2 border-b border-gray-800">
                          <p className="font-medium text-white">Admin Master</p>
                          <p className="text-sm text-gray-400">adminmaster@gmail.com</p>
                        </div>
                        <Link
                          href="/admin/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-screen">
            <div className="p-4 lg:p-6 max-w-full overflow-x-hidden">{children}</div>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}
