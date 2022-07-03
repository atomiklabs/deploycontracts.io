import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import type { FormEventHandler } from 'react'
import type { GetTokenParamsResponse } from 'secretjs/dist/extensions/snip20/types'
import type { Permit } from 'secretjs'
import { CopyBlock, atomOneDark, nord, dracula } from 'react-code-blocks'

import { FormButton, FormWithSinger } from '@/components/form'

import { DeployconttractsLogo } from '@/components/DeployconttractsLogo'
import PrimaryButton from '@/components/buttons/PrimaryButton'

import { useSecretClient } from '@/hooks/secret-client-hook'
import type { UseSecretClientProps } from '@/hooks/secret-client-hook'

import { configuration } from '@/lib/secret-client'
import { create as createSecretAddress } from '@/lib/snip20-token-creator/entity/secret-address'

import { useLocalStorage } from '@/utils/useLocalStorage'

type TokenInfo = GetTokenParamsResponse['token_info']

interface MetaState {
  connectedWalletAddress?: string
  addressToCodeHash: {
    [address: string]: string
  }
  permits: {
    [contractAddress: string]: Permit
  }
}

interface DocsPageProps extends UseSecretClientProps {
  metaStorageKey: string
}

function createDefaultProps(): DocsPageProps {
  return {
    ...configuration,
    metaStorageKey: 'snip-20-docs/meta',
  }
}

