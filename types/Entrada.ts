export class Entrada {
  public "@id"?: string;

  constructor(
    public valor: string,
    _id?: string,
    public movimento?: string,
    public programa?: string,
    public milhas?: number,
    public valorMilha?: string,
    public dataEntrada?: Date,
    public tipoEntrada?: string,
    public usuario?: string,
    public codigo?: string
  ) {
    this["@id"] = _id;
  }
}
