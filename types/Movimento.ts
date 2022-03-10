export class Movimento {
  public "@id"?: string;

  constructor(
    _id?: string,
    public tipoOperacao?: string,
    public data?: Date,
    public caixa?: string,
    public valor?: string,
    public quantidade?: number,
    public usuario?: string,
    public registroEntrada?: string,
    public codigo?: string,
    public registroSaida?: string
  ) {
    this["@id"] = _id;
  }
}
