import { StorageloginService } from "./../storagelogin.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Avaliacao } from "../Models/avaliacao";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { AnprecService } from "../anprec.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"]
})
export class FolderPage implements OnInit {
  public folder: string;
  public res: String;
  public resint: String;
  usuario: any;
  public aval: Avaliacao;
  perguntas: Array<any>;
  mensagens: Array<any>;
  opcoes: Array<any>;
  botoes: Array<any>;
  n: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private camera: Camera,
    public menuCtrl: MenuController,
    public file: StorageloginService,
    private anprec: AnprecService,
    public alertController: AlertController
  ) {
    this.aval = new Avaliacao();

    this.file.pegaUsuario().then((user: any) => {
      if (user == null) {
        this.router.navigateByUrl("/login");
      } else {
        this.usuario = user.email;
        this.aval.nomepaciente = user.email;
      }
    });
    //this.aval.nomepaciente = "sara@uece.br";

    this.mensagens = [
      // Sim/Não
      { pergunta: "Voce pratica atividade fisica diariamente?", resposta: "" }
    ];

    this.file.pegaUsuario().then((user: any) => {
      if (user != null) {
        this.anprec.pegarusuario(user).subscribe(response => {
          this.aval.nomepaciente = user.email;
        });
      }
    });

    this.n = 2;

    this.opcoes = [
      {
        opcao1: "Sim",
        opcao2: "Não",
        dica: "Atividade fisica é tudo aquilo que te faz suar!"
      },
      {
        opcao1: "< 45 minutos/dia",
        opcao2: ">= 45 =< 60 minutos/dia",
        opcao3: "60 minutos/dia"
      },
      { opcao1: "Sim", opcao2: "Não" },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      { opcao1: "Nunca", opcao2: "Semanalmente", opcao3: "Diariamente" },
      {
        opcao1: "< 5 porcoes",
        opcao2: "=> 5 porções",
        dica: "Uma porção de carne corresponde a um bife de 200g."
      },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      {
        opcao1: "> 1 porcao",
        opcao2: "=< 1 porção/Nenhuma",
        dica: "Neste caso uma porção equivale a uma taça de vinho de 200ml"
      },
      { opcao1: "Sim", opcao2: "Não" },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      {
        opcao1: "Semanalmente",
        opcao2: "Diariamente",
        opcao3: "Raramente ou Nunca"
      },
      { opcao1: "Diariamente", opcao2: "Semanalmente", opcao3: "Nunca" }
    ];

    this.botoes = [this.opcoes[Object.keys(this.opcoes)[0]]];
    console.log(this.botoes);

    this.perguntas = [
      // 2 - < 45 minutos/dia de atividade moderada/>= 45 e =< 60 minutos/dia de atividade moderada/60 minutos/dia de atividade moderada
      "A duracao e intensidade da sua atividade fisica diaria e:",
      // 3 - Sim/Não
      "Voce gasta mais de 3 horas por dia com habitos sedentarios?",
      // 4 - Semanalmente/Diariamente/Raramente ou Nunca
      "Voce consome chocolat., sorvet. industrializ., bolos com recheio e cobertura, biscoit. doces, sobremesas e doce em geral com que frequencia",
      // 5 - Semanalmente/Diariamente/Raramente ou Nunca
      "Voce consome refrigerante e/ou outras bebidas acucaradas com que frequencia?",
      // 6 - Semanalmente/Diariamente/Raramente ou Nunca
      "Voce consome algum desses alimentos com que frequencia: salgad fritos ou de forno (coxinh, pasteis, risoles, quibe, empada, folhado), salgadinhos em pacotes (industrializados), sanduiches de lanchonete (cachorro quente, hambúrguer), batata frita, pizzas, esfihas?",
      // 7 - < 5 porcoes/ => 5 porções/Raramente ou nunca
      "Voce consome frutas de cores variadas, verduras e hortalicas sem amido em quantas porcoes por dia?",
      // 8 - Nunca/Semanalmente/Diariamente
      "Voce consome cereal integral e /ou leguminosa em todas as refeicoes do dia com que frequencia?",
      // 9 - < 5 porcoes/ => 5 porções
      "Quantas porcoes de carne vermelha voce consome por semana?",
      // 10 - Semanalmente/Diariamente/Raramente ou Nunca
      "Voce consome carne processada com que frequencia?",
      // 11 - > 1 porcao/ =< 1 porção/Nenhuma
      "Quantas porcoes de bebida alcoolica voce consome por semana?",
      // 12 - Sim/Não
      "Voce utiliza temperos prontos (industrializados) para o preparo das refeicoes?",
      // 13 - Semanalmente/Diariamente/Raramente ou Nunca
      "Voce consome produtos industrializados com que frequencia?",
      // 14 - Semanalmente/Diariamente/Raramente ou Nunca
      "Voce costuma adicionar mais sal as refeicoes depois de prontas?",
      // 15 - Diariamente/Semanalmente/Nunca
      "Voce consome suplemento alimentar? Ex.: hiperprotéico, polivitaminico, omega 3, calcio, vitamina D, etc.: "
    ];
  }

  responder() {
    this.mensagens.push({ resposta: this.res });
    if (this.mensagens.length == 2) {
      this.aval.atvfisdiaria = this.resint;
      console.log(this.mensagens.length);
    } else if (this.mensagens.length == 4) {
      this.aval.duracaoatvfisdiaria = this.resint;
    } else if (this.mensagens.length == 6) {
      this.aval.maistreshrsdiasendetario = this.resint;
    } else if (this.mensagens.length == 8) {
      this.aval.cholateeindustrialzados = this.resint;
    } else if (this.mensagens.length == 10) {
      this.aval.refri = this.resint;
    } else if (this.mensagens.length == 12) {
      this.aval.frituras = this.resint;
    } else if (this.mensagens.length == 14) {
      this.aval.frutascolridas = this.resint;
      console.log(this.mensagens.length);
    } else if (this.mensagens.length == 16) {
      this.aval.cerealintegral = this.resint;
    } else if (this.mensagens.length == 18) {
      this.aval.qtsporcoescarne = this.resint;
    } else if (this.mensagens.length == 20) {
      this.aval.carneprocessadafreq = this.resint;
    } else if (this.mensagens.length == 22) {
      this.aval.bebida = this.resint;
    } else if (this.mensagens.length == 24) {
      this.aval.temperosindustrializados = this.resint;
    } else if (this.mensagens.length == 26) {
      this.aval.produtosindustrializados = this.resint;
    } else if (this.mensagens.length == 28) {
      this.aval.sal = this.resint;
    } else if (this.mensagens.length == 30) {
      this.aval.suplementos = this.resint;
      console.log(this.mensagens.length);
      this.botoes = null;
      this.res = "";
      this.anprec.avaliacao(this.aval).subscribe(
        response => {
          this.mensagens.push({
            pergunta: "Pronto! Seu risco é: " + response.resultado
          });
          this.mensagens.push({
            pergunta: "Recomendação: " + response.recomendacao
          });
        },
        error => {
          this.mensagens.push({
            pergunta:
              "Oops! Algo errado, volte mais tarde ou contacte a equipe técnica."
          });
        }
      );

      return;
    }

    this.botoes = [this.opcoes[Object.keys(this.opcoes)[this.n - 1]]];
    this.mensagens.push({
      pergunta: this.perguntas[this.mensagens.length - this.n]
    });
    this.n = this.n + 1;
    this.res = "";
  }

  async dica(dica: any) {
    const alert = await this.alertController.create({
      cssClass: "alertdica",
      header: "Dica",
      subHeader: "Entenda o que a pergunta quis dizer:",
      message: dica,
      buttons: ["OK"]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  Deslogar() {
    this.file.deslogar("chave");
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }

  capturedSnapURL: string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      err => {
        console.log(err);
        // Handle error
      }
    );
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}
