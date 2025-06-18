import { NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { withAuth, AuthenticatedRequest } from '../../../lib/auth'
import { z } from 'zod'

const createFlowSchema = z.object({
  content_json: z.any(), // This will contain the AI-generated flow structure
  title: z.string().min(1).max(100).optional()
})

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { content_json, title } = createFlowSchema.parse(req.body)

    // TODO: Here you would integrate with your AI service to generate the flow
    // For now, we'll just store the provided content
    // Example AI integration:
    // const aiGeneratedFlow = await generateFlowWithAI(prompt, userPreferences)
    
    const { data: flow, error } = await supabase
      .from('flows')
      .insert({
        user_id: req.user!.id,
        content_json: content_json
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating flow:', error)
      return res.status(500).json({ error: 'Failed to create flow' })
    }

    return res.status(201).json({
      message: 'Flow created successfully',
      flow: {
        id: flow.id,
        content_json: flow.content_json,
        created_at: flow.created_at
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input data', details: error.errors })
    }
    
    console.error('Create flow error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withAuth(handler) 