import { Midia } from "./midia.model";

export interface Usuarios {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    dataNascimento: Date;
    status: boolean;
    fotoProfile: Midia;
    sexo: string;
    whatsapp: string;
    createAt: Date;
    userUpdate: Date;
    perfil: string;
}