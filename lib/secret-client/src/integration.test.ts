import { secretMainnet } from './chains'

describe('test config', () => {
  test.only('loads mainnet config', () => {
    console.log(secretMainnet)
    expect(secretMainnet).toBeDefined()
  })
})