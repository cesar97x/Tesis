import { PerfilInterface } from "./UserInterface";
import { Usuario } from "./Usuario";
import { usuarioI } from "./game";
import { PremioI } from "./premio";

export interface PuntajeI{
    //Atributos 
   id?:string
    cliente: usuarioI;
    puntajetotal:number;   
}





