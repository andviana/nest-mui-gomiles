export class Saida {
  public "@id"?: string;

  constructor(
    _id?: string,
    public movimento?: string,
    public empresaMilha?: string,
    public Programa?: string,
    public valor?: string,
    public milhas?: number,
    public valorMilha?: string,
    public dataSaida?: Date,
    public dataCompensacao?: Date,
    public tipoSaida?: string,
    public usuario?: string,
    public codigo?: string,
    public programa?: string
  ) {
    this["@id"] = _id;
  }
}
