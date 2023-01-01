import {ResourceType} from "@/types/ResourceType";

export default interface Resources {
  packages(): [string]

  configs(type: ResourceType, packages?: string): [string]

  value(config: string, name: string, type: ResourceType, packages?: string): string

  names(config: string, type: ResourceType, packages?: string): [string]

  xml(path: string): Document
}
