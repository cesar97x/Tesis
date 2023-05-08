export interface GameI{
    //Atributos 
   id?:string
    puntos: number;
    vidas:number;
    tiempo: string;
    estado: string;    
    
}


export interface usuarioI{
    nombres:null;
    apellido:null;
    email:null;
    fechaNacimiento:null;
    uid:null;
    perfil:"Usuario";
    direccion:null;
    genero:null;
    edad:null;
}