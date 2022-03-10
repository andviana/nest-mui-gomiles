export class EmpresaMilha {
  public "@id"?: string;

  constructor(
    _id?: string,
    public nome?: string,
    public logo?: string,
    public url?: string,
    public registroSaidas?: string[]
  ) {
    this["@id"] = _id;
  }
}
