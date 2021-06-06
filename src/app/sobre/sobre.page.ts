import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageloginService } from "./../storagelogin.service";

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor(public router: Router, public file: StorageloginService) { }

  ngOnInit() {
  }
  Deslogar() {
    this.file.deslogar("chave");
    this.router.navigate(["login"]);
  }
}
