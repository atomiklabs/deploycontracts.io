import LinkButton from '@/components/buttons/LinkButton'
import InputTextarea from '@/components/InputTextarea'

export default function Example() {
  return (
    <div className='max-w-md mx-auto my-20'>
      <main>
        <LinkButton href='/'>Back</LinkButton>
        <InputTextarea label='Textarea' placeholder='textarea' />
      </main>
    </div>
  )
}
