import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
  loading: Loading;
  constructor(private loadingCtrl: LoadingController) {

  }


  /**
   * showBusyLoader
   */
  public showBusyLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png" />',
      showBackdrop: false,
      dismissOnPageChange:true,
      enableBackdropDismiss: true,
      cssClass: "animacion"
      // duration: 4000
    });
    return this.loading.present();
  }

  /**
   * dismissBusyLoader
   */
  public dismissBusyLoader() {
    this.loading.dismiss();
    this.loading = null;
  }

}
