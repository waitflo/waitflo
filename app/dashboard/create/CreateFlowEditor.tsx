"use client";
import React, { useState } from "react";
import ReactBricksApp from "../../../waitflo/components/ReactBricksApp";
import { Editor } from "react-bricks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function CreateFlowEditor() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactBricksApp>
        <Editor />
      </ReactBricksApp>
    </QueryClientProvider>
  );
} 