import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { z } from 'zod'

const createOrderSchema = z.object({
  template_id: z.string().uuid(),
  buyer_email: z.string().email(),
  customization_data: z.record(z.any()), // Flexible object for customization inputs
  special_instructions: z.string().optional()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { template_id, buyer_email, customization_data, special_instructions } = createOrderSchema.parse(req.body)

    // Verify template exists and is public
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('*')
      .eq('id', template_id)
      .eq('is_public', true)
      .single()

    if (templateError || !template) {
      return res.status(404).json({ error: 'Template not found or not available' })
    }

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        template_id,
        buyer_email,
        customization_data: {
          ...customization_data,
          special_instructions: special_instructions || null
        },
        delivered_url: null // Will be updated when order is fulfilled
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return res.status(500).json({ error: 'Failed to create order' })
    }

    // Increment template usage count
    await supabase
      .from('templates')
      .update({ usage_count: template.usage_count + 1 })
      .eq('id', template_id)

    // TODO: Send confirmation email to buyer
    // TODO: Send notification to template creator
    // TODO: Integrate with payment processing if template has a price

    return res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        template_id: order.template_id,
        buyer_email: order.buyer_email,
        created_at: order.created_at
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input data', details: error.errors })
    }
    
    console.error('Create order error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 