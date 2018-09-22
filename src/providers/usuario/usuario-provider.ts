import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {

  user: User;
  access: boolean;

  constructor(public afAuth: AngularFireAuth, private toastCtrl: ToastController) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  logueoEmail(mail: string, pass: string) {
    console.log('Logueo con email');
    return this.afAuth.auth.signInWithEmailAndPassword(mail, pass);
  }

  registrar(mail: string, pass: string, perfil: string, sexo: string) {
    //return this.afAuth.auth.createUserWithEmailAndPassword(mail, pass);
    if (true) {
      
    }
  }

  async registroAF(mail: string, pass: string){
    try {
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(mail, pass);
      console.log(result);
    } catch (error) {
      console.log(error);      
    }

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