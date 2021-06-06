import { Avaliacao } from "./Models/avaliacao";
import { Paciente } from "./Models/paciente";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Login } from "./Models/login";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AnprecService {
  constructor(private http: HttpClient, public toast: ToastController) {}

  url = "https://mamauece.herokuapp.com/";

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "Content-Type"
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
      this.erro();
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      this.erro();
    }
    this.erro();
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  async erro() {
    const toast = await this.toast.create({
      message: "Erro no servidor. Reveja seus dados e tente de novo ou contacte a equipe técnica.",
      duration: 2000
    });
    toast.present();
  }
  cadastro(item): Observable<Paciente> {
    return this.http
      .post<Paciente>(
        this.url + "/api/v1/resources/cadastro",
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  atualizar(item): Observable<Paciente> {
    return this.http
      .post<Paciente>(
        this.url + "/api/v1/resources/atualizar",
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  entrar(item): Observable<Login> {
    return this.http
      .post<Login>(
        this.url + "/api/v1/resources/login",
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  pegarusuario(item): Observable<Paciente> {
    return this.http
      .post<Paciente>(
        this.url + "/api/v1/resources/pegarpaciente",
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  pegaravaliacoes(item): Observable<Avaliacao[]> {
    return this.http
      .post<Avaliacao[]>(
        this.url + "/api/v1/resources/pegaravaliacoes",
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  avaliacao(item): Observable<Avaliacao> {
    return this.http
      .post<Avaliacao>(
        this.url + "/api/v1/resources/avaliacao",
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
