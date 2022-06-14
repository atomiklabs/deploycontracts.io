import { uploadToFilebase } from './ipfs'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*',
}

async function handleRequest(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders })
  }

  if (request.method === 'POST') {
    return handleIPFS(request)
  }
}

async function handleIPFS(request: Request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image')

    if (typeof imageFile === 'string') {
      return new Response(`--- imageFile is a string`, { headers: corsHeaders, status: 400 })
    }

    const result = await uploadToFilebase(imageFile)
    console.log('--- result: ', result)

    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  } catch (e) {
    console.log('--- catch: ', e)
    return new Response(e, { headers: corsHeaders })
  }
}
