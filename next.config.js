/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    NETWORK: process.env.NETWORK,
    CHAIN_ID: process.env.CHAIN_ID,
    CHAIN_NAME: process.env.CHAIN_NAME,
    CHAIN_GRPC: process.env.CHAIN_GRPC,
    CHAIN_RPC: process.env.CHAIN_RPC,
    CHAIN_REST: process.env.CHAIN_REST,
    SNIPIX_SOURCODE_URL: process.env.SNIPIX_SOURCODE_URL,
    CODE_ID: process.env.CODE_ID,
    CODE_HASH: process.env.CODE_HASH,
  },
}
