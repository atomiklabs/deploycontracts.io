import { parseFromData } from './marketing-info'

describe('Marketing Info entity', () => {
  it('can be parsed with correct form data', () => {
    // case 1: no values
    let formData = new FormData();

    expect(parseFromData(formData)).toBeDefined()

    // case 2: empty values
    formData = new FormData();

    formData.append('projectName', '')
    formData.append('projectDescription', '')
    formData.append('projectLogoCID', '')

    expect(parseFromData(formData)).toBeDefined()

    // case 3: project name only
    formData = new FormData();

    formData.append('projectName', 'Abc Project')

    expect(parseFromData(formData)).toBeDefined()
  })

  it('cannot be parsed with incorrect form data', () => {
    let formData = new FormData();

    formData.append('projectName', new Blob())

    expect(() => parseFromData(formData)).toThrowError()

    formData = new FormData();

    formData.append('projectDescription', new Blob())

    expect(() => parseFromData(formData)).toThrowError()

    formData = new FormData();

    formData.append('projectLogoCID', new Blob())

    expect(() => parseFromData(formData)).toThrowError()
  })
})