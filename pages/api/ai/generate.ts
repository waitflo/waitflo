import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { generateGpt4Content, generateDalleImage } from '../../../lib/openai'
import { supabase } from '../../../lib/supabase'

const aiInputSchema = z.object({
  prompt: z.string().min(1),
  brandName: z.string().optional(),
  colorPalette: z.array(z.string()).optional(),
  logoUrl: z.string().url().optional(),
  onboardingQuestions: z.array(z.string()).optional(),
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}

async function uploadLogoToSupabase(file: Buffer, filename: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: 'image/png',
    })
  if (error) return null
  return supabase.storage.from('logos').getPublicUrl(filename).data.publicUrl
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Handle file upload if multipart/form-data
    let body = req.body
    let logoUrl = undefined
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'File upload via multipart/form-data not supported in this endpoint. Please upload logo to Supabase Storage first.' })
    }

    // Validate input
    const parsed = aiInputSchema.safeParse(body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.errors })
    }
    const { prompt, brandName, colorPalette, onboardingQuestions } = parsed.data
    logoUrl = parsed.data.logoUrl

    // If logoUrl is missing, generate one with DALL·E
    if (!logoUrl) {
      const dallePrompt = `Minimal, modern logo for ${brandName || 'a new brand'}${colorPalette ? ' with colors ' + colorPalette.join(', ') : ''}`
      try {
        logoUrl = await generateDalleImage(dallePrompt)
      } catch (err) {
        logoUrl = undefined
      }
    }

    // Compose the GPT-4 prompt for TWO JSX pages using ShadCN UI
    const gptPrompt = `You are an expert React/Next.js UI developer. Given the following:
- Brand: ${brandName || 'N/A'}
- Colors: ${colorPalette?.join(', ') || 'N/A'}
- Logo: ${logoUrl || 'N/A'}
- Onboarding Questions: ${(onboardingQuestions || []).join(', ')}
- Startup Description: ${prompt}

Generate TWO React component JSX strings (not HTML):
1. waitlistJSX: A waitlist signup page using ONLY ShadCN UI components (Card, Button, Input, etc.) and Tailwind CSS. Use the brand/colors/logo if provided. The design should match the startup description and use appropriate background, text, and accent colors.
2. onboardingJSX: An onboarding page using ONLY ShadCN UI components and Tailwind CSS, with fields for the onboarding questions above. Use the brand/colors/logo if provided. The design should match the startup description and use appropriate background, text, and accent colors.

Return a JSON object with exactly these fields:
{
  "waitlistJSX": "...JSX string...",
  "onboardingJSX": "...JSX string..."
}
DO NOT return HTML, markdown, or any explanation. DO NOT use Bootstrap or raw HTML. Only use ShadCN UI components and Tailwind CSS.`

    let gptResult: any = null
    try {
      const gptRaw = await generateGpt4Content(gptPrompt)
      gptResult = JSON.parse(gptRaw)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to generate JSX', details: err instanceof Error ? err.message : err })
    }

    return res.status(200).json({
      ...gptResult,
      logoUrl,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : err })
  }
} 