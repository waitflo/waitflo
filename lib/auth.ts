import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from './supabase'

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string
    email: string
    name?: string
    plan: 'free' | 'pro'
  }
}

export async function authenticateUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ user: any; error?: string }> {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, error: 'No authorization header' }
    }

    const token = authHeader.substring(7)
    
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return { user: null, error: 'Invalid token' }
    }

    // Get additional user data from our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (userError) {
      return { user: null, error: 'User not found in database' }
    }

    return { 
      user: {
        id: user.id,
        email: user.email,
        name: userData.name,
        plan: userData.plan
      }
    }
  } catch (error) {
    return { user: null, error: 'Authentication failed' }
  }
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { user, error } = await authenticateUser(req, res)
    
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    req.user = user
    return handler(req, res)
  }
}

export function withOptionalAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { user } = await authenticateUser(req, res)
    
    if (user) {
      req.user = user
    }
    
    return handler(req, res)
  }
} 