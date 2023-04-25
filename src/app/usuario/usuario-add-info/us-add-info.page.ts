import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { Usuario } from '../../models/Usuario';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-add-info',
  templateUrl: './us-add-info.page.html',
  styleUrls: ['./us-add-info.page.scss'],
})
export class UsuarioAddInfoPage implements OnInit {
  public fechaNacimiento = '';
  public selectedGenero = '';
  public datos: FormGroup;
  public nombres = '';
  public apellidos = '';
  public direccion = '';
  public showPicker = false;
  public dataValue = format(new Date(), 'yyyy-MM-dd');
  public dataValueTodayMax = format(new Date(), 'yyyy-MM-dd');
  public formattedString = '';
  selectedMode = 'date';
  public userAccount = null;



  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private database: FirestoreService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.setToday()
  }

  setToday() {
    this.formattedString = format(parseISO(this.dataValue), 'yyyy-MMMM-d');
  }

  ngOnInit() {
    this.userAccount = this.authService.getUserProfile();
    this.datos = this.fb.group({
      nombresForm: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      apellidosForm: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      direccionForm: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      fechaForm: ['', [Validators.required]],
      generoForm: ['', [Validators.required]],
    });
  }
  //Atributos
  /*

email=null;
uid= null;
*/
  public guardarInformacion() {
    const userNew: Usuario = new Usuario();
    userNew.nombres = this.datos.get('nombresForm').value;
    userNew.apellido = this.datos.get('apellidosForm').value;
    userNew.direccion = this.datos.get('direccionForm').value;
    userNew.fechaNacimiento = this.datos.get('fechaForm').value;
    userNew.genero = this.datos.get('generoForm').value;
    userNew.calcularEdad();
    userNew.email = this.userAccount.email;
    userNew.uid = this.userAccount.uid;
    const usercreado = this.database.addUsuario(userNew);
    if (usercreado) {
      this.router.navigateByUrl('/usuario-menu', { replaceUrl: true });
    } else {
      this.showAlert('Registro Fallido', 'Por favor, Intente de nuevo!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  get nombresForm() {
    return this.datos.get('nombresForm');
  }

  get apellidosForm() {
    return this.datos.get('apellidosForm');
  }

  get direccionForm() {
    return this.datos.get('direccionForm');
  }

  get fechaForm() {
    return this.datos.get('fechaForm');
  }

  get generoForm() {
    return this.datos.get('generoForm');
  }

  cambiarFecha(valorFecha) {
    this.dataValue = valorFecha;
    this.formattedString = format(parseISO(valorFecha), 'yyyy-MMMM-d');
    this.showPicker = false;
  }

  eleccionGeneroUsuario(seleccionGenero) {
    this.selectedGenero = seleccionGenero;
  }
}
