import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function foodAnalyzerApiPlugin(apiKey) {
  return {
    name: 'food-analyzer-api',
    configureServer(server) {
      server.middlewares.use('/api/analyze-food', async (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          const body = await new Promise((resolve, reject) => {
            let data = ''

            req.on('data', (chunk) => {
              data += chunk
            })

            req.on('end', () => resolve(data))
            req.on('error', reject)
          })

          const { imageDataUrl } = JSON.parse(body || '{}')

          if (!apiKey) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                error:
                  'Missing OPENAI_API_KEY. Add it to your environment before running the app.',
              }),
            )
            return
          }

          if (!imageDataUrl) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Image data is required.' }))
            return
          }

          const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4.1-mini',
              input: [
                {
                  role: 'system',
                  content: [
                    {
                      type: 'input_text',
                      text:
                        'You analyze food photos and estimate nutrition for a single meal. Be practical and concise.',
                    },
                  ],
                },
                {
                  role: 'user',
                  content: [
                    {
                      type: 'input_text',
                      text:
                        'Analyze this meal photo. Return the meal name and estimated calories, protein, fat, carbs, plus a short recommendation.',
                    },
                    {
                      type: 'input_image',
                      image_url: imageDataUrl,
                      detail: 'low',
                    },
                  ],
                },
              ],
              text: {
                format: {
                  type: 'json_schema',
                  name: 'food_analysis',
                  strict: true,
                  schema: {
                    type: 'object',
                    properties: {
                      mealName: { type: 'string' },
                      calories: { type: 'integer' },
                      protein: { type: 'integer' },
                      fat: { type: 'integer' },
                      carbs: { type: 'integer' },
                      recommendation: { type: 'string' },
                    },
                    required: [
                      'mealName',
                      'calories',
                      'protein',
                      'fat',
                      'carbs',
                      'recommendation',
                    ],
                    additionalProperties: false,
                  },
                },
              },
            }),
          })

          if (!openAiResponse.ok) {
            const errorText = await openAiResponse.text()

            res.statusCode = openAiResponse.status
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                error: `OpenAI request failed: ${errorText}`,
              }),
            )
            return
          }

          const responseJson = await openAiResponse.json()
          const analysis = JSON.parse(responseJson.output_text)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(analysis))
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Unknown analyzer error.',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const cwd = globalThis.process?.cwd?.() ?? ''
  const env = loadEnv(mode, cwd, '')

  return {
    plugins: [react(), foodAnalyzerApiPlugin(env.OPENAI_API_KEY)],
  }
})
