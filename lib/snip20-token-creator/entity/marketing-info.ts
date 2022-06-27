import { object, string } from "yup";

export const schema = object({
  projectName: string().notOneOf(['[object File]']).optional(),
  projectDescription: string().notOneOf(['[object File]']).optional(),
  projectLogoCID: string().notOneOf(['[object File]']).optional(),
})

export interface MarketingInfoEntity {
  projectName?: string
  projectDescription?: string
  projectLogoCID?: string
}

export function createDefault(): MarketingInfoEntity {
  return {}
}

export function create(data: MarketingInfoEntity): MarketingInfoEntity {
  return schema.validateSync(data)
}

export function parseFromData(formData: FormData): MarketingInfoEntity {
  return schema.validateSync({
    projectName: formData.get('projectName') || '',
    projectDescription: formData.get('projectDescription') || '',
    projectLogoCID: formData.get('projectLogoCID') || '',
  })
}
