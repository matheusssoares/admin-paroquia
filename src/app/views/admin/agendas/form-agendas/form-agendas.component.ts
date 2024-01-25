import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Agenda } from '../../../../models/agenda.model';
import { ColorsModule } from '../../../../modules/shared/colors.module';
import { SharedModule } from '../../../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../../../services/change-template.service';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-form-agendas',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, ColorsModule],
  templateUrl: './form-agendas.component.html',
  styleUrl: './form-agendas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChangeTemplateService],
})
export class FormAgendasComponent {
  loading: boolean = false;
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
    protected dialogRef: NbDialogRef<any>
  ) {}

  async onSubmit() {
    this.loading = true;

    const data: Agenda = this.createAgendaData();

    try {
      const result = await this.databaseService.createData('agendas', data);

      if (result) {
        this.handleMessage(
          'Evento criado com sucesso.',
          'Parabéns!',
          'success'
        );
      }
    } catch (error) {
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
      id: null,
    };
  }

  private handleMessage(text: string, title: string, status: string) {
    //this.changeService.showToastr(text, title, { status });
  }

  close() {
    this.dialogRef.close();
  }
}
