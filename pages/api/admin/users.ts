import { NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { withAuth, AuthenticatedRequest } from '../../../lib/auth'

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  // TODO: Add admin role check
  // For now, we'll just check if the user exists
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        return res.status(500).json({ error: 'Failed to fetch users' })
      }

      return res.status(200).json({
        users: users || []
      })
    } catch (error) {
      console.error('Admin users error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, plan } = req.body

      if (!id || !plan) {
        return res.status(400).json({ error: 'User ID and plan are required' })
      }

      const { data: user, error } = await supabase
        .from('users')
        .update({ plan })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        return res.status(500).json({ error: 'Failed to update user' })
      }

      return res.status(200).json({
        message: 'User updated successfully',
        user
      })
    } catch (error) {
      console.error('Admin update user error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default withAuth(handler) 