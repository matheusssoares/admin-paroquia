export interface EnderecoBase {
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    latitude: number;
    longitude: number;
    complemento?: string;
}