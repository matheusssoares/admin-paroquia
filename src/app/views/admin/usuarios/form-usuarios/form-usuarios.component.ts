import { Component, Optional, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Midia } from '../../../../models/midia.model';
import { Usuarios } from '../../../../models/usuarios.model';
import { SharedModule } from '../../../../modules/shared/shared.module';
import { AuthService } from '../../../../services/auth.service';
import { ChangeTemplateService } from '../../../../services/change-template.service';
import {
  DatabaseService,
  OrderByCondition,
  WhereCondition,
} from '../../../../services/database.service';
import { SubjectService } from '../../../../services/subject.service';
import { InputMidiaComponent } from '../../../utils/input-midia/input-midia.component';

@Component({
  selector: 'app-form-usuarios',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InputMidiaComponent,
    NgxMaskDirective,
  ],
  templateUrl: './form-usuarios.component.html',
  styleUrl: './form-usuarios.component.scss',
  providers: [provideNgxMask(), ChangeTemplateService],
})
export class FormUsuariosComponent {
  subjectChanges = inject(SubjectService);
  loading: boolean = false;
  id!: string;

  public form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    dataNascimento: ['', Validators.required],
    status: [true],
    sexo: ['', [Validators.required]],
    createAt: [new Date()],
    whatsapp: ['', [Validators.required]],
    userUpdate: [new Date()],
    perfil: ['Administrador'],
  });

  typeFile: string = 'image';
  path: string = 'files/image/users';
  midias = [];
  selectMidia!: Midia;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dataService: DatabaseService,
    private changeService: ChangeTemplateService
  ) {}

  async onSubmit() {
    this.loading = true;
    const { email } = this.form.value;
    const orderByConditions: OrderByCondition<Usuarios>[] = [
      { field: 'nome', order: 'asc' },
    ];

    const whereConditions: WhereCondition<Usuarios>[] = [
      {
        field: 'email',
        operator: '==',
        value: email.toLowerCase(),
      },
    ];

    const results = await this.dataService.getItens<Usuarios>('usuarios', {
      orderBy: orderByConditions,
      where: whereConditions,
    });

    if (results.length > 0) {
      this.handleMessage(
        'E-mail já utilizado em outra conta.',
        'Putzzz!',
        'danger'
      );
      return;
    } else {
      try {
        const data: Usuarios = { ...this.form.value };
        data.fotoProfile = this.selectMidia;
        const getId: any = this.selectMidia.id;
        data.fotoProfile.id = getId.id;
        const createAccount = await this.authService.createAccount(
          data.email,
          data.senha
        );
        data.id = createAccount;
        const result = await this.dataService.createData('usuarios', data);
        if (result) {
          this.loading = false;
          this.handleMessage(
            'Conta criada com sucesso.',
            'Parabéns!',
            'success'
          );
          this.subjectChanges.setUpdate('UPDATE_CHANGES');
          this.changeService.detectChange();
          this.close();
        } else {
          this.loading = false;
          this.handleMessage(
            'Tivemos um problema interno',
            'Putzzz!',
            'danger'
          );
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
        this.handleMessage('Tivemos um problema interno', 'Putzzz!', 'danger');
      }
    }
  }

  private handleMessage(text: string, title: string, status: string) {
    this.changeService.showToastr(text, title, { status });
  }

  selectFile(event: Midia) {
    this.selectMidia = event;
  }

  close() {
    this.dialogRef.close();
  }
}
