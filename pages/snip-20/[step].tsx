import { Snip20Provider } from '@/utils/snip20Provider'
import Snip20 from '@/components/snip-20'

export default function Step() {
  return (
    <Snip20Provider>
      <Snip20 />
    </Snip20Provider>
  )
}
