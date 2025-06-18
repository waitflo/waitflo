import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { generateGpt4Content, generateDalleImage } from '../../../lib/openai'
import { supabase } from '../../../lib/supabase'

const aiInputSchema = z.object({
  prompt: z.string().min(1),
  brandName: z.string().optional(),
  colorPalette: z.array(z.string()).optional(),
  logoUrl: z.string().url().optional(),
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
      // Not implemented: recommend using a separate upload endpoint or client-side upload to Supabase
      return res.status(400).json({ error: 'File upload via multipart/form-data not supported in this endpoint. Please upload logo to Supabase Storage first.' })
    }

    // Validate input
    const parsed = aiInputSchema.safeParse(body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.errors })
    }
    const { prompt, brandName, colorPalette } = parsed.data
    logoUrl = parsed.data.logoUrl

    // If logoUrl is missing, generate one with DALL·E
    if (!logoUrl) {
      const dallePrompt = `Minimal, modern logo for ${brandName || 'a new brand'}${colorPalette ? ' with colors ' + colorPalette.join(', ') : ''}`
      try {
        logoUrl = await generateDalleImage(dallePrompt)
      } catch (err) {
        // fallback: no logo
        logoUrl = undefined
      }
    }

    // Compose the GPT-4 prompt
    const gptPrompt = `Brand: ${brandName || 'N/A'}\nColors: ${colorPalette?.join(', ') || 'N/A'}\nLogo: ${logoUrl || 'N/A'}\nPrompt: ${prompt}\n\nGenerate:\n- A catchy headline\n- A subheadline\n- Section content for onboarding pages (JSON array, each with title and description)\n- Return as JSON: { headline, subheadline, sections: [ { title, description } ], logoUrl, html }\n- html: a basic HTML structure for the onboarding page using the above data.`

    let gptResult: any = null
    try {
      const gptRaw = await generateGpt4Content(gptPrompt)
      gptResult = JSON.parse(gptRaw)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to generate onboarding content', details: err instanceof Error ? err.message : err })
    }

    return res.status(200).json({
      ...gptResult,
      logoUrl,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : err })
  }
} 