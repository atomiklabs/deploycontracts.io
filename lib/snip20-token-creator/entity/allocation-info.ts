import { array, InferType, number, object, string } from "yup";
import * as secretAddressEntity from './secret-address'

const subSchema = object({
  name: string().required('Required'),
  value: number().min(0.01, 'Min value is 0.01').max(100, 'Max value is 100').required('Required'),
  address: secretAddressEntity.schema.required('Required'),
})

export type Allocation = InferType<typeof subSchema>

export const schema = object({
  allocations: array(
    subSchema,
  )
    .min(1, 'You must have at least 1 allocation')
    .max(15, 'Maximum allocations limit is 15')
    .test({
      test: (arrayValues) => {
        const sum = arrayValues?.reduce((prev, acc) => prev + (acc.value ?? 0), 0)
        return sum === 100
      },
      message: 'Total allocation must be equal to 100%',
    })
    .required('Required'),
})

export type AllocationInfoEntity = {
  allocations: Array<Allocation>
}

export function createDefault(): AllocationInfoEntity {
  return {
    allocations: [
      createDefualtAllocationEntry(),
    ],
  }
}

export function create(data: AllocationInfoEntity): AllocationInfoEntity {
  return schema.validateSync(data)
}

export function createDefualtAllocationEntry(): Allocation {
  return { address: '', name: '', value: 100 }
}

export function parseFromData(formData: FormData): AllocationInfoEntity {
  const nameList = formData.getAll('allocation[][name]')
  const valueList = formData.getAll('allocation[][value]')
  const addressList = formData.getAll('allocation[][address]')

  if (nameList.length !== valueList.length || valueList.length !== addressList.length) {
    throw new Error('Invalid form data. Total number of form data entries do not match across required fields: name, value, address')
  }

  const allocations = zip(nameList, valueList, addressList).map(
    ([name, value, address]) => ({
      value: typeof value === 'string' ? parseInt(value, 10) : value,
      name,
      address
    })
  )

  return schema.validateSync({ allocations })
}

function zip(...arr: Array<any>) {
  return Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]));
}