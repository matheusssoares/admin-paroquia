import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Agenda } from '../../../../models/agenda.model';
import { ColorsModule } from '../../../../modules/shared/colors.module';
import { SharedModule } from '../../../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../../../services/change-template.service';
import { DatabaseService } from '../../../../services/database.service';
import { SubjectService } from '../../../../services/subject.service';

@Component({
  selector: 'app-form-agendas',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, ColorsModule],
  templateUrl: './form-agendas.component.html',
  styleUrl: './form-agendas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChangeTemplateService],
})
export class FormAgendasComponent implements OnInit {
  dataSelecionada!: string;
  id!: string;
  loading: boolean = false;
  subjectChanges = inject(SubjectService);
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

  constructor(
    private databaseService: DatabaseService,
    private fb: FormBuilder,
    private changeService: ChangeTemplateService,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.buildForm();
    }
  }

  secondsToDate(seconds: number): Date | null {
    if (isNaN(seconds) || seconds < 0) {
      return null;
    }

    const milliseconds = seconds * 1000;
    return new Date(milliseconds);
  }

  async buildForm() {
    try {
      const results = await this.databaseService.getDataById<Agenda>(
        'agendas',
        this.id
      );

      this.dataSelecionada = results?.dateSelect
        ? results.dateSelect
        : this.dataSelecionada;
      const verify: any = results;

      const secondsStart = verify.startDateTime.seconds;
      const dateValueStart = this.secondsToDate(secondsStart);

      const secondsEnd = verify.endDateTime ? verify.endDateTime.seconds : null;
      const dateValueEnd = this.secondsToDate(secondsEnd);

      this.form.patchValue({
        title: results?.title,
        isPublic: results?.isPublic,
        repeat: results?.repeat,
        allDay: results?.allDay,
        startDateTime: dateValueStart instanceof Date ? dateValueStart : null,
        endDateTime: dateValueEnd instanceof Date ? dateValueEnd : null,
        backgroundColor: results?.backgroundColor,
        locale: results?.address,
        description: results?.description,
      });
    } catch (err) {
      console.warn(err);
    }
  }

  async onSubmit() {
    this.loading = true;

    const data: Agenda = this.createAgendaData();

    try {
      const result = this.id
        ? await this.databaseService.updateData<Agenda>(
            'agendas',
            this.id,
            data
          )
        : await this.databaseService.createData<Agenda>('agendas', data);

      if (result) {
        this.subjectChanges.setUpdate('UPDATE_CHANGES');
        const message: string = this.id
          ? `Evento atualizado com sucesso!`
          : `Evento criado com sucesso!`;
        this.handleMessage(message, 'Parabéns!', 'success');
        this.changeService.detectChange();
        this.close();
      }
    } catch (error) {
      console.log(error);

      this.handleMessage(
        'Tivemos um problema interno, desculpe',
        'Putzzz!',
        'danger'
      );
    } finally {
      this.loading = false;
      this.changeService.detectChange();
      this.close();
    }
  }

  private createAgendaData(): Agenda {
    const { value } = this.form;

    return {
      allDay: value.allDay,
      backgroundColor: value.backgroundColor,
      description: value.description,
      endDateTime: value.allDay ? null : value.endDateTime,
      isPublic: value.isPublic,
      repeat: value.repeat,
      startDateTime: value.startDateTime,
      title: value.title,
      address: value.locale,
      id: this.id ? this.id : undefined,
      dateSelect: this.dataSelecionada,
    };
  }

  private handleMessage(text: string, title: string, status: string) {
    this.changeService.showToastr(text, title, { status });
  }

  close() {
    this.dialogRef.close()
    this.subjectChanges.setUpdate('CLOSE_MODAL');
  }

  remove(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      closeOnEsc: true,
    });
  }

  async yes() {
    try {
      const result = await this.databaseService.deleteData('agendas', this.id);

      if (result) {
        this.subjectChanges.setUpdate('UPDATE_CHANGES');

        this.handleMessage(
          'Evento excluído com sucesso!',
          'Parabéns!',
          'success'
        );

        this.changeService.detectChange();

        this.dialogRef.close();
      }
    } catch (err) {
      console.log(err);

      this.handleMessage(
        'Tivemos um problema interno, desculpe',
        'Putzzz!',
        'danger'
      );
    }
  }
}
