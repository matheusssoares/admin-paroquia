import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
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
  NbToastrModule,
  NbToastrService,
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
    NbSpinnerModule,
    NbToastrModule.forRoot({}),
    NbDialogModule.forRoot({})
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
    NbSpinnerModule,
    NbToastrModule,
    NbDialogModule
  ],
  providers: [
    NbThemeService,
    NbStatusService,
    NbFocusMonitor,
    NbSidebarService,
    NbToastrService
  ],
})
export class SharedModule {}
