export default class Feature {
  readonly name: string;

  readonly desc: string;

  readonly notRequired: boolean;

  constructor(name: string, desc: string, notRequired: boolean) {
    this.name = name;
    this.desc = desc;
    this.notRequired = notRequired;
  }
}
