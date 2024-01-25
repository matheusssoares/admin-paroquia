import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  async createData(collecionString: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const collectionData = collection(this.firestore, collecionString);
      const documentKey = doc(collectionData);
      data.id = documentKey;

      await setDoc(documentKey, data)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
