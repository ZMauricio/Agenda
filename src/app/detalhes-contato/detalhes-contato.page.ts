import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-contato',
  templateUrl: './detalhes-contato.page.html',
  styleUrls: ['./detalhes-contato.page.scss'],
})
export class DetalhesContatoPage implements OnInit {

  contato: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res) => {
      // console.log(res);
      this.contato = res;
    });
  }

  ngOnInit() {
  }
}
