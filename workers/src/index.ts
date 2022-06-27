import { uploadToIPFS } from './ipfs'
import { checkAllowedOrigins, responseError, responseSuccess } from './utils'

// TODO: Add routing - https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  try {
    if (request.method === 'OPTIONS') {
      return responseSuccess(request, 'OK')
    }

    if (!checkAllowedOrigins(request)) {
      return responseError(request, 'Forbidden', { status: 403 })
    }

    if (request.method === 'POST') {
      return await uploadToIPFS(request)
    }
  } catch (e) {
    console.log('--- catch: ', e)
    return responseError(request, e)
  }
}
