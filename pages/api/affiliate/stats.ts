import { NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { withAuth, AuthenticatedRequest } from '../../../lib/auth'

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get affiliate stats for the authenticated user
    const { data: affiliateStats, error: affiliateError } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', req.user!.id)
      .single()

    if (affiliateError) {
      if (affiliateError.code === 'PGRST116') {
        // Create affiliate record if it doesn't exist
        const { data: newAffiliate, error: createError } = await supabase
          .from('affiliates')
          .insert({
            user_id: req.user!.id,
            clicks: 0,
            conversions: 0,
            payout_due: 0
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating affiliate record:', createError)
          return res.status(500).json({ error: 'Failed to create affiliate record' })
        }

        return res.status(200).json({
          stats: newAffiliate
        })
      }
      
      console.error('Error fetching affiliate stats:', affiliateError)
      return res.status(500).json({ error: 'Failed to fetch affiliate stats' })
    }

    // Get recent orders that might be attributed to this affiliate
    // TODO: Implement proper affiliate tracking logic
    const { data: recentOrders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        templates!orders_template_id_fkey (
          title,
          price
        )
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    if (ordersError) {
      console.error('Error fetching recent orders:', ordersError)
    }

    return res.status(200).json({
      stats: affiliateStats,
      recentOrders: recentOrders || []
    })
  } catch (error) {
    console.error('Affiliate stats error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withAuth(handler) 