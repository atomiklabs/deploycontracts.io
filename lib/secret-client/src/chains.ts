import { mintscanExplorers, secretNodesExplorers } from "./block-explorers";
import { forboleGateways, roninVenturesGateways, secretDevEnvGateways, secretSaturnGateways } from "./blockchain-gateways";
import { chainId } from "./chain-base";
import { Chain } from "./types";

export const secretMainnet: Chain = {
  id: chainId.secretMainnet,
  name: 'Secret Network',
  network: 'mainnet',
  grpcUrls: {
    default: roninVenturesGateways.secretMainnet.grpcUrl,
    roninVentures: roninVenturesGateways.secretMainnet.grpcUrl,
    forbole: forboleGateways.secretMainnet.grpcUrl,
  },
  restUrls: {
    default: roninVenturesGateways.secretMainnet.restUrl,
    roninVentures: roninVenturesGateways.secretMainnet.restUrl,
    forbole: forboleGateways.secretMainnet.restUrl,
  },
  rpcUrls: {
    default: roninVenturesGateways.secretMainnet.rpcUrl,
    roninVentures: roninVenturesGateways.secretMainnet.rpcUrl,
    forbole: forboleGateways.secretMainnet.rpcUrl,
  },
  blockExplorers: {
    default: secretNodesExplorers.secretMainnet,
    mintscan: mintscanExplorers.secretMainnet,
    secretNodes: secretNodesExplorers.secretMainnet,
  }
}

export const secretTestnet: Chain = {
  id: chainId.secretTestnet,
  name: 'Secret Testnet',
  network: 'testnet',
  grpcUrls: {
    default: roninVenturesGateways.secretTestnet.grpcUrl,
    roninVentures: roninVenturesGateways.secretTestnet.grpcUrl,
    secretSaturn: secretSaturnGateways.secretTestnet.grpcUrl,
  },
  restUrls: {
    default: roninVenturesGateways.secretTestnet.restUrl,
    roninVentures: roninVenturesGateways.secretTestnet.restUrl,
    secretSaturn: secretSaturnGateways.secretTestnet.restUrl,
  },
  rpcUrls: {
    default: roninVenturesGateways.secretTestnet.rpcUrl,
    roninVentures: roninVenturesGateways.secretTestnet.rpcUrl,
    secretSaturn: secretSaturnGateways.secretTestnet.rpcUrl,
  },
}

export const secretLocal: Chain = {
  id: chainId.secretLocal,
  name: 'Secret Local',
  network: 'localnet',
  grpcUrls: {
    default: secretDevEnvGateways.secretLocal.grpcUrl,
    secretDevEnv: secretDevEnvGateways.secretLocal.grpcUrl
  },
  restUrls: {
    default: secretDevEnvGateways.secretLocal.restUrl,
    secretDevEnv: secretDevEnvGateways.secretLocal.restUrl
  },
  rpcUrls: {
    default: secretDevEnvGateways.secretLocal.rpcUrl,
    secretDevEnv: secretDevEnvGateways.secretLocal.rpcUrl
  },
}

export const allChains: Array<Chain> = [
  secretMainnet,
  secretTestnet,
  secretLocal,
]

export const defaultChains: Array<Chain> = [
  secretMainnet,
  secretTestnet,
  secretLocal,
]