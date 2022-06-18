const allowedOrigins = ['https://deploycontracts.io']

export function checkAllowedOrigins(request: Request) {
  const origin = request.headers.get('Origin')
  const foundOrigin = allowedOrigins.find((x) => x.includes(origin))

  if (foundOrigin) {
    return true
  }

  if (LOCAL_DEV_API_KEY) {
    const localDevApiKey = request.headers.get('x-local-dev-api-key')
    return localDevApiKey === LOCAL_DEV_API_KEY
  }
}

function corsHeaders(request: Request) {
  const origin = request.headers.get('Origin')

  return {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': origin,
  }
}

export function responseSuccess(request: Request, data: any, maybeInit?: ResponseInitializerDict | Response) {
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json',
    },
    ...maybeInit,
  })
}

export function responseError(request: Request, data: any, maybeInit?: ResponseInitializerDict | Response) {
  return new Response(JSON.stringify({ error: data }), {
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json',
    },
    status: 400,
    ...maybeInit,
  })
}
