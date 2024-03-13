export interface Midia {
    id?: string;
    nome: string;
    url: string;
    timestamp: number;
    path: string;
}

export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }