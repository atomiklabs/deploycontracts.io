import { Snip20StepsProvider } from '@/utils/snip20StepsProvider'
import Snip20 from '@/components/snip-20'
import Head from 'next/head'
import type { ChainInfo, StoredWasmBinary } from '@/lib/secret-client'
import { GetStaticProps } from 'next'

interface StepProps {
  chainInfo: ChainInfo
  contractInfo: StoredWasmBinary
}

export default function Step(props: StepProps) {
  return (
    <Snip20StepsProvider {...props}>
      <Head>
        <title>Deploy SNIP-20 smart contract for free</title>
        <meta
          name='description'
          content={`Fill up the form to create and deploy new SNIP-20 smart contract. This would take only few minutes and it's completely free.`}
        />
      </Head>

      <Snip20 />
    </Snip20StepsProvider>
  )
}

export async function getStaticPaths() {
  const paths = [...Array(4)].map((x, i) => `/snip-20/step-${i + 1}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<StepProps> = async function getStaticProps() {
  // TODO: use `zod` to validate provided env vars against the expected schema
  const chainId = process.env.CHAIN_ID

  if (!chainId) {
    throw new Error('Missing `CHAIN_ID` env var')
  }

  const grpcUrl = process.env.CHAIN_GRPC

  if (!grpcUrl) {
    throw new Error('Missing `CHAIN_GRPC` env var')
  }

  const codeId = parseInt(process.env.CODE_ID || '', 10)

  if (isNaN(codeId)) {
    throw new Error('Missing `CODE_ID` env var')
  }

  const codeHash = process.env.CODE_HASH

  if (!codeHash) {
    throw new Error('Missing `CODE_HASH` env var')
  }

  const props = {
    chainInfo: {
      chainName: process.env.CHAIN_NAME,
      rpcUrl: process.env.CHAIN_RPC,
      restUrl: process.env.CHAIN_REST,
      chainId,
      grpcUrl,
    },
    contractInfo: {
      codeId,
      codeHash,
    },
  }

  return { props }
}
