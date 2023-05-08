import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, docData, addDoc, deleteDoc, doc, setDoc, updateDoc, getDoc, collectionGroup, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PerfilInterface } from '../models/UserInterface';
import { Usuario } from '../models/Usuario';
import { Auth } from '@angular/fire/auth';
import { Storage, ref } from '@angular/fire/storage';
import { getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';
import { query, where } from 'firebase/firestore';
import { PuntajeI } from '../models/Puntaje';
import { usuarioI } from '../models/game';


export interface Note {
  //Atributos 
  id?: String;
  correo_comentario: String
  title: String;
  text: String;

}

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth,
  ) { }

  getUsuarios(): Observable<PerfilInterface[]> {
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, { idField: 'uid' }) as Observable<PerfilInterface[]>;
  }

  getUsuarioByID(uid: string): Observable<PerfilInterface> {

    const noteDocRef = doc(this.firestore, `users/${uid}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<PerfilInterface>

  }

  async addUsuario(user: Usuario) {
    const userJson = {
      nombres: user.nombres,
      apellido: user.apellido,
      email: user.email,
      fechaNacimiento: user.fechaNacimiento,
      uid: user.uid,
      perfil: user.perfil,
      direccion: user.direccion,
      genero: user.genero,
      edad: user.edad,

    }
    await setDoc(doc(this.firestore, "users", this.auth.currentUser.uid), userJson)
  }

  getUsuario() {
    const user = this.auth.currentUser.uid;
    const usercorreo = this.auth.currentUser.email;
    return user
  }

  getUsuarioEmail() {
    const user = this.auth.currentUser.email;
    return user
  }

  getUsuarioNombre() {
    const user = this.auth.currentUser.displayName;
    return user
  }


  async agregarComentario(comentario: String) {
    const user = this.auth.currentUser;
    const path = 'Comentario/Comentario/'
  }

  async agregarReporte(reporte: String) {
    const user = this.auth.currentUser;
    const path = 'Reporte/Reporte/'
  }

  getProductos() {
    const prodRef = collection(this.firestore, 'Producto');
    return collectionData(prodRef);
  }

  getReportes() {
    const repRef = collection(this.firestore, 'Reportes');
    return collectionData(repRef);
  }

  getNotes() {
    const notesRef = collection(this.firestore, 'Comentario');
    return collectionData(notesRef);
  }

  getNotesById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `Comentario/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'Comentario');
    return addDoc(notesRef, note)
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `Comentario/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, 'Comentario/${note.id}');
    return updateDoc(noteDocRef, {})
  }

  traerImagenesStorage(urlI) {
    const user = this.auth.currentUser.uid;
    const path = urlI
    const storageRef = ref(this.storage, path)

    const imagenUrl = getDownloadURL(storageRef);
    console.log(imagenUrl)
    return imagenUrl;
  }



  //********  add by juan boni

  //getPaises(): Observable<Pais[]>{
  //  return collectionData(collection(this.firestore, 'Paises'), {idField: 'id'}) as Observable<Pais[]>;
  //}

  addDocumento(data: any, path: string) {
    const notesRef = collection(this.firestore, path);

    return addDoc(notesRef, data)
  }

  getDoc<tipo>(path: string) {

    return collectionData(collection(this.firestore, path), { idField: 'id' }) as Observable<tipo[]>
  }

  getCollectionQuery<tipo>(path: string,campo:string,estado:string,idcliente:string) {
    const collectio =collection(this.firestore, path)

    return collectionData(query(collectio,where(campo,"==",estado), where("cliente.id", "==", idcliente))) as Observable<tipo[]>
  }

  getCollectionAll<tipo>(path: string,parametro:string,condicion:any,busqueda:string) {
    const collectio =collection(this.firestore, path)

    return collectionData(query(collectio,where(parametro,condicion,busqueda)), { idField: 'id' }) as Observable<tipo[]>
  }

  getDocUsu<tipo>(path: string,uid:string) {
    const noteDocRef = doc(this.firestore,path,uid);
    return docData(noteDocRef, { idField: 'id' }) as Observable<tipo>
  }

 
  



  
  

  deleteDoc(path: string, id: string) {
    const noteDocRef = doc(this.firestore, path, id);
    return deleteDoc(noteDocRef);
  }

  updateDoc(data: any, path: string, id: string) {
    const noteDocRef = doc(this.firestore, path, id);
    return updateDoc(noteDocRef, data)
  }

  //para cerar el puntaje actua;
  createpuntaje(contact: PuntajeI,id:string): Promise<void> {
    const document = doc(collection(this.firestore, 'PuntajeActual'),id);
    return setDoc(document, contact);
  }
  //para cerar usuario q ya existe desde google;
  createususuariogoogle(usuario: usuarioI,id:string): Promise<void> {
    const document = doc(collection(this.firestore, 'users'),id);
    return setDoc(document, usuario);
  }
  //para buscar el puntaje actual
  getPuntajeById(id): Observable<PuntajeI> {
    const noteDocRef = doc(this.firestore, `PuntajeActual/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<PuntajeI>
  }

  //getById(path:string,id:string):Observable<EquipoI>{

  // const noteDocRef = doc(this.firestore, path,id);

  //*return docData(noteDocRef, {idField:'id'}) ;
  //*return docData(noteDocRef, {idField:'id'}) as Observable<EquipoI>

  //}

  getById2(path: string, id: string) {

    const noteDocRef = doc(this.firestore, path, id);

    //return docData(noteDocRef, {idField:'id'}) ;
    return docData(noteDocRef, { idField: 'id' })

  }

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {

      const filePath = path + '/' + nombre;
      const storageref = ref(this.storage, filePath);
      const task = uploadBytes(storageref, file);

      task.then(
        () => {
          const imagenUrl = getDownloadURL(storageref);
          resolve(imagenUrl);
          return;
        }
      )
        .catch(error => console.log(error));


    });

  }

}