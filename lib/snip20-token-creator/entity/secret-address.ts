import { InferType, string } from "yup";
import { Bech32Address } from "@keplr-wallet/cosmos";

export const schema = string().test(
  'secret address',
  'Provide a valid Secret Network address',
  (value) => {
    if (typeof value !== 'string') {
      return false
    }

    try {
      Bech32Address.validate(value, 'secret')

      return true;
    } catch (error) {
      return false
    }
  }
).required()

export type SecretAddressEntity = InferType<typeof schema>

export function create(address: string): SecretAddressEntity {
  return schema.validateSync(address)
}