import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarModule } from '../../../modules/shared/calendar.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { HeaderRightComponent } from '../../utils/header-right/header-right.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { MenuComponent } from '../../utils/menu/menu.component';

import { ReactiveFormsModule } from '@angular/forms';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import ptbr from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NbDialogService } from '@nebular/theme';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ChangeTemplateService } from '../../../services/change-template.service';
import { FormAgendasComponent } from '../../admin/agendas/form-agendas/form-agendas.component';

@Component({
  selector: 'app-agendas',
  standalone: true,
  imports: [
    SharedModule,
    CalendarModule,
    ReactiveFormsModule,
    HeaderComponent,
    MenuComponent,
    HeaderRightComponent,
    FormAgendasComponent,
  ],
  templateUrl: './agendas.component.html',
  styleUrl: './agendas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChangeTemplateService]
})
export class AgendasComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  public loading: boolean = true;

  constructor(
    private changeService: ChangeTemplateService,
    private dialogService: NbDialogService,
  ) {}

  async ngOnInit() {
    await this.getEvents();
  }

  async getEvents() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      locale: ptbr,
      events: [
        { title: 'event 1', date: '2024-01-26' },
        { title: 'event 2', date: '2024-01-26' },
      ],
      dateClick: this.open.bind(this),
      headerToolbar: {
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      themeSystem: 'bootstrap5',
    };

    this.loading = false;
    this.changeService.detectChange()

  }

  open(arg: any) {
    this.dialogService.open(FormAgendasComponent, {
      context: arg.dateStr,
      autoFocus: true,
      closeOnBackdropClick: true,
    });
  }
}
