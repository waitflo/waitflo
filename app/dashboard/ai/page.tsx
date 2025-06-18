"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Sparkles, Upload, Wand2, Download, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../layout"

export default function AIGeneratorPage() {
  const { theme } = useTheme()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedFlow, setGeneratedFlow] = useState<any>(null)

  const promptExamples = [
    "A fintech app that helps users track expenses and save money automatically",
    "A social media platform for pet owners to share photos and connect",
    "An AI-powered fitness app that creates personalized workout plans",
    "A marketplace for freelance graphic designers and clients",
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedFlow({
        title: "AI Generated Flow",
        description: "Generated based on your prompt",
        blocks: [
          { type: "heading", content: "Join the Waitlist" },
          { type: "text", content: "Be the first to know when we launch!" },
          { type: "input", content: "Enter your email" },
          { type: "button", content: "Get Early Access" },
        ],
      })
      setIsGenerating(false)
    }, 3000)
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

  const cardClasses = theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>AI Flow Generator</h1>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>
          Describe your product and let AI create the perfect onboarding flow
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Input */}
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className={cardClasses}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Describe Your Product
                </h2>
              </div>

              <Textarea
                placeholder="Tell us about your product, target audience, key features, and goals..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`min-h-32 resize-none ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
              />

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Flow
                    </>
                  )}
                </Button>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Examples */}
          <Card className={cardClasses}>
            <CardContent className="p-6">
              <h3 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Example Prompts
              </h3>
              <div className="space-y-3">
                {promptExamples.map((example, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setPrompt(example)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>"{example}"</p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Preview */}
        <motion.div variants={fadeInUp}>
          <Card className={cardClasses}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Generated Preview
                </h2>
                {generatedFlow && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                )}
              </div>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mb-4"
                  />
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    AI is working its magic...
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-center`}>
                    Analyzing your prompt and generating the perfect onboarding flow
                  </p>
                </div>
              ) : generatedFlow ? (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg border-2 border-dashed ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-300 bg-gray-50"}`}
                  >
                    {generatedFlow.blocks.map((block: any, index: number) => (
                      <div key={index} className="mb-4 last:mb-0">
                        {block.type === "heading" && (
                          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {block.content}
                          </h2>
                        )}
                        {block.type === "text" && (
                          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{block.content}</p>
                        )}
                        {block.type === "input" && (
                          <input
                            placeholder={block.content}
                            className={`w-full p-3 rounded-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                          />
                        )}
                        {block.type === "button" && (
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">{block.content}</Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">Use This Flow</Button>
                    <Button variant="outline" onClick={() => setGeneratedFlow(null)}>
                      Generate New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div
                    className={`w-16 h-16 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Sparkles className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Ready to generate
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Describe your product to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
