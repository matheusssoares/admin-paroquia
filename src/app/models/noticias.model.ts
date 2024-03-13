export interface Noticias {
  id?: string;
  title: string;
  status: boolean;
  category: Category;
  createAt?: Date;
  UpdateAt?: Date;
  fileDownload?: string;
  description?: string;
  fileBanner?: string;
  fileThumbnail?: string;
  sendNotification: boolean;
  author: string;
  views: number;
  shared: number;
  like: number;
}

export interface Category {
  id?: string;
  name: string;
  status: boolean;
}
