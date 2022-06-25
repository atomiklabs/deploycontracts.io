import { create, calculateInitialBalances } from './token-summary'
import type { TokenSummaryEntity } from './token-summary'

describe('Token Summary entity', () => {
  it('can be created with correct data', () => {
    const data: TokenSummaryEntity = {
      basicTokenInfo: {
        minterAddress: 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne',
        tokenSymbol: 'SHHH',
        tokenTotalSupply: 999,
      },
      allocationInfo: {
        allocations: [
          {
            address: 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne',
            name: 'Whale 1',
            value: 70,
          },
          {
            address: 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne',
            name: 'Whale 2',
            value: 30,
          }
        ]
      },
      marketingInfo: {
        projectName: 'Test project',
        projectDescription: 'But it has a big potential',
        projectLogoCID: 'bafkreid7qubwwjp37jqjdorkox5ujkbw37zfvpzgxpmf2n2f7uhlgwkeay',
      }
    }
    expect(() => create(data)).not.toThrow()
  })

  it('can calculate initial balances', () => {
    const initialBalances = calculateInitialBalances({
      allocations: [
        {
          address: 'secretbeneficiary1',
          name: 'Whale 1',
          value: 70,
        },
        {
          address: 'secretbeneficiary2',
          name: 'Whale 2',
          value: 30,
        }
      ],
      tokenDecimals: 9,
      totalTokenSupply: 9999
    })

    expect(initialBalances).toHaveLength(2)
    expect(initialBalances[0].amount).toStrictEqual(('6999300000000').toString())
    expect(initialBalances[1].amount).toStrictEqual(('2999700000000').toString())
    expect(
      BigInt(initialBalances[0].amount) + BigInt(initialBalances[1].amount)
    ).toStrictEqual(BigInt(9999000000000))
  })
})