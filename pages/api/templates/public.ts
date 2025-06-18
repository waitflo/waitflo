import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabase
      .from('templates')
      .select(`id, title, preview_url, price, created_at, users!inner(name)`)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching templates:', error)
      return res.status(500).json({ error: 'Failed to fetch templates' })
    }

    const templates = (data || []).map((t: any) => ({
      id: t.id,
      title: t.title,
      preview_url: t.preview_url,
      creator_name: t.users?.name || 'Unknown',
      price: t.price,
      created_at: t.created_at,
    }))

    return res.status(200).json({ templates })
  } catch (error) {
    console.error('Public templates error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 