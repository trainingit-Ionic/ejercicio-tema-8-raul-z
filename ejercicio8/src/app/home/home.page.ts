import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isTorch = false;
  buttonText = "Encender";
  isOn = false;

  constructor(
    private flashlight: Flashlight,
    private platform: Platform,public alertController: AlertController
    ) {
      platform.ready().then(() => {
        this.platform.pause.subscribe(async () => {
          this.flashlightOff();
        });
        this.platform.backButton.subscribe(async () => {
          this.flashlightOff();
        });
      });
      
    }

  ngOnInit(): void {    
    if(this.flashlight.available() && this.platform.is('cordova')){
      this.isTorch = true;
    }else{
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El dispositivo no dispone de flash',
      buttons: ['OK']
    });

    await alert.present();
  }

  flashlightSwitch(){
    if (this.isOn) {
      this.flashlightOff();
    } else  {
      this.flashlightOn();
    }   
  }

  flashlightOn(){
    this.flashlight.switchOn();    
    this.buttonText = "Apagar";
    this.isOn = true;
  }


  flashlightOff(){
    this.flashlight.switchOff();
    this.buttonText = "Encender";
    this.isOn = false;
  }




}
