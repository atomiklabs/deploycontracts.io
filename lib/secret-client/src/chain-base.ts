export const chainId = {
  secretMainnet: 'secret-4',
  secretTestnet: 'pulsar-2',
  secretLocal: 'secretdev-1'
} as const;

export type ChainKeyId = keyof typeof chainId

export type ChainId = string