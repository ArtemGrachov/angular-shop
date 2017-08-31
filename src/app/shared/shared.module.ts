import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { SortPipe } from './pipes/sort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { TextPipe } from './pipes/text.pipe';

import { PreloaderDirective } from './directives/preloader.directive';

@NgModule({
  declarations: [
    SortPipe,
    SearchPipe,
    TextPipe,
    PreloaderDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MyDatePickerModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MyDatePickerModule,
    SortPipe,
    SearchPipe,
    TextPipe,
    PreloaderDirective
  ]
})
export class SharedModule { }
