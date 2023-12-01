import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TugasPageRoutingModule } from './tugas-routing.module';

import { TugasPage } from './tugas.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TugasPageRoutingModule],
  declarations: [TugasPage],
})
export class TugasPageModule {}
