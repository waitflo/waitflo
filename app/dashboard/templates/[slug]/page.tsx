"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LiveProvider, LivePreview } from "react-live";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function TemplateSlugPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [waitlist, setWaitlist] = useState<any>(null);
  const [onboarding, setOnboarding] = useState<any>(null);
  const [listing, setListing] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      setError(null);
      // Find by vercel_url containing the slug
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .ilike("vercel_url", `%${slug}%`);
      if (error || !data || data.length === 0) {
        setError("Template not found.");
        setLoading(false);
        return;
      }
      setWaitlist(data.find((t: any) => t.type === "waitlist"));
      setOnboarding(data.find((t: any) => t.type === "onboarding"));
      setLoading(false);
    };
    if (slug) fetchTemplates();
  }, [slug]);

  const handleListToggle = async (template: any, value: boolean) => {
    setListing(true);
    const { error } = await supabase
      .from("templates")
      .update({ is_listed: value })
      .eq("id", template.id);
    setListing(false);
    if (error) {
      toast.error("Failed to update listing status.");
    } else {
      toast.success(value ? "Template listed!" : "Template unlisted.");
      // Refresh
      router.refresh();
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Template Preview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {waitlist && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Waitlist Page</h2>
            <LiveProvider code={waitlist.jsx_code} scope={{ Card, CardContent, Button, Input }}>
              <LivePreview />
            </LiveProvider>
            <div className="mt-4 flex gap-2">
              <Button
                variant={waitlist.is_listed ? "secondary" : "default"}
                onClick={() => handleListToggle(waitlist, !waitlist.is_listed)}
                disabled={listing}
              >
                {waitlist.is_listed ? "Unlist from Marketplace" : "List on Marketplace"}
              </Button>
              <a href={waitlist.vercel_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Open Live</Button>
              </a>
            </div>
          </div>
        )}
        {onboarding && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Onboarding Page</h2>
            <LiveProvider code={onboarding.jsx_code} scope={{ Card, CardContent, Button, Input }}>
              <LivePreview />
            </LiveProvider>
            <div className="mt-4 flex gap-2">
              <Button
                variant={onboarding.is_listed ? "secondary" : "default"}
                onClick={() => handleListToggle(onboarding, !onboarding.is_listed)}
                disabled={listing}
              >
                {onboarding.is_listed ? "Unlist from Marketplace" : "List on Marketplace"}
              </Button>
              <a href={onboarding.vercel_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Open Live</Button>
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Branding & Metadata</h2>
        <div className="mb-4 flex items-center gap-4">
          {waitlist?.logo_url && <img src={waitlist.logo_url} alt="Logo" className="h-12 rounded" />}
          <div>
            <div className="font-medium">{waitlist?.title || onboarding?.title}</div>
            <div className="text-sm text-gray-500">Primary Color: {waitlist?.primary_color || onboarding?.primary_color}</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="font-medium">Onboarding Questions:</div>
          <ul className="list-disc pl-6">
            {(waitlist?.questions || onboarding?.questions || []).map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-gray-500 mt-2">Vercel URL: <a href={waitlist?.vercel_url || onboarding?.vercel_url} className="underline" target="_blank" rel="noopener noreferrer">{waitlist?.vercel_url || onboarding?.vercel_url}</a></div>
      </div>
    </div>
  );
} 