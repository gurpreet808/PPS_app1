import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
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
  }

}