export default function DocsPage({ chainSettings, metaStorageKey }: DocsPageProps = createDefaultProps()) {
  const router = useRouter()
  const secretClient = useSecretClient({ chainSettings })
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>()
  const [metaState, setMetaState] = useLocalStorage<MetaState>(metaStorageKey, {
    addressToCodeHash: {},
    permits: {},
  })

  const [balanceOutput, setBalanceOutput] = useState('')

  const PAGE_SIZE = 10

  const contractAddress = useMemo(() => {
    if (typeof router.query.token !== 'string') {
      return null
    }

    console.log('contractAddress', router.query.token)

    try {
      return createSecretAddress(router.query.token)
    } catch (error) {
      console.error(error)
      return null
    }
  }, [router.query.token])

  const contractCodeHash = useMemo(
    () => (contractAddress ? metaState.addressToCodeHash[contractAddress] : null),
    [contractAddress, metaState.addressToCodeHash],
  )

  // trying to connect to Keplr automatically
  useEffect(() => {
    if (secretClient.connectedWalletAddress) {
      // wallet is already connected, skip
      return
    }

    if (!metaState.connectedWalletAddress) {
      // connected wallet address has not been stored during previous session, skip
      return
    }

    // only call it when the user has connected walled during previous sessions
    console.info('Requesting Secret Client connection automatically')
    secretClient.connectWallet().then((walletAddress) => console.log('automatically connected', { walletAddress }))
  }, [secretClient])

  // store most recently used wallet address
  useEffect(() => {
    setMetaState((metaState) => ({ ...metaState, connectedWalletAddress: secretClient.connectedWalletAddress }))
  }, [secretClient.connectedWalletAddress])

  // get code hash for the current contract address
  // code hash is needed for further queries
  useEffect(() => {
    if (!contractAddress || !secretClient.isReady) {
      return
    }

    secretClient.inner?.query.compute
      .contractCodeHash(contractAddress)
      .then((codeHash) =>
        setMetaState(({ addressToCodeHash, ...metaState }) => ({
          ...metaState,
          addressToCodeHash: {
            ...addressToCodeHash,
            [contractAddress]: codeHash,
          },
        })),
      )
      .catch((error) => {
        // something went wrong and code hash could not be fetched
        // TODO: figure out what to do here
        console.error(error)
      })
  }, [contractAddress, secretClient.isReady])

  // query basic contract info automatically (if possible)
  useEffect(() => {
    if (!secretClient.isReady || !contractAddress || !contractCodeHash) {
      return
    }

    secretClient.inner?.query.snip20
      .getSnip20Params({ contract: { address: contractAddress, codeHash: contractCodeHash } })
      .then(({ token_info: tokenInfo }) => setTokenInfo(tokenInfo))
      .catch((error) => {
        // something went wrong and contract information could not be fetched
        // TODO: figure out what to do here
        console.error(error)
      })
  }, [contractAddress, contractCodeHash, secretClient.isReady])

  const signPermit = async () => {
    const useKelpAsSigner = true

    const permit = await secretClient.inner!.utils.accessControl.permit.sign(
      secretClient.connectedWalletAddress!,
      chainSettings.chainId,
      'deploycontracts.io/docs',
      [contractAddress!],
      ['owner', 'history', 'balance', 'allowance'],
      useKelpAsSigner,
    )

    const storageKey = `${secretClient.connectedWalletAddress}:${contractAddress}`

    setMetaState(({ permits, ...metaState }) => ({
      ...metaState,
      permits: {
        ...permits,
        [storageKey]: permit,
      },
    }))

    return permit
  }

  const getPermit = async () => {
    const storageKey = `${secretClient.connectedWalletAddress}:${contractAddress}`
    const storageValue = metaState.permits[storageKey]

    return storageValue || (await signPermit())
  }

  // ------ SNIP20: Queries ------
  // Query: getBalance
  const handleGetBalance: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const txQuery = await secretClient.inner?.query.snip20.getBalance({
      address: secretClient.connectedWalletAddress!,
      contract: { address: contractAddress!, codeHash: contractCodeHash! },
      auth: {
        permit: await getPermit(),
      },
    })
    console.log('getBalance', txQuery)
    setBalanceOutput(JSON.stringify(txQuery, null, 2))
  }

  // Query: getTransferHistory
  const handleGetTransferHistory: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const txQuery = await secretClient.inner?.query.snip20.getTransferHistory({
      address: secretClient.connectedWalletAddress!,
      contract: { address: contractAddress!, codeHash: contractCodeHash! },
      auth: { permit: await getPermit() },
      page_size: PAGE_SIZE,
    })

    console.log('getTransferHistory', txQuery)
  }

  // Query: getTransactionHistory
  const handleGetTransactionHistory: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const txQuery = await secretClient.inner?.query.snip20.getTransactionHistory({
      address: secretClient.connectedWalletAddress!,
      contract: { address: contractAddress!, codeHash: contractCodeHash! },
      auth: { permit: await getPermit() },
      page_size: PAGE_SIZE,
    })

    console.log('getTransactionHistory', txQuery)
  }

  // Query: GetAllowance
  const handleGetAllowance: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const txQuery = await secretClient.inner?.query.snip20.GetAllowance({
      contract: { address: contractAddress!, codeHash: contractCodeHash! },
      owner: secretClient.connectedWalletAddress!,
      spender: formData.get('allowanceSpender')!.toString(),
      auth: { permit: await getPermit() },
    })

    console.log('GetAllowance', txQuery)
  }

  // ------ SNIP20: TXs ------
  // TX: send
  const handleSend: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const txExec = await secretClient.inner?.tx.snip20.send(
        {
          sender: secretClient.connectedWalletAddress!,
          contractAddress: contractAddress!,
          codeHash: contractCodeHash!,
          msg: {
            send: {
              recipient: formData.get('recipient')!.toString(),
              amount: formData.get('sendAmount')!.toString(),
            },
          },
        },
        {
          gasLimit: 5_000_000,
        },
      )
      console.log('send', txExec)
    } catch (error) {
      console.log('send error:', error)
    }
  }
  // TX: transfer
  const handleTransfer: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const txExec = await secretClient.inner?.tx.snip20.transfer(
        {
          sender: secretClient.connectedWalletAddress!,
          contractAddress: contractAddress!,
          codeHash: contractCodeHash!,
          msg: {
            transfer: {
              recipient: formData.get('transferRecipient')!.toString(),
              amount: formData.get('transferAmount')!.toString(),
            },
          },
        },
        {
          gasLimit: 5_000_000,
        },
      )
      console.log('transfer', txExec)
    } catch (error) {
      console.log('transfer error:', error)
    }
  }

  // TX: increaseAllowance
  const handleIncreaseAllowance: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const txExec = await secretClient.inner?.tx.snip20.increaseAllowance(
        {
          sender: secretClient.connectedWalletAddress!,
          contractAddress: contractAddress!,
          codeHash: contractCodeHash!,
          msg: {
            increase_allowance: {
              spender: formData.get('increaseAllowanceSpender')!.toString(),
              amount: formData.get('increaseAllowanceAmount')!.toString(),
            },
          },
        },
        {
          gasLimit: 5_000_000,
        },
      )
      console.log('increaseAllowance', txExec)
    } catch (error) {
      console.log('increaseAllowance error:', error)
    }
  }
  // TX: decreaseAllowance
  const handleDecreaseAllowance: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const txExec = await secretClient.inner?.tx.snip20.decreaseAllowance(
        {
          sender: secretClient.connectedWalletAddress!,
          contractAddress: contractAddress!,
          codeHash: contractCodeHash!,
          msg: {
            decrease_allowance: {
              spender: formData.get('decreaseAllowanceSpender')!.toString(),
              amount: formData.get('decreaseAllowanceAmount')!.toString(),
            },
          },
        },
        {
          gasLimit: 5_000_000,
        },
      )
      console.log('decreaseAllowance', txExec)
    } catch (error) {
      console.log('decreaseAllowance error:', error)
    }
  }

  return (
    <>
      <Head>
        <title>SNIP-20 token details | Deploy Contracts</title>
        <meta name='description' content={`Use a simple web form to interact with any SNIP-20 smart contract.`} />
      </Head>
      <header className='sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8 dark:bg-transparent'>
        <div className='mr-6 lg:hidden'>
          <button type='button' className='relative'>
            <span className='sr-only'>Open navigation</span>
            <svg
              aria-hidden='true'
              className='h-6 w-6 stroke-slate-500'
              fill='none'
              stroke-width='2'
              stroke-linecap='round'
            >
              <path d='M4 7h16M4 12h16M4 17h16'></path>
            </svg>
          </button>
        </div>
        <div className='relative flex flex-grow basis-0 items-center'>
          <a className='block w-10 overflow-hidden lg:w-auto' href='/'>
            <span className='sr-only'>Home page</span>
            <DeployconttractsLogo className='w-48 h-full md:w-64 md:h-9 cursor-pointer shrink-0' />
          </a>
        </div>
        <div className='relative flex basis-0 justify-end space-x-6 sm:space-x-8 md:flex-grow'>
          <a className='group' href='https://github.com/atomiklabs/deploycontracts.io'>
            <span className='sr-only'>GitHub</span>
            <svg
              aria-hidden='true'
              viewBox='0 0 16 16'
              className='h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300'
            >
              <path d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'></path>
            </svg>
          </a>
        </div>
      </header>

      <div className='relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12'>
        <div className='hidden lg:relative lg:block lg:flex-none'>
          <div className='absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden' />
          <div className='sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5'>
            <div className='absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block' />
            <div className='absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block' />
            <nav className='text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16'>
              <ul className='space-y-9'>
                <li>
                  <h2 className='font-display font-medium text-white'>Introduction</h2>
                  <ul className='mt-2 space-y-2 border-l-2 border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200'>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/'
                      >
                        Getting started
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/installation'
                      >
                        Installation
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <h2 className='font-display font-medium text-white'>SNIP-20 Queries</h2>
                  <ul className='mt-2 space-y-2 border-l-2 border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200'>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/balance'
                      >
                        Get Balance
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/transfer-history'
                      >
                        Get Transfer History
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/transaction-history'
                      >
                        Get Transaction History
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/allowance'
                      >
                        Get Allowance
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <h2 className='font-display font-medium text-white'>SNIP-20 Transactions</h2>
                  <ul className='mt-2 space-y-2 border-l-2 border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200'>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/send'
                      >
                        Send
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/transfer'
                      >
                        Transfer
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/increase-allowance'
                      >
                        Increase Allowance
                      </a>
                    </li>
                    <li className='relative'>
                      <a
                        className='block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        href='/docs/decrease-allowance'
                      >
                        Decrease Allowance
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16'>
          <article>
            <header className='mb-9 space-y-1'>
              <p className='font-display text-sm font-medium text-sky-500'>Introduction</p>
              <h1 className='font-display text-3xl tracking-tight text-white'>Getting started</h1>
            </header>
            <div className='prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800'>
              <p>
                Quasi sapiente voluptates aut minima non doloribus similique quisquam. In quo expedita ipsum nostrum
                corrupti incidunt. Et aut eligendi ea perferendis.
              </p>
            </div>

            <form className='mt-5 sm:flex sm:items-center'>
              <div className='w-full sm:max-w-xs'>
                <label htmlFor='snip20-addr' className='sr-only'>
                  SNIP-20 address
                </label>
                <input
                  type='text'
                  name='token'
                  id='snip20-addr'
                  className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  placeholder='secret1zmanyjc75yx30ph3lnd9tk3hze5f2lm9fyp5xt'
                  defaultValue={router.query.token}
                />
              </div>
              <PrimaryButton
                type='submit'
                className='mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Load
              </PrimaryButton>
              {secretClient.isReadOnly && (
                <button
                  onClick={secretClient.connectWallet}
                  type='button'
                  className='mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-500 shadow-sm font-medium rounded-md text-indigo-600 bg-transparent hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  Connect wallet
                </button>
              )}
            </form>

            <div className='my-10'>
              <h2 className='text-white'>Secret Client Info</h2>
              <output className='my-10 text-white'>
                {JSON.stringify(
                  {
                    isReadOnly: secretClient.isReadOnly,
                    connectedWalletAddress: secretClient.connectedWalletAddress,
                  },
                  undefined,
                  2,
                )}
              </output>
            </div>

            <div className='my-10'>
              <h2 className='text-white'>Token Info</h2>
              <output className='my-10 text-white'>{JSON.stringify(tokenInfo, undefined, 2)}</output>
            </div>

            <header className='mt-9 mb-9 space-y-1'>
              <p className='font-display text-sm font-medium text-sky-500'>SNIP-20 Queries</p>
              <h1 className='font-display text-3xl tracking-tight text-white'>SNIP-20 Queries</h1>
            </header>

            {secretClient.isReadOnly && <p className='my-4'>Connect wallet to interact with form</p>}

            <h2 className='text-white'>Get Balance</h2>
            <div className='mb-5 prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800'>
              <p>
                Some text about explaing how the balance works. Some text about explaing how the balance works. Some
                text about explaing how the balance works. Some text about explaing how the balance works.
              </p>
            </div>

            <CopyBlock
              text={`const handleGetBalance = async (event) => {
  event.preventDefault()

  const txQuery = await secretClient.inner?.query.snip20.getBalance({
    address: secretClient.connectedWalletAddress!,
    contract: { address: contractAddress!, codeHash: contractCodeHash! },
    auth: { permit: await getPermit() }
    })
}`}
              theme={atomOneDark}
              language='js'
            />

            <FormWithSinger disabled={secretClient.isReadOnly} onSubmit={handleGetBalance}>
              <FormButton>Get Balance</FormButton>
            </FormWithSinger>

            <div className='mb-5 prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800'>
              {balanceOutput && (
                <pre>
                  <output>{balanceOutput}</output>
                </pre>
              )}
            </div>

            <h2 className='text-white'>Get Transfer History</h2>
            <FormWithSinger disabled={secretClient.isReadOnly} onSubmit={handleGetTransferHistory}>
              <FormButton className='block mt-4 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>
                Get Transfer History
              </FormButton>
            </FormWithSinger>

            <h2 className='text-white'>Get Transaction History</h2>
            <FormWithSinger disabled={secretClient.isReadOnly} onSubmit={handleGetTransactionHistory}>
              <FormButton className='block mt-4 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>
                Get Transaction History
              </FormButton>
            </FormWithSinger>

            <h2 className='text-white'>Get Allowance</h2>
            <FormWithSinger
              disabled={secretClient.isReadOnly}
              onSubmit={handleGetAllowance}
              className='mt-5 sm:flex sm:items-center'
            >
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='allowanceSpender'
                    id='allowanceSpender'
                    placeholder='spender addr'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <FormButton
                  type='submit'
                  className='mt-1 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  GetAllowance
                </FormButton>
              </div>
            </FormWithSinger>

            <header className='mt-9 mb-9 space-y-1'>
              <p className='font-display text-sm font-medium text-sky-500'>SNIP-20 Transactions</p>
              <h1 className='font-display text-3xl tracking-tight text-white'>SNIP-20 Transactions</h1>
            </header>

            {secretClient.isReadOnly && <p className='my-4'>Connect wallet to interact with form</p>}

            <h2 className='text-white'>Send</h2>
            <FormWithSinger
              disabled={secretClient.isReadOnly}
              onSubmit={handleSend}
              className='mt-5 sm:flex sm:items-center'
            >
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='sendAmount'
                    id='sendAmount'
                    placeholder='amount'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='sendRecipient'
                    id='sendRecipient'
                    placeholder='recipient'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <FormButton
                  type='submit'
                  className='mt-1 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Send
                </FormButton>
              </div>
            </FormWithSinger>

            <h2 className='text-white'>Transfer</h2>
            <FormWithSinger
              disabled={secretClient.isReadOnly}
              onSubmit={handleTransfer}
              className='mt-5 sm:flex sm:items-center'
            >
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='transferAmount'
                    id='transferAmount'
                    placeholder='amount'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='transferRecipient'
                    id='transferRecipient'
                    placeholder='recipient'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <FormButton
                  type='submit'
                  className='mt-1 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Transfer
                </FormButton>
              </div>
            </FormWithSinger>

            <h2 className='text-white'>Increase Allowance</h2>
            <FormWithSinger
              disabled={secretClient.isReadOnly}
              onSubmit={handleIncreaseAllowance}
              className='mt-5 sm:flex sm:items-center'
            >
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='increaseAllowanceAmount'
                    id='increaseAllowanceAmount'
                    placeholder='amount'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='increaseAllowanceSpender'
                    id='increaseAllowanceSpender'
                    placeholder='spender addr'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <FormButton
                  type='submit'
                  className='mt-1 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Increase Allowance
                </FormButton>
              </div>
            </FormWithSinger>

            <h2 className='text-white'>Decrease Allowance</h2>
            <FormWithSinger
              disabled={secretClient.isReadOnly}
              onSubmit={handleDecreaseAllowance}
              className='mt-5 sm:flex sm:items-center'
            >
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='decreaseAllowanceAmount'
                    id='decreaseAllowanceAmount'
                    placeholder='amount'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='decreaseAllowanceSpender'
                    id='decreaseAllowanceSpender'
                    placeholder='spender addr'
                    required
                    className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <FormButton
                  type='submit'
                  className='mt-1 px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Decrease Allowance
                </FormButton>
              </div>
            </FormWithSinger>
          </article>
        </div>
      </div>
    </>
  )
}

export function getStaticProps() {
  return {
    props: createDefaultProps(),
  }
}
