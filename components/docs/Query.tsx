// @ts-nocheck
import React from 'react'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

import { FormButton, FormWithSinger } from '@/components/form'

export default function Query({
  secretClient,
  onSubmit,
  queryResult,
  codeBlock,
  queryName,
  text,
  inputName = '',
  inputPlaceholder = '',
  refScroll,
}) {
  return (
    <section ref={refScroll}>
      <h2 className='text-white'>{queryName}</h2>
      <p className='text-slate-400 text-sm leading-6 mt-2 mb-4'>{text}</p>

      <CopyBlock text={codeBlock} theme={atomOneDark} language='js' wrapLines />

      <FormWithSinger disabled={secretClient.isReadOnly} onSubmit={onSubmit}>
        <h4 className='text-white'>Try it out:</h4>
        {inputName && (
          <input
            type='text'
            name={inputName}
            id={inputName}
            placeholder={inputPlaceholder}
            required
            className='mb-3 input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
          />
        )}
        <FormButton>{queryName}</FormButton>
      </FormWithSinger>

      {queryResult && (
        <div className='mb-5 prose prose-slate max-w-none prose-invert text-slate-400'>
          <h4 className='text-white'>Output:</h4>
          <pre className='rounded-xl bg-slate-900 shadow-lg bg-slate-800/60 shadow-none ring-1 ring-slate-300/10'>
            <output>{queryResult}</output>
          </pre>
        </div>
      )}
    </section>
  )
}
