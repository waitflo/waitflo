"use client"

import React, { useEffect } from "react"
import { Admin, Editor } from "react-bricks"

const CreateFlowPage: React.FC = () => {
  useEffect(() => {
    document.title = "Create Flow"
  }, [])

  return (
    <Admin>
      <Editor />
    </Admin>
  )
}

export default CreateFlowPage
