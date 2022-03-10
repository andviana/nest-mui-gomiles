import { Saida } from "./Saida";

export class TipoSaida {
  public "@id"?: string;

  constructor(
    _id?: string,
    public descricao?: string,
    public saidas?: Saida[]
  ) {
    this["@id"] = _id;
  }
}
