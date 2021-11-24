import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationActivityComponent } from './documentation-activity.component';

const routes: Routes = [
  { path: '', redirectTo: 'documentation-general-activities', pathMatch: 'full' },
  { path: 'documentation-general-activities', component: DocumentationActivityComponent },
  { path: '**', redirectTo: 'documentation-general-activities' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationActivityRoutingModule { }
