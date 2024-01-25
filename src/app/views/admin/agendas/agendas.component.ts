import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CalendarModule } from '../../../modules/shared/calendar.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { HeaderRightComponent } from '../../utils/header-right/header-right.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { MenuComponent } from '../../utils/menu/menu.component';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import ptbr from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import { format, parse } from 'date-fns';
import { Agenda } from '../../../models/agenda.model';
import { ColorsModule } from '../../../modules/shared/colors.module';
import { ChangeTemplateService } from '../../../services/change-template.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-agendas',
  standalone: true,
  imports: [
    SharedModule,
    CalendarModule,
    ColorsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MenuComponent,
    HeaderRightComponent,
  ],
  templateUrl: './agendas.component.html',
  styleUrl: './agendas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendasComponent implements OnInit {
  private dialogRef!: NbDialogRef<any>;
  @ViewChild(TemplateRef) dialog: any;
  dateCurr = Date.now();
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
    locale: ptbr,
    events: [
      { title: 'event 1', date: '2024-01-26' },
      { title: 'event 2', date: '2024-01-24' },
    ],
    dateClick: this.open.bind(this),
    headerToolbar: {
      start: 'today prev,next',
      center: 'title',
      end: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    themeSystem: 'bootstrap5',
  };
  public dataCompleta = parse(
    format(new Date(), 'dd/MM/yyyy HH:mm'),
    'dd/MM/yyyy HH:mm',
    new Date()
  );
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    isPublic: [true, [Validators.required]],
    allDay: [true, [Validators.required]],
    repeat: [0, [Validators.required]],
    startDateTime: ['', [Validators.required]],
    endDateTime: [''],
    backgroundColor: [''],
    locale: [''],
    description: [''],
  });
  public loading: boolean = false;

  constructor(
    private changeService: ChangeTemplateService,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    //this.changeService.detectChange();
  }

  open(arg: any) {
    this.dialogRef = this.dialogService.open(this.dialog, {
      context: 'this is some additional data passed to dialog' + arg.dateStr,
      autoFocus: true,
      closeOnBackdropClick: true,
    });
  }

  async onSubmit() {
    this.loading = true;
    const data: Agenda = {
      allDay: this.form.value.allDay,
      backgroundColor: this.form.value.backgroundColor,
      description: this.form.value.description,
      endDateTime: this.form.value.allDay ? null : this.form.value.endDateTime,
      isPublic: this.form.value.isPublic,
      repeat: this.form.value.repeat,
      startDateTime: this.form.value.startDateTime,
      title: this.form.value.title,
      address: this.form.value.locale,
      id: null,
    };

    try {
      //const result = await this.databaseService.createData('agendas', data);
      this.loading = false;
      this.changeService.detectChange();
      this.changeService.showToastr('Evento criado com sucesso.', 'Parabéns!', {
        status: 'success',
      });
      /* if (result) {
        this.loading = false;
        this.changeService.detectChange();
        if (this.dialogRef) {
          this.dialogRef.close();
        }

        setTimeout(() => {
          
        }, 1500);
      } */
    } catch (error) {
      console.log(error);
    }
  }
}
