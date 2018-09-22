import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '@firebase/auth-types';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {

  user: User;
  access: boolean;

  constructor(
    public afAuth: AngularFireAuth, 
    private toastCtrl: ToastController,
    private afDataBase: AngularFireDatabase) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  logueoEmail(mail: string, pass: string) {
    //console.log('Logueo con email');
    return this.afAuth.auth.signInWithEmailAndPassword(mail, pass);
  }

  registrar(datos) {
    if(this.registroAF(datos.email, datos.password)){
      this.logueoEmail(datos.email, datos.password)
      .then( allowed => {
        console.log(allowed);
        delete datos.password;
        this.afDataBase.object(`usuarios/${this.user.uid}`).set(datos);
      }).catch( error => {
        if (error["code"] == "auth/user-not-found") {
          this.mostrarMensaje('¡ERROR! No se pudo encontrar un usuario con ese mail');  
        } else {
          this.mostrarMensaje('Error en las credenciales');
        }
        console.log(error);
      });
    }
  }

  async registroAF(mail: string, pass: string){
    try {
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(mail, pass);
      //console.log("Entra");
      if (result.user.email == mail) {
        return true;        
      }
      return false;

    } catch (error) {
      console.log(error);
      return false;     
    }

  }

  guardarDatosUsuario(){

  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  desloguear(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  mostrarMensaje(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public getUserInfo(): User {
    return this.user;
  }

}