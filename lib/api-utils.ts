import { NextApiResponse } from 'next'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function successResponse<T>(
  res: NextApiResponse,
  data: T,
  message?: string,
  statusCode: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  }
  
  return res.status(statusCode).json(response)
}

export function errorResponse(
  res: NextApiResponse,
  error: string,
  statusCode: number = 500
) {
  const response: ApiResponse = {
    success: false,
    error
  }
  
  return res.status(statusCode).json(response)
}

export function validationErrorResponse(
  res: NextApiResponse,
  errors: any[]
) {
  const response: ApiResponse = {
    success: false,
    error: 'Validation failed',
    data: { errors }
  }
  
  return res.status(400).json(response)
}

export function notFoundResponse(
  res: NextApiResponse,
  resource: string = 'Resource'
) {
  return errorResponse(res, `${resource} not found`, 404)
}

export function unauthorizedResponse(
  res: NextApiResponse,
  message: string = 'Unauthorized'
) {
  return errorResponse(res, message, 401)
}

export function forbiddenResponse(
  res: NextApiResponse,
  message: string = 'Forbidden'
) {
  return errorResponse(res, message, 403)
}

export function methodNotAllowedResponse(
  res: NextApiResponse,
  allowedMethods: string[] = ['GET', 'POST']
) {
  res.setHeader('Allow', allowedMethods.join(', '))
  return errorResponse(res, 'Method not allowed', 405)
}

// Helper function to handle async API routes with error catching
export function withErrorHandler(
  handler: (req: any, res: NextApiResponse) => Promise<void>
) {
  return async (req: any, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error('API Error:', error)
      return errorResponse(res, 'Internal server error', 500)
    }
  }
}

// Helper function to validate required fields
export function validateRequiredFields(
  body: any,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(field => !body[field])
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}

// Helper function to sanitize user input
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

// Helper function to generate pagination metadata
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function generatePaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit)
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  }
} 