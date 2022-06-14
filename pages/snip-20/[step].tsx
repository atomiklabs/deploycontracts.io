import { Snip20StepsProvider } from '@/utils/snip20StepsProvider'
import Snip20 from '@/components/snip-20'

export default function Step() {
  return (
    <Snip20StepsProvider>
      <Snip20 />
    </Snip20StepsProvider>
  )
}
