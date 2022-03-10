export class Usuario {
  public "@id"?: string;

  constructor(
    _id?: string,
    public username?: string,
    public roles?: any,
    public password?: string,
    public pessoa?: string,
    public dataCadastro?: Date,
    public dataAtualizacao?: Date,
    public ativo?: boolean,
    public email?: string,
    public caixas?: string[],
    public movimentos?: string[],
    public registroEntradas?: string[],
    public codigo?: string,
    public registroSaidas?: string[],
    public userIdentifier?: string,
    public salt?: string
  ) {
    this["@id"] = _id;
  }
}
