import { object, string, TypeOf } from "yup";
import type { CreateClientOptions } from "secretjs";

export interface ChainSettings {
  chainId: string,
  chainName: string
  grpcUrl: CreateClientOptions['grpcWebUrl']
  rpcUrl: string
  restUrl: string
}

export const chainSettingsSchema = object({
  chainId: string().required(),
  chainName: string().required(),
  grpcUrl: string().url().required(),
  rpcUrl: string().url().required(),
  restUrl: string().url().required(),
});

export const configuration = {
  get chainSettings(): ChainSettings {
    return chainSettingsSchema.validateSync({
      chainId: getEnv('CHAIN_ID'),
      chainName: getEnv('CHAIN_NAME'),
      grpcUrl: getEnv('CHAIN_GRPC'),
      rpcUrl: getEnv('CHAIN_RPC'),
      restUrl: getEnv('CHAIN_REST'),
    })
  },
};

function getEnv(envVarName: string): string | undefined {
  if (typeof process.env === 'undefined') {
    console.warn('Could not get env var — process.env is not avaialble')
  }

  return process.env[`NEXT_PUBLIC_${envVarName}`] || process.env[envVarName]
}