import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore) { }

  create(path:string, data:any , id:any = undefined):Promise<void>{
    if(id == undefined)
     id = this.firestore.createId();

    return this.firestore.collection(path).doc(id).set(data);
  }

  read(path:string):Observable<any>{
    return this.firestore.collection(path).valueChanges({idField:'id'});
  }

  update(path:string,id:string,data:any):Promise<void>{
    return this.firestore.collection(path).doc(id).update(data);
  }

  delete(path:string, id:string):Promise<void>{
    return this.firestore.collection(path).doc(id).delete();
  }

  readById(path: string,id:string): Observable<any> {
    return this.firestore.collection(path).doc(id).valueChanges();
  }
}
