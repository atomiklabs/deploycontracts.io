import { number, object, string } from "yup";
import { configuration as secretClientConfiguration, ChainSettings } from '../secret-client'

export interface TokenFactorySettings {
  codeId: number
  codeHash: string
  tokenDecimals: number
  sourceCodeUrl: string
}

export const tokenFactorySettingsSchema = object({
  codeId: number().required(),
  codeHash: string().required(),
  sourceCodeUrl: string().url().required(),
  tokenDecimals: number().required(),
});

export interface Configuration {
  chainSettings: ChainSettings,
  tokenFactorySettings: TokenFactorySettings,
}

export const configuration = Object.freeze({
  get chainSettings(): ChainSettings {
    return secretClientConfiguration.chainSettings
  },

  get tokenFactorySettings(): TokenFactorySettings {
    const codeId = getEnv('CODE_ID')
    const tokenDecimals = getEnv('SNIPIX_TOKEN_DECIMALS')

    return tokenFactorySettingsSchema.validateSync({
      codeHash: getEnv('CODE_HASH'),
      codeId: typeof codeId !== 'undefined' ? parseInt(codeId, 10) : undefined,
      sourceCodeUrl: getEnv('SNIPIX_SOURCECODE_URL'),
      tokenDecimals: typeof tokenDecimals !== 'undefined' ? parseInt(tokenDecimals, 10) : undefined,
    })
  }
})

function getEnv(envVarName: string): string | undefined {
  if (typeof process.env === 'undefined') {
    console.warn('Could not get env var — process.env is not avaialble')
  }

  return process.env[`NEXT_PUBLIC_${envVarName}`] || process.env[envVarName]
}