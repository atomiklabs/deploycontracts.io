import { string } from "yup";
import { Bech32 } from "secretjs";

export const schema = string().test(
  'secret address',
  (value) => {
    if (typeof value !== 'string') {
      return false
    }

    try {
      const decoded = Bech32.decode(value);

      return decoded.prefix === 'secret'
    } catch (error) {
      console.error(error)
      return false
    }
  }
)

export function create(address: string) {
  return schema.validateSync(address)
}