export interface PerfilInterface{
    //Atributos 
    nombres: String;
    apellido: String;
    email:String;
    fechaNacimiento: Date;
    uid: string;
    perfil: String;
    direccion : string;
    genero : string;
    edad: number;

    //Metodos
    calcularEdad():void;
}