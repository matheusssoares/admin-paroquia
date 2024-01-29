import { Injectable, inject } from '@angular/core';
import {
  DocumentSnapshot,
  Firestore,
  OrderByDirection,
  WhereFilterOp,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

export interface WhereCondition<T> {
  field: keyof T;
  operator: WhereFilterOp;
  value: T[keyof T];
}

export interface OrderByCondition<T> {
  field: keyof T;
  order?: OrderByDirection;
}

export interface FirestoreQuery<T> {
  limit?: number;
  startAt?: number | string | DocumentSnapshot<T>;
  startAfter?: number | string | DocumentSnapshot<T> | null;
  endAt?: number | DocumentSnapshot<T>;
  endBefore?: number | DocumentSnapshot<T>;
  orderBy?: OrderByCondition<T>[];
  where?: WhereCondition<T>[];
}

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

  async getItens<T>(collections: string, q: FirestoreQuery<T>) {
    const { where: ws, orderBy: os } = q;

    const orderBys =
      os?.map((condition) => {
        return orderBy(condition.field as string, condition.order);
      }) ?? [];

    const wheres =
      ws?.map((condition) => {
        return where(
          condition.field as string,
          condition.operator,
          condition.value
        );
      }) ?? [];

    const coll = collection(this.firestore, collections);

    const queryFn = query(coll, ...wheres, ...orderBys, limit(q.limit ?? 99));
    const results = await getDocs(queryFn);

    return results.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as T;
    });
  }
}
