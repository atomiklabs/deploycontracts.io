import { Snip20StepsProvider, useSnip20Steps } from '@/utils/snip20StepsProvider'
import { useEffect } from 'react'

function Docs() {
  /// Snip20StepsProvider .....

  // const { connectWallet } = useSnip20Steps()

  // useEffect(() => {
  //   // TODO: only call it when the user has connected walled during previous sessions
  //   connectWallet()
  // }, [])

  return (
    <div className='col-span-full m-20 '>
      <div className='bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>SNIP-20 contract address</h3>
          <form className='mt-5 sm:flex sm:items-center'>
            <div className='w-full sm:max-w-xs'>
              <label htmlFor='snip20-addr' className='sr-only'>
                SNIP-20 address
              </label>
              <input
                type='text'
                name='snip20-addr'
                id='snip20-addr'
                className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                placeholder='secret1zmanyjc75yx30ph3lnd9tk3hze5f2lm9fyp5xt'
              />
            </div>
            <button
              type='submit'
              className='mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Load
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Docs
