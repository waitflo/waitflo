import { NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { withAuth, AuthenticatedRequest } from '../../../lib/auth'
import { z } from 'zod'

const updateOrderSchema = z.object({
  id: z.string().uuid(),
  delivered_url: z.string().url().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional()
})

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  // TODO: Add admin role check
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          templates!orders_template_id_fkey (
            title,
            price,
            creator_id
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return res.status(500).json({ error: 'Failed to fetch orders' })
      }

      return res.status(200).json({
        orders: orders || []
      })
    } catch (error) {
      console.error('Admin orders error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, delivered_url, status } = updateOrderSchema.parse(req.body)

      const updateData: any = {}
      if (delivered_url !== undefined) updateData.delivered_url = delivered_url
      if (status !== undefined) updateData.status = status

      const { data: order, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating order:', error)
        return res.status(500).json({ error: 'Failed to update order' })
      }

      return res.status(200).json({
        message: 'Order updated successfully',
        order
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input data', details: error.errors })
      }
      
      console.error('Admin update order error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default withAuth(handler) 