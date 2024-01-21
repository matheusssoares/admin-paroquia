import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbSidebarModule,
  NbButtonModule,
  NbCardModule,
  NbFocusMonitor,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutModule,
  NbStatusService,
  NbThemeModule,
  NbThemeService,
  NbSidebarService,
  NbIconModule,
  NbIconLibraries,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
    NbEvaIconsModule
  ],
  providers: [
    NbThemeService,
    NbStatusService,
    NbFocusMonitor,
    NbSidebarService,
  ],
})
export class SharedModule {}
