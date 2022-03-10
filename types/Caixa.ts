export class Caixa {
  public "@id"?: string;

  constructor(
    _id?: string,
    public dataAbertura?: Date,
    public dataFechamento?: Date,
    public ativo?: boolean,
    public saldoMilhas?: number,
    public totalEntradas?: number,
    public valorEntradas?: string,
    public totalSaidas?: number,
    public valorSaidas?: string,
    public valorEstoqueMilhasPeriodo?: string,
    public valorLucroMilhasPeriodo?: string,
    public valorMilhaPeriodo?: string,
    public usuarioFechamento?: string,
    public movimentos?: string[],
    public codigo?: string
  ) {
    this["@id"] = _id;
  }
}
