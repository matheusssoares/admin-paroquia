import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarModule } from '../../../modules/shared/calendar.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { HeaderRightComponent } from '../../utils/header-right/header-right.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { MenuComponent } from '../../utils/menu/menu.component';

import { ReactiveFormsModule } from '@angular/forms';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import {
  CalendarOptions,
  EventInput,
  EventSourceInput,
} from '@fullcalendar/core';
import ptbr from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { NbDialogService } from '@nebular/theme';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { AGENDA_REPETICOES, Agenda } from '../../../models/agenda.model';
import { ChangeTemplateService } from '../../../services/change-template.service';
import {
  DatabaseService,
  OrderByCondition,
  WhereCondition,
} from '../../../services/database.service';
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
  providers: [ChangeTemplateService, DatabaseService],
})
export class AgendasComponent implements OnInit, OnDestroy {
  calendarOptions!: CalendarOptions;
  public loading: boolean = true;
  subject: Array<Subscription> = [];
  public events: any = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private changeService: ChangeTemplateService,
    private dialogService: NbDialogService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.initialize();
    this.subscription.add(
      this.changeService.meuDado$.subscribe((novoValor) => {
        console.log('updated', novoValor);
        if (novoValor == 'updateChanges2') {
          //this.events = await this.getEvents();
        }
      })
    );
    /* this.events = await this.getEvents();
    await this.getConfigCalendar();
 */
    this.loading = false;
  }

  async initialize() {
    console.log('initialize');

    this.events = await this.getEvents();
    await this.getConfigCalendar();
  }

  async getConfigCalendar() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [
        rrulePlugin,
        dayGridPlugin,
        interactionPlugin,
        bootstrap5Plugin,
      ],
      locale: ptbr,
      events: this.events,
      dateClick: this.open.bind(this),
      headerToolbar: {
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      themeSystem: 'bootstrap5',
      firstDay: 0,
      displayEventTime: false,
    };

    this.loading = false;
    this.changeService.detectChange();
  }

  open(arg: any) {
    this.dialogService.open(FormAgendasComponent, {
      context: {
        dataSelecionada: arg.dateStr,
      },
      autoFocus: true,
      closeOnBackdropClick: true,
    });
  }

  async getEvents(): Promise<EventSourceInput> {
    return new Promise(async (resolve, rejetc) => {
      const orderByConditions: OrderByCondition<Agenda>[] = [
        { field: 'title', order: 'asc' },
      ];

      const whereConditions: WhereCondition<Agenda>[] = [];

      const results = await this.databaseService.getItens<Agenda>('agendas', {
        orderBy: orderByConditions,
        where: whereConditions,
      });

      if (results.length == 0) resolve({});

      const eventNew: Array<EventInput> = [];

      results?.forEach((agenda: Agenda) => {
        let freq;
        let interval;

        if (agenda.repeat != AGENDA_REPETICOES.NAO_REPETIR) {
          switch (agenda.repeat) {
            case AGENDA_REPETICOES.TODO_DIA:
              freq = 'daily';
              interval = 1;
              break;
            case AGENDA_REPETICOES.TODA_SEMANA:
              freq = 'weekly';
              interval = 1;
              break;
            case AGENDA_REPETICOES.TODA_QUINZENA:
              freq = 'weekly';
              interval = 2;
              break;
            case AGENDA_REPETICOES.TODO_MES:
              freq = 'monthly';
              interval = 1;
              break;
            case AGENDA_REPETICOES.TODO_ANO:
              freq = 'yearly';
              interval = 1;
              break;
            default:
              freq = undefined;
              interval = 1;
          }
        }
        const startDateTime: any = agenda.startDateTime;
        const startDateTime2 = new Date(startDateTime.seconds * 1000);
        eventNew.push({
          title: `${agenda.title} - ${format(startDateTime2, 'HH:mm')}`,
          date: agenda.dateSelect,
          backgroundColor: agenda.backgroundColor,
          allDay: agenda.allDay,
          ...(agenda.repeat !== AGENDA_REPETICOES.NAO_REPETIR && {
            rrule: {
              freq,
              interval,
              dtstart: agenda.dateSelect,
            },
          }),
        });
      });

      if (results.length === eventNew.length) {
        resolve(eventNew);
      }
    });
  }

  ngOnDestroy(): void {
    this.subject.forEach((a) => a.unsubscribe());
  }

  test() {
    this.changeService.updateEvent('updateChanges2');
  }
}
