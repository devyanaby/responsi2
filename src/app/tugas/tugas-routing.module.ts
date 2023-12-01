import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TugasPage } from './tugas.page';

const routes: Routes = [
  {
    path: '',
    component: TugasPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TugasPageRoutingModule {}
