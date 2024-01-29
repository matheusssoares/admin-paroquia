import { EnderecoBase } from "./comuns.models";

export interface Agenda {
    id?: string | null;
    title: string;
    isPublic: boolean;
    backgroundColor: string;
    startDateTime: Date;
    endDateTime: Date | null;
    allDay: boolean;
    repeat: AGENDA_REPETICOES;
    address?: EnderecoBase | string;
    description: string;
    dateSelect: string;
}

export enum EVENTOS_STATUS {
    CANCELADO = 0,
    FINALIZADO = 1,
    PENDENTE = 2
}

export enum AGENDA_REPETICOES {
    NAO_REPETIR = 0,
    TODO_DIA = 1,
    TODA_SEMANA = 2,
    TODA_QUINZENA = 3,
    TODO_MES = 4,
    TODO_ANO = 5
}