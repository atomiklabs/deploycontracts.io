import { InferType, string } from "yup";
import { Bech32 } from "secretjs";

export const schema = string().test(
  'secret address',
  'Provide a valid Secret Network address',
  (value) => {
    if (typeof value !== 'string') {
      return false
    }

    try {
      const decoded = Bech32.decode(value);

      return decoded.prefix === 'secret'
    } catch (error) {
      return false
    }
  }
).required()

export type SecretAddressEntity = InferType<typeof schema>

export function create(address: string): SecretAddressEntity {
  return schema.validateSync(address)
}