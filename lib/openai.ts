import { Configuration, OpenAIApi } from 'openai'

const openaiApiKey = process.env.OPENAI_API_KEY

if (!openaiApiKey) {
  throw new Error('OPENAI_API_KEY is not set in environment variables')
}

const configuration = new Configuration({
  apiKey: openaiApiKey,
})

export const openai = new OpenAIApi(configuration)

export async function generateGpt4Content(prompt: string): Promise<any> {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert onboarding flow copywriter and UX designer.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  })
  return response.data.choices[0]?.message?.content
}

export async function generateDalleImage(prompt: string): Promise<string> {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '512x512',
    response_format: 'url',
  })
  return response.data.data[0]?.url
} 