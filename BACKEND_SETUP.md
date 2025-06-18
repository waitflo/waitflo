# WaitFlo Backend Setup Guide

This guide will help you set up the complete backend system for your WaitFlo Next.js project using Supabase.

## 🚀 Quick Start

### 1. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys from the Settings > API section
3. Copy the following keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 2. Environment Variables

1. Copy `env.example` to `.env.local`
2. Fill in your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: JWT Secret for additional security
JWT_SECRET=your_jwt_secret_here
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Run the SQL script to create all tables, indexes, and security policies

### 4. Install Dependencies

The required dependencies are already installed:
- `@supabase/supabase-js` - Supabase client
- `zod` - Input validation (already in your project)

## 📁 Backend Structure

```
pages/api/
├── auth/
│   ├── signup.ts          # User registration
│   └── login.ts           # User authentication
├── templates/
│   ├── public.ts          # Get public templates
│   ├── [id].ts            # Get single template
│   └── create.ts          # Create new template (protected)
├── flows/
│   └── create.ts          # Create AI-generated flow (protected)
├── orders/
│   └── create.ts          # Create template customization order
├── affiliate/
│   └── stats.ts           # Get affiliate statistics (protected)
└── admin/
    ├── users.ts           # Admin user management
    └── orders.ts          # Admin order management

lib/
├── supabase.ts            # Supabase client configuration
├── auth.ts                # Authentication middleware
└── utils.ts               # Utility functions
```

## 🔒 Authentication System

### User Registration
- **Endpoint**: `POST /api/auth/signup`
- **Body**: `{ email, password, name? }`
- **Response**: User data and session

### User Login
- **Endpoint**: `POST /api/auth/login`
- **Body**: `{ email, password }`
- **Response**: User data and session

### Protected Routes
Use the `withAuth` middleware for routes that require authentication:

```typescript
import { withAuth, AuthenticatedRequest } from '../../../lib/auth'

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // req.user contains the authenticated user data
  const userId = req.user!.id
}

export default withAuth(handler)
```

## 📊 Data Models

### Users
- `id` (UUID) - Primary key, references Supabase auth.users
- `email` (TEXT) - User email
- `name` (TEXT) - User display name
- `plan` (TEXT) - 'free' or 'pro'
- `created_at` (TIMESTAMP)

### Templates
- `id` (UUID) - Primary key
- `title` (TEXT) - Template title
- `preview_url` (TEXT) - Preview image URL
- `creator_id` (UUID) - References users.id
- `price` (DECIMAL) - Template price
- `usage_count` (INTEGER) - Number of times used
- `is_public` (BOOLEAN) - Public visibility
- `created_at` (TIMESTAMP)

### Flows
- `id` (UUID) - Primary key
- `user_id` (UUID) - References users.id
- `content_json` (JSONB) - AI-generated flow structure
- `created_at` (TIMESTAMP)

### Orders
- `id` (UUID) - Primary key
- `template_id` (UUID) - References templates.id
- `buyer_email` (TEXT) - Customer email
- `customization_data` (JSONB) - Customization inputs
- `delivered_url` (TEXT) - Final delivery URL
- `status` (TEXT) - Order status
- `created_at` (TIMESTAMP)

### Affiliates
- `id` (UUID) - Primary key
- `user_id` (UUID) - References users.id
- `clicks` (INTEGER) - Click count
- `conversions` (INTEGER) - Conversion count
- `payout_due` (DECIMAL) - Pending payout amount
- `created_at` (TIMESTAMP)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Templates
- `GET /api/templates/public` - Get all public templates
- `GET /api/templates/[id]` - Get single template
- `POST /api/templates/create` - Create new template (protected)

### Flows
- `POST /api/flows/create` - Create AI-generated flow (protected)

### Orders
- `POST /api/orders/create` - Create template customization order

### Affiliate
- `GET /api/affiliate/stats` - Get affiliate statistics (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin)
- `PUT /api/admin/users` - Update user (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders` - Update order (admin)

## 🛡️ Security Features

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Public templates are viewable by everyone
- Private templates are only viewable by creators
- Orders are accessible by template creators

### Input Validation
All API endpoints use Zod for input validation:
- Email format validation
- Password length requirements
- Required field validation
- Type checking

### Authentication Middleware
- JWT token validation
- User session verification
- Automatic user data injection

## 🚀 Usage Examples

### Frontend Integration

```typescript
// Sign up a new user
const signup = async (email: string, password: string, name?: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  })
  return response.json()
}

// Get public templates
const getTemplates = async () => {
  const response = await fetch('/api/templates/public')
  return response.json()
}

// Create a template (authenticated)
const createTemplate = async (templateData: any, token: string) => {
  const response = await fetch('/api/templates/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(templateData)
  })
  return response.json()
}
```

## 🔧 Customization

### Adding New API Routes
1. Create a new file in the appropriate directory under `pages/api/`
2. Export a default function that handles the request
3. Use the `withAuth` middleware for protected routes
4. Add input validation with Zod schemas

### Database Schema Changes
1. Modify the `supabase-schema.sql` file
2. Run the updated SQL in your Supabase SQL Editor
3. Update the TypeScript types in `lib/supabase.ts`

### Environment Variables
Add new environment variables to:
1. `env.example` (for documentation)
2. `.env.local` (for your local development)
3. Your production environment

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check that your Supabase URL and keys are correct
   - Verify that the database schema has been applied
   - Ensure RLS policies are properly configured

2. **Database Connection Issues**
   - Verify your Supabase project is active
   - Check that the service role key has proper permissions
   - Ensure the database schema has been created

3. **CORS Issues**
   - Add your frontend domain to Supabase CORS settings
   - Check that API routes are properly configured

### Debug Mode
Enable debug logging by adding to your environment:
```bash
DEBUG=supabase:*
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Zod Validation](https://zod.dev/)
- [TypeScript with Next.js](https://nextjs.org/docs/basic-features/typescript)

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify your Supabase project configuration
3. Review the API endpoint documentation
4. Check the browser console and server logs for errors 