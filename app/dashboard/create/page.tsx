"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from "react"
import { Admin, Editor } from "react-bricks"

const CreateFlowPage: React.FC = () => {
  useEffect(() => {
    document.title = "Create Flow"
  }, [])

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Admin>
        <Editor />
      </Admin>
    </QueryClientProvider>
  )
}

export default CreateFlowPage
