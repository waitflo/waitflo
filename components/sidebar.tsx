"use client"
import { Home, FileText, LayoutTemplate, Plus, Sparkles, BarChart3, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/app/dashboard/layout"

interface SidebarProps {
  isMobile?: boolean
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Flows", href: "/dashboard/flows" },
  { icon: LayoutTemplate, label: "Templates", href: "/dashboard/templates" },
  { icon: FileText, label: "My Templates", href: "/dashboard/my-templates" },
  { icon: Sparkles, label: "AI Generator", href: "/dashboard/ai" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Affiliates", href: "/dashboard/affiliates" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const { theme } = useTheme()
  const pathname = usePathname()

  const sidebarClasses = theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen w-64 ${sidebarClasses} border-r transition-colors duration-300 fixed left-0 top-0 z-40`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Waitflo
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
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                John Doe
              </p>
              <p className={`text-xs truncate ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                john@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobile && (
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 ${sidebarClasses} border-r transition-colors duration-300`}
        >
          {/* Mobile Sidebar Header */}
          <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Waitflo
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  John Doe
                </p>
                <p className={`text-xs truncate ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
