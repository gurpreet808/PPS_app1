import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario-provider';

@IonicPage()
@Component({
  selector: 'page-registrar-usuario',
  templateUrl: 'registrar-usuario.html',
})
export class RegistrarUsuarioPage {

  private registerForm: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private auth: UsuarioProvider, 
    private toastCtrl: ToastController,) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(12), Validators.required])],
      password2: ['', Validators.compose([Validators.maxLength(12), Validators.required])],
      perfil: ['', Validators.compose([Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    console.log(this.registerForm.value);
    this.auth.logueoEmail(this.registerForm.value['email'], this.registerForm.value['password'])
      .then( allowed => {
        console.log(allowed);
        this.navCtrl.pop;
    }).catch( error => {
      if (error["code"] == "auth/user-not-found") {
        this.mostrarMensaje('¡ERROR! No se pudo encontrar un usuario con ese mail');  
      } else {
        this.mostrarMensaje('Error en las credenciales');
      }
      console.log(error);
    });
  }

  mostrarMensaje(text:string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
