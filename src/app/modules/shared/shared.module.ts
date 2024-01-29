import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFocusMonitor,
  NbFormFieldModule,
  NbGlobalPhysicalPosition,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbNativeDateService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbStatusService,
  NbThemeModule,
  NbThemeService,
  NbTimepickerModule,
  NbToastrModule,
  NbToastrService
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
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      duration: 3000
    }),
    NbDialogModule.forRoot({}),
    NbSelectModule,
    NbTimepickerModule.forRoot()
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
    NbDialogModule,
    NbSelectModule,
    NbTimepickerModule
  ],
  providers: [
    NbThemeService,
    NbStatusService,
    NbFocusMonitor,
    NbSidebarService,
    NbToastrService,
    NbNativeDateService
  ],
})
export class SharedModule {}
