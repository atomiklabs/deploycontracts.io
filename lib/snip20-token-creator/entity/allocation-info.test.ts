import { parseFromData } from './allocation-info'

describe('Alloaction Info entity', () => {
  it('can be parsed with correct form data', () => {
    const formData = new FormData();

    formData.append('allocation[][name]', 'Dolphin')
    formData.append('allocation[][value]', '31')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    formData.append('allocation[][name]', 'Whale')
    formData.append('allocation[][value]', '68')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    formData.append('allocation[][name]', 'Shrimp')
    formData.append('allocation[][value]', '1')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    const entity = parseFromData(formData)

    expect(entity).toBeDefined()
    expect(entity.allocations).toHaveLength(3)

    expect(entity.allocations[0].value).toStrictEqual(31)
    expect(entity.allocations[0].name).toStrictEqual('Dolphin')

    expect(entity.allocations[1].value).toStrictEqual(68)
    expect(entity.allocations[1].name).toStrictEqual('Whale')

    expect(entity.allocations[2].value).toStrictEqual(1)
    expect(entity.allocations[2].name).toStrictEqual('Shrimp')
  })

  it('cannot be parsed with not matching length of form data fields', () => {
    const formData = new FormData();

    formData.append('allocation[][name]', 'Whale')
    formData.append('allocation[][value]', '68')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    formData.append('allocation[][name]', 'Doplhin')
    // There will be one `allocation[][value]` filed short
    // formData.append('allocation[][value]', '31')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyn1')

    formData.append('allocation[][name]', 'Shrimp')
    formData.append('allocation[][value]', '1')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyn2')

    expect(() => parseFromData(formData)).toThrowError()
  })

  it('can be parsed if there is just one allocation', () => {
    const formData = new FormData();

    formData.append('allocation[][name]', 'Whale')
    formData.append('allocation[][value]', '100')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    const entity = parseFromData(formData)

    expect(entity).toBeDefined()
    expect(entity.allocations).toHaveLength(1)

    expect(entity.allocations[0].value).toStrictEqual(100)
    expect(entity.allocations[0].name).toStrictEqual('Whale')
  })

  it('can be parsed if there are just enough allocations', () => {
    const formData = new FormData();

    // 15 is the max amount of allocations, so let's check the case of 16 allocations
    formData.append('allocation[][name]', 'Whale')
    formData.append('allocation[][value]', '86')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    for (let i = 1; i <= 14; i++) {
      formData.append('allocation[][name]', 'Shrimp')
      formData.append('allocation[][value]', '1')
      formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')
    }

    const entity = parseFromData(formData)

    expect(entity).toBeDefined()
    expect(entity.allocations).toHaveLength(15)

    expect(entity.allocations[0].value).toStrictEqual(86)
    expect(entity.allocations[0].name).toStrictEqual('Whale')

    expect(entity.allocations[14].value).toStrictEqual(1)
    expect(entity.allocations[14].name).toStrictEqual('Shrimp')
  })

  it('cannot be parsed if there are too many allocations', () => {
    const formData = new FormData();

    // 15 is the max amount of allocations, so let's check the case of 16 allocations
    formData.append('allocation[][name]', 'Whale')
    formData.append('allocation[][value]', '85')
    formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')

    for (let i = 1; i <= 15; i++) {
      formData.append('allocation[][name]', 'Shrimp')
      formData.append('allocation[][value]', '1')
      formData.append('allocation[][address]', 'secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne')
    }

    expect(() => parseFromData(formData)).toThrowError()
  })

  it('cannot be parsed if there are no allocations', () => {
    const formData = new FormData();

    expect(() => parseFromData(formData)).toThrowError()
  })
})