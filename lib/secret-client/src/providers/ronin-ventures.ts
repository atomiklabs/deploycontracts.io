// import { providers } from 'ethers'

import type { ChainProviderFn } from '../types'

export type RoninVenturesProvider = {}

export function roninVenturesProvider(): ChainProviderFn<
    RoninVenturesProvider
> {
    return function (chain) {
        if (!chain.grpcUrls.roninVentures) return null
        return {
            chain: {
                ...chain,
                grpcUrls: {
                    ...chain.grpcUrls,
                    default: `${chain.grpcUrls.roninVentures}`,
                },
            },
            provider: () => {
                const provider = new providers.InfuraProvider(chain.id, infuraId)
                if (pollingInterval) provider.pollingInterval = pollingInterval
                return Object.assign(provider, { priority, stallTimeout, weight })
            }
        }
    }
}
