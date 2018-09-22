import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CargasPage } from '../pages/cargas/cargas';
import { LoadingProvider } from '../providers/loading/loading';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  splash: boolean = true;
  rootPage: any = "LoginPage";

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private busyLoader: LoadingProvider) {

      this.busyLoader.showBusyLoader();

      this.initializeApp();

      /* this.auth.afAuth.authState
      .subscribe( 
        user => {
          if (user) {
            this.rootPage = 'HomePage';
          } else {
            this.rootPage = 'LoginPage';
          }
        },
        () => {
          this.rootPage = 'LoginPage';
        }
      ); */

        // used for an example of ngFor and navigation
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Cargas', component: CargasPage }
      ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      setTimeout(() => {
        this.splash = false
        this.busyLoader.dismissBusyLoader();
      }, 3000);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
