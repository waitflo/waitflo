import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password, name } = signupSchema.parse(req.body)

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || null
        }
      }
    })

    if (authError) {
      return res.status(400).json({ error: authError.message })
    }

    if (!authData.user) {
      return res.status(400).json({ error: 'Failed to create user' })
    }

    // Create user record in our users table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        name: name || null,
        plan: 'free'
      })

    if (userError) {
      // If user creation fails, we should clean up the auth user
      await supabase.auth.admin.deleteUser(authData.user.id)
      return res.status(500).json({ error: 'Failed to create user profile' })
    }

    // Create affiliate record
    await supabase
      .from('affiliates')
      .insert({
        user_id: authData.user.id,
        clicks: 0,
        conversions: 0,
        payout_due: 0
      })

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: name || null,
        plan: 'free'
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input data', details: error.errors })
    }
    
    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 