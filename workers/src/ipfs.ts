// Replace with @aws-sdk

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const client = new S3Client({
  apiVersion: '2006-03-01',
  endpoint: 'https://s3.filebase.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: FILEBASE_KEY,
    secretAccessKey: FILEBASE_SECRET,
  },
  // s3ForcePathStyle: true,
})

export async function uploadToFilebase(file: File) {
  const command = new PutObjectCommand({
    Bucket: 'deploycontracts',
    Key: `snip-20-project-logo/${Date.now()}-${file.name}`,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  })

  return client.send(command)
}
