import { NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { withAuth, AuthenticatedRequest } from '../../../lib/auth'
import { z } from 'zod'

const createTemplateSchema = z.object({
  title: z.string().min(1).max(100),
  preview_url: z.string().url().optional(),
  price: z.number().min(0),
  is_public: z.boolean().default(false)
})

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, preview_url, price, is_public } = createTemplateSchema.parse(req.body)

    // Check if user has permission to create templates
    if (req.user!.plan === 'free' && price > 0) {
      return res.status(403).json({ 
        error: 'Free users cannot create paid templates. Upgrade to Pro to create paid templates.' 
      })
    }

    const { data: template, error } = await supabase
      .from('templates')
      .insert({
        title,
        preview_url: preview_url || null,
        creator_id: req.user!.id,
        price,
        usage_count: 0,
        is_public
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating template:', error)
      return res.status(500).json({ error: 'Failed to create template' })
    }

    return res.status(201).json({
      message: 'Template created successfully',
      template
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input data', details: error.errors })
    }
    
    console.error('Create template error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withAuth(handler) 