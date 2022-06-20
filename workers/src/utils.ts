const allowedOrigins = ['deploycontracts.io', 'deploycontracts-io.pages.dev']

export function checkAllowedOrigins(request: Request) {
  const originHeader = request.headers.get('Origin')
  const origin = new URL(originHeader).origin

  const foundOrigin = allowedOrigins.find((x) => origin.endsWith(x))

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
