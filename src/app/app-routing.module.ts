import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "folder/Inbox",
    pathMatch: "full"
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then(m => m.FolderPageModule)
  },
  {
    path: "cadastroperfil",
    loadChildren: () =>
      import("./cadastroperfil/cadastroperfil.module").then(
        m => m.CadastroperfilPageModule
      )
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: 'dicas',
    loadChildren: () => import('./dicas/dicas.module').then( m => m.DicasPageModule)
  },
  {
    path: 'avaliacoes',
    loadChildren: () => import('./avaliacoes/avaliacoes.module').then( m => m.AvaliacoesPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
