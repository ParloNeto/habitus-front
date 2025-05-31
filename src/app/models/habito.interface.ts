import { Historico } from "./historico.interface";
import { Objetivo } from "./objetivo.interface";

export interface Habito {
  id: number;
  nome: string;
  objetivo: Objetivo;
  dias: number;
  historico: Historico[];
  dataInicio: Date;
}
