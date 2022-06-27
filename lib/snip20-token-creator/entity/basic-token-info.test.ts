import { parseFromData } from './basic-token-info'

describe('Basic Token Info entity', () => {
  it('can be parsed with correct form data', () => {
    const formData = new FormData();

    formData.append('minterAddress', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')
    formData.append('tokenSymbol', 'CUSTOM')
    formData.append('tokenTotalSupply', '3000004')

    const entity = parseFromData(formData)

    expect(entity).toBeDefined()

    expect(entity.minterAddress).toStrictEqual('secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')
    expect(entity.tokenSymbol).toStrictEqual('CUSTOM')
    expect(entity.tokenTotalSupply).toStrictEqual(3000004)
  })

  it('cannot be parsed with incorrect form data', () => {
    let formData = new FormData();

    formData.append('minterAddress', '')
    formData.append('tokenSymbol', 'Custom sToken')
    formData.append('tokenTotalSupply', '3000004')

    expect(() => parseFromData(formData)).toThrowError()

    formData = new FormData();

    formData.append('minterAddress', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')
    formData.append('tokenSymbol', '')
    formData.append('tokenTotalSupply', '3000004')

    expect(() => parseFromData(formData)).toThrowError()

    formData = new FormData();

    formData.append('minterAddress', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')
    formData.append('tokenSymbol', 'Custom sToken')
    formData.append('tokenTotalSupply', 'abc')

    expect(() => parseFromData(formData)).toThrowError()
  })
})