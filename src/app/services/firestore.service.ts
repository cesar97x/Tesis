import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, docData, addDoc, deleteDoc, doc, setDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PerfilInterface } from '../models/UserInterface';
import { Usuario } from '../models/Usuario';
import { Auth } from '@angular/fire/auth';
import { Storage,ref } from '@angular/fire/storage';
import { getDownloadURL } from '@angular/fire/storage';


export interface Note{
    //Atributos 
    id?: String;
    correo_comentario:String
    title: String;
    text:String;

}

@Injectable({
  providedIn: 'root'
})
 
export class FirestoreService {

  constructor(
    private firestore : Firestore,
    private storage: Storage,
    private auth: Auth,
  ) { }

  getUsuarios():Observable<PerfilInterface[]>{
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, {idField:'uid'}) as Observable<PerfilInterface[]>;
  }

  getUsuarioByID(uid:string):Observable<PerfilInterface>{
    
    const noteDocRef = doc(this.firestore, `users/${uid}`);
    return docData(noteDocRef, {idField:'id'}) as Observable<PerfilInterface>

  }

  async addUsuario(user: Usuario){
    const userJson = {
      nombres: user.nombres,
      apellido: user.apellido,
      email:user.email,
      fechaNacimiento: user.fechaNacimiento,
      uid: user.uid,
      perfil: user.perfil,
      direccion : user.direccion,
      genero : user.genero,
      edad: user.edad,
  
    }
    await setDoc(doc(this.firestore, "users", this.auth.currentUser.uid), userJson)
  }

  getUsuario(){
    const user = this.auth.currentUser.uid;
    const usercorreo = this.auth.currentUser.email;
    return user
  }

  getUsuarioEmail(){
    const user = this.auth.currentUser.email;
    return user
  }

  getUsuarioNombre(){
    const user = this.auth.currentUser.displayName;
    return user
  }


  async agregarComentario(comentario:String){
    const user = this.auth.currentUser;
    const path= 'Comentario/Comentario/'
  }

  async agregarReporte(reporte:String){
    const user = this.auth.currentUser;
    const path= 'Reporte/Reporte/'
  }

  getProductos(){
    const prodRef = collection(this.firestore, 'Producto');
    return collectionData(prodRef);
  }

  getReportes(){
    const repRef = collection(this.firestore, 'Reportes');
    return collectionData(repRef);
  }

  getNotes(){
    const notesRef = collection(this.firestore, 'Comentario');
    return collectionData(notesRef);
  }

  getNotesById(id):Observable<Note>{
    const noteDocRef = doc(this.firestore, `Comentario/${id}`);
    return docData(noteDocRef, {idField:'id'}) as Observable<Note>
  }

  addNote(note:Note){
    const notesRef = collection(this.firestore, 'Comentario');
    return addDoc(notesRef, note)
  }

  deleteNote(note:Note){
    const noteDocRef = doc(this.firestore, `Comentario/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note:Note){
    const noteDocRef = doc(this.firestore, 'Comentario/${note.id}');
    return updateDoc(noteDocRef, {})
  }

   traerImagenesStorage(urlI){
    const user = this.auth.currentUser.uid;
    const path = urlI
    const storageRef = ref(this.storage, path)
    
    const imagenUrl = getDownloadURL(storageRef);
    console.log(imagenUrl)
    return imagenUrl;
  }

  }