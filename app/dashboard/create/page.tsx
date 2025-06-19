"use client"

import dynamic from "next/dynamic";

const CreateFlowEditor = dynamic(() => import("./CreateFlowEditor"), {
  ssr: false,
});

export default function CreateFlowPage() {
  return <CreateFlowEditor />;
}
