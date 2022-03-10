export class Pessoa {
  public "@id"?: string;

  constructor(
    _id?: string,
    public nome?: string,
    public cpf?: string,
    public dataNascimento?: Date,
    public usuarios?: string[],
    public codigo?: string
  ) {
    this["@id"] = _id;
  }
}
