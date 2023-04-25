import { PerfilInterface } from './UserInterface';

export class Usuario implements PerfilInterface{
    //Atributos 
    nombres = null;
    apellido = null;
    email=null;
    fechaNacimiento= null;
    uid= null;
    perfil= "Usuario";
    direccion = null;
    genero = null;
    edad = null;
    
    //Metodos
    public calcularEdad():void {
        const today: Date = new Date();
        const birthDate: Date = new Date(this.fechaNacimiento);
        let age: number = today.getFullYear() - birthDate.getFullYear();
        const month: number = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        this.edad = age;
    }
}