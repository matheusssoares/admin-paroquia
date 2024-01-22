import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbFocusMonitor,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbStatusService,
  NbThemeModule,
  NbThemeService,
} from '@nebular/theme';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbSidebarModule,
    NbButtonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbSpinnerModule
  ],
  exports: [
    NbSidebarModule,
    NbButtonModule,
    NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule,
    NbSpinnerModule
  ],
  providers: [
    NbThemeService,
    NbStatusService,
    NbFocusMonitor,
    NbSidebarService,
  ],
})
export class SharedModule {}
