import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponseComponent } from './response/response.component';
import { ResponseFormComponent } from './response-form/response-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'response', component: ResponseComponent},
  {path: 'response', children:[
    {path: 'add', component: ResponseFormComponent},
    {path: 'edit/:id', component: ResponseFormComponent, data:{kind: 'edit'} }
  ]},
  {path: '', redirectTo: '/response', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
