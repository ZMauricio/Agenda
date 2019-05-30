import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import {map} from 'rxjs/operators';
import { ServidorProviderService } from '../providers/servidor-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(private router: Router, public alertCtrl: AlertController, public servidor: ServidorProviderService, public http: Http) { }

  ngOnInit() {
  }

  logar() {

    if( this.email == undefined || this.senha == undefined) {
      this.presentAlert();
    }
    else{
      this.http.get(this.servidor.urlGet()+'login.php?email='+this.email+'&senha='+this.senha).pipe(map( res => res.json()))
      .subscribe(dados =>{
          if(dados.msg.logado == 'sim') {
            this.router.navigate(['/home']);
          } else{
            this.wrongPasswordAlert();
          }
      })
    }

  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '<b>Preencha todos os campos!</b>',
      buttons: ['OK']
    });

    return await alert.present();
  }

  async wrongPasswordAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '<b>Usuário e/ou senha incorretos!</b>',
      buttons: ['OK']
    });

    return await alert.present();
  }


}
