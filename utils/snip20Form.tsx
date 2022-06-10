import * as yup from 'yup'

export const initialStepsFormData = [
  { tokenName: '', tokenTotalSupply: 1_000_000 },
  { allocations: [{ name: '', value: 100, address: '' }] },
  { xyz: '' },
]

export const stepsValidationSchema = [
  // step1
  yup.object({
    tokenName: yup.string().required('Required'),
    tokenTotalSupply: yup.number().min(1).required('Required'),
  }),
  // step2
  yup.object({
    allocations: yup
      .array(
        yup.object({
          name: yup.string().required('Required'),
          value: yup.number().min(0.01, 'Min value is 0.01').max(100, 'Max value is 100').required(),
          address: yup.string().required('Required'),
        }),
      )
      .min(1, 'You must have at least 1 allocation')
      .max(15, 'Maximum allocations limit is 15')
      .test({
        test: (arrayValues) => {
          const sum = arrayValues?.reduce((prev, acc) => prev + (acc.value ?? 0), 0)
          return sum === 100
        },
        message: 'Sum of allocation values must be equal to 100%',
      })
      .required('Required'),
  }),
  // step3
  yup.object({
    xyz: yup.string(),
  }),
]
