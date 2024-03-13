import { Injectable, inject } from '@angular/core';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Midia } from '../models/midia.model';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = inject(Storage);
  private timestamp: number = new Date().getTime();

  constructor() {}

  pushFileToStorage(file: any, path: string): Promise<Midia> {
    return new Promise((resolve, reject) => {
      const pathFull: string = `${path}/${this.timestamp}/${file.file.name}`;
      const storageRef = ref(this.storage, pathFull);
      const uploadTask = uploadBytesResumable(storageRef, file.file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          reject(error.code);
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('upload não autorizado');

              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              console.log('upload cancelado');

              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('servidor não encontrado');

              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const result: Midia = {
              nome: file.file.name,
              path: pathFull,
              timestamp: this.timestamp,
              url: downloadURL,
            };
            resolve(result);
          });
        }
      );
    });
  }

  deleteFile(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Create a reference to the file to delete
      const desertRef = ref(this.storage, path);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          console.log(error);
          reject(error)
          
        });
    });
  }
}
