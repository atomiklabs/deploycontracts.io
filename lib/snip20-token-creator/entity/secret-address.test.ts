
import { create } from './secret-address'
import type { SecretAddressEntity } from './secret-address'

function invalidAddresses() {
  return ['secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyn', 'test', '', '1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne']
}

describe('Secret Address entity', () => {
  it('can be created with correct data', () => {
    const address: SecretAddressEntity = 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne'

    expect(() => create(address)).not.toThrow()
  })

  invalidAddresses().forEach((address, idx) => {
    it(`cannot be created with incorrect data #{idx}`, () => {
      expect(() => create(address)).toThrow()
    })
  })
})