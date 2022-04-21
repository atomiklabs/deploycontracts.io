import React, { useState } from 'react'

export default function SecondaryButton({ title }: { title: string }) {
  const [clicked, setClicked] = useState(false)
  return (
    <button
      className='py-4 px-12 font-space-grotesk font-bold rounded-2xl text-[#FD0F9E] bg-transparent border-2 border-[linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)] hover:border-none hover:text-white hover:bg-[linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)] hover:shadow-[0px_2px_40px_rgba(253,15,158,0.7)]'
      onClick={() => setClicked(true)}
      style={{
        background: clicked ? 'linear-gradient(122.48deg, #671BC9 -52.99%, #FD0F9E 97.26%)' : '',
        color: clicked ? '#FFFFFF' : '',
      }}
    >
      {title}
    </button>
  )
}
