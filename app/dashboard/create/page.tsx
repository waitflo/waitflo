"use client"

export const dynamic = "force-dynamic";

import React from "react"
import ReactBricksApp from "../../../waitflo/components/ReactBricksApp"
import { Editor } from "react-bricks"

export default function CreateFlowPage() {
  return (
    <ReactBricksApp>
      <Editor />
    </ReactBricksApp>
  )
}
