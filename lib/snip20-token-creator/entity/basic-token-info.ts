import { InferType, number, object, string } from "yup";
import * as secretAddressEntity from './secret-address'

export const schema = object({
  minterAddress: secretAddressEntity.schema.required('Connect your wallet to provide address'),
  tokenSymbol: string().required('Provide token symbol').test(
    "Symbol format",
    "From 3 to 6 uppercase letters",
    (value) => typeof value === 'string' ? /^[A-Z]{3,6}$/.test(value) : false
  ),
  tokenTotalSupply: number().min(1).required('Required'),
})

export type BasicTokenInfoEntity = InferType<typeof schema>

export function createDefault(): BasicTokenInfoEntity {
  return {
    minterAddress: '',
    tokenSymbol: '',
    tokenTotalSupply: 1_000,
  }
}

export function create(data: BasicTokenInfoEntity): BasicTokenInfoEntity {
  return schema.validateSync(data)
}

export function parseFromData(formData: FormData): BasicTokenInfoEntity {
  const tokenTotalSupply = formData.get('tokenTotalSupply');
  let tokenTotalSupplyParsed;

  if (typeof tokenTotalSupply === 'string') {
    tokenTotalSupplyParsed = parseInt(tokenTotalSupply, 10)
  }

  return schema.validateSync({
    minterAddress: formData.get('minterAddress'),
    tokenSymbol: formData.get('tokenSymbol'),
    tokenTotalSupply: tokenTotalSupplyParsed,
  })
}
