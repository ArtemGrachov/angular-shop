import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SortPipe } from './pipes/sort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { TextPipe } from './pipes/text.pipe';

@NgModule({
  declarations: [
    SortPipe,
    SearchPipe,
    TextPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SortPipe,
    SearchPipe,
    TextPipe
  ]
})
export class SharedModule { }
