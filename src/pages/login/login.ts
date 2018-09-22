import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario-provider';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  private loginForm: FormGroup;
  
  userTest:number;
  
  usuariosTest = [
    {email: "admin@gmail.com", password: "11"},
    {email: "invitado@gmail.com", password: "22"},
    {email: "usuario@gmail.com", password: "33"},
    {email: "anonimo@gmail.com", password: "44"},
    {email: "tester@gmail.com", password: "55"}
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private auth: UsuarioProvider, 
    private toastCtrl: ToastController,) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(12), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  elegirTest(id:number){
    this.loginForm.controls['email'].setValue(this.usuariosTest[id].email);
    this.loginForm.controls['password'].setValue(this.usuariosTest[id].password);
  }

  login(){
    console.log(this.loginForm.value);
    this.auth.logueoEmail(this.loginForm.value['email'], this.loginForm.value['password'])
      .then( allowed => {
        console.log(allowed);
        this.navCtrl.setRoot("HomePage");
    }).catch( error => {
      if (error["code"] == "auth/user-not-found") {
        this.mostrarMensaje('¡ERROR! No se pudo encontrar un usuario con ese mail');  
      } else {
        this.mostrarMensaje('Error en las credenciales');
      }
      console.log(error);
    });
  }

  registrarme(){
    this.navCtrl.push("RegistrarUsuarioPage");
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
