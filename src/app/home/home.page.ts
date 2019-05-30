import { Component } from '@angular/core';


import { ServidorProviderService } from '../providers/servidor-provider.service';
import { NavController } from '@ionic/angular';
import { DetalhesContatoPage } from '../detalhes-contato/detalhes-contato.page';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contatos: any;

  object = {
    codigo: '',
    nome: '',
    telefone: '',
    email: ''
  };

  pessoa: Array<{codigo: any; nome: string; telefone: string; email: string}>;
  pessoaTodos: Array<{ codigo: any; nome: string; telefone: string; email: string }>;

  constructor(private router: Router, public navCtrl: NavController, public servidor: ServidorProviderService) {
    this.pessoa = [];
    this.getRetornar();
  }

  getRetornar() {
    this.servidor.getPegar().subscribe(
                                       data => {
                                                this.contatos = data;

                                                // tslint:disable-next-line: prefer-for-of
                                                for (let i = 0; i < data.length; i++) {

                                                  this.pessoa.push({
                                                    codigo: data[i]['codigo'],
                                                    nome: data[i]['nome'],
                                                    telefone: data[i]['telefone'],
                                                    email: data[i]['email']
                                                  });

                                                }

                                                this.pessoaTodos = this.pessoa;

                                          err => console.log(err);
                                       }
                                      );
  }



  getContatos(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() !== '') {

      this.pessoa = this.pessoaTodos.filter((contatos) => {
        return (contatos.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      } )

    } else {
      this.pessoa = this.pessoaTodos;
    }
  }


  detalhes(contatos: any) {
    // this.router.navigate(['/detalhes-contato']);
    this.object.codigo = contatos.codigo;
    this.object.nome = contatos.nome;
    this.object.telefone = contatos.telefone;
    this.object.email = contatos.email;


    this.router.navigate(['/detalhes-contato'], {
      queryParams: this.object, });

  }

}
