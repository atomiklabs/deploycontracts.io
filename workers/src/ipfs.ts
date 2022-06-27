import { responseError, responseSuccess } from './utils'

export async function uploadToIPFS(request: Request) {
  const formData = await request.formData()
  const imageFile = formData.get('image')

  if (typeof imageFile === 'string') {
    return responseError(request, 'imageFile is a string instead of File')
  }

  const response = await fetch('https://api.nft.storage/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NFT_STORAGE_API}`,
    },
    body: imageFile,
  })
  const result = await response.json()

  return responseSuccess(request, result)
}
