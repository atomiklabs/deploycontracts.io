// TODO: block production requests from other domains than
const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*',
}

export function responseSuccess(data: any, maybeInit?: ResponseInitializerDict | Response) {
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    ...maybeInit,
  })
}

export function responseError(data: any, maybeInit?: ResponseInitializerDict | Response) {
  return new Response(JSON.stringify({ error: data }), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    ...maybeInit,
    status: 400,
  })
}
