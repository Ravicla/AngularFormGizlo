import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: '/form' },
  { path: 'form', component: FormComponent },
  { path: 'updateUser/:iduser', component: FormComponent },

  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
