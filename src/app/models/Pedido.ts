import { PerfilInterface } from "./UserInterface";
import { Usuario } from "./Usuario";
import { usuarioI } from "./game";
import { PremioI } from "./premio";

export interface PedidoI{
    //Atributos 
   id?:string
    cliente: usuarioI;
    premio:PremioI;
    puntostotal:number;
    estado: EstadoPedido;
    fecha: any;   

    
}


export type EstadoPedido ='enviado' | 'entregado';


