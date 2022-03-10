export class Programa {
  public "@id"?: string;

  constructor(
    _id?: string,
    public nome?: string,
    public logo?: string,
    public descricao?: string,
    public url?: string,
    public registroEntradas?: string[],
    public registroSaidas?: string[]
  ) {
    this["@id"] = _id;
  }
}
