import { FieldArray, Form, Formik } from 'formik'

import AllocationCard from '@/components/AllocationCard'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import ProgressBar from '@/components/ProgressBar'
import StepsNavigation from '@/components/snip-20/StepsNavigation'

import { AllocationInfoEntity, createDefualtAllocationEntry } from '@/lib/snip20-token-creator/entity/allocation-info'

interface TokenAllocationProps {
  prevStepPath: string
  formData: AllocationInfoEntity
  validationSchema: any
  onSubmit: (formData: AllocationInfoEntity) => void
}

export default function TokenAllocation({ prevStepPath, formData, validationSchema, onSubmit }: TokenAllocationProps) {
  return (
    <>
      <div className='flex flex-col gap-y-[34px]'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>Token allocation</h1>
        <p className='text-gray-100'>Distribute your initial token allocation between different wallet addresses.</p>
      </div>

      <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, errors }) => (
          <Form>
            <div className='mt-[41px] flex flex-col gap-y-9'>
              <FieldArray
                name='allocations'
                render={(arrayHelpers) => {
                  const allocations = values.allocations

                  return (
                    <>
                      {allocations?.map((x, i) => (
                        <AllocationCard key={i} index={i} arrayHelpers={arrayHelpers} />
                      ))}

                      {allocations && allocations.length > 0 && <ProgressBar allocations={values.allocations} />}

                      <SecondaryButton
                        className='mt-10'
                        type='button'
                        onClick={() => arrayHelpers.push(createDefualtAllocationEntry())}
                      >
                        Add new
                      </SecondaryButton>
                    </>
                  )
                }}
              />
            </div>

            <div className='mt-20'>
              {typeof errors.allocations === 'string' && (
                <div
                  className='relative flex flex-row gap-x-6 items-center py-4 px-6 text-base text-gray-100 rounded-3xl bg-[#341035]
                after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-0 after:translate-y-[50%] after:rotate-45 after:w-2 after:h-2 after:bg-[#341035]'
                >
                  <img src='/assets/error.svg' alt='error icon' className='w-[24px] h-[24px]' />
                  {errors.allocations}
                </div>
              )}
            </div>

            <StepsNavigation className='mt-20' prevStepPath={prevStepPath} />
          </Form>
        )}
      </Formik>
    </>
  )
}
