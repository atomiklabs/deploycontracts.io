import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Input from '@/components/Input'

export default function tokenDetails() {
  return (
    <section className='max-w-xl mx-auto px-6 md:px-0'>
      <div className='flex flex-col gap-y-[34px]'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>Token details</h1>
        <p className='text-gray-100'>
          Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
          convallis tortor.
        </p>
      </div>
      <div className='mt-9 flex flex-col gap-y-[14px]'>
        <div className='text-white font-medium'>Minter adress</div>
        <SecondaryButton>Connect your wallet</SecondaryButton>
      </div>
      <form className='mt-12 flex flex-col gap-y-[52px]'>
        <Input label='Name of your token' placeholder='Token name' />
        <Input label='Tottal supply' placeholder='1 000 000 000' />
        <PrimaryButton>Next</PrimaryButton>
      </form>
    </section>
  )
}
