import { Component, OnInit } from "@angular/core";
import { AnprecService } from "../anprec.service";
import { StorageloginService } from "./../storagelogin.service";
import { Avaliacao } from "../Models/avaliacao";

@Component({
  selector: "app-avaliacoes",
  templateUrl: "./avaliacoes.page.html",
  styleUrls: ["./avaliacoes.page.scss"]
})
export class AvaliacoesPage implements OnInit {
  req: Avaliacao;
  resp: Array<Avaliacao>;

  constructor(public file: StorageloginService, private anprec: AnprecService) {
    this.req = new Avaliacao();
    this.resp = new Array<Avaliacao>();

    this.file.pegaUsuario().then((user: any) => {
      this.req.nomepaciente = user.email;
      this.anprec.pegaravaliacoes(this.req).subscribe(response => {
        this.resp = response;
      });
    });
  }

  ngOnInit() {}
}
