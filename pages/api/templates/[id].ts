import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Template ID is required' })
  }

  try {
    const { data: template, error } = await supabase
      .from('templates')
      .select(`
        *,
        users!templates_creator_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Template not found' })
      }
      console.error('Error fetching template:', error)
      return res.status(500).json({ error: 'Failed to fetch template' })
    }

    // Check if template is public or if user has access
    if (!template.is_public) {
      // TODO: Add logic to check if user owns the template or has purchased it
      return res.status(403).json({ error: 'Template not accessible' })
    }

    return res.status(200).json({
      template
    })
  } catch (error) {
    console.error('Template fetch error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 