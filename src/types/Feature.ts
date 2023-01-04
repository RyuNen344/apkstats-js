export default class Feature {
  name: string

  desc: string

  notRequired: boolean

  constructor(
    name: string,
    desc: string,
    notRequired: boolean
  ) {
    this.name = name
    this.desc = desc
    this.notRequired = notRequired
  }
}
