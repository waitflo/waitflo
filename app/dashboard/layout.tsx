"use client"

import type React from "react"

import { useState, createContext, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Bell, User, Sun, Moon, ChevronDown, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"

// Theme Context
const ThemeContext = createContext<{
  theme: "dark" | "light"
  toggleTheme: () => void
}>({
  theme: "dark",
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<"dark" | "light">("light")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const themeClasses = theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
  const cardClasses = theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"

  const isCreateFlowPage = pathname === "/dashboard/create"

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
        {/* Sidebar */}
        {!isCreateFlowPage && <Sidebar />}

        {/* Mobile Sidebar */}
        {!isCreateFlowPage && mobileSidebarOpen && <Sidebar isMobile={true} />}

        {/* Main Layout Container */}
        <div className={isCreateFlowPage ? "ml-0" : "ml-0 lg:ml-64"}>
          {/* Header */}
          {!isCreateFlowPage && (
            <motion.header
              className={`sticky top-0 z-30 ${theme === "dark" ? "bg-black/95" : "bg-white/95"} backdrop-blur-xl border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} transition-colors duration-300`}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                {/* Left - Mobile Menu & Logo */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                  <Link
                    href="/dashboard"
                    className="lg:hidden text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                  >
                    Waitflo
                  </Link>
                </div>

                {/* Center - Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  {["Dashboard", "Templates", "Create", "AI", "Analytics"].map((item) => (
                    <Link
                      key={item}
                      href={`/dashboard${item === "Dashboard" ? "" : `/${item.toLowerCase()}`}`}
                      className={`text-sm font-medium transition-colors hover:text-purple-500 ${
                        pathname === `/dashboard${item === "Dashboard" ? "" : `/${item.toLowerCase()}`}`
                          ? "text-purple-500"
                          : theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                      }`}
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                {/* Right - Actions */}
                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <motion.button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.button>

                  {/* Notifications */}
                  <button
                    className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors relative`}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
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
                          className={`absolute right-0 mt-2 w-48 ${cardClasses} rounded-lg shadow-lg border py-2`}
                        >
                          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <p className="font-medium">John Doe</p>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                              john@example.com
                            </p>
                          </div>
                          <Link
                            href="/dashboard/settings"
                            className={`flex items-center px-4 py-2 text-sm ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Link>
                          <button
                            className={`flex items-center w-full px-4 py-2 text-sm ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors text-red-500`}
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
            </motion.header>
          )}
          {/* Main Content */}
          <main className="min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-4 lg:p-6 max-w-full overflow-x-hidden"
            >
              {children}
            </motion.div>
          </main>
        </div>
        {/* Mobile Sidebar Overlay */}
        {!isCreateFlowPage && (
          <AnimatePresence>
            {mobileSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </ThemeContext.Provider>
  )
}
