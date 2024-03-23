import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Usuarios } from '../../../models/usuarios.model';
import { PrimeNgModule } from '../../../modules/shared/primeng.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../../services/change-template.service';
import {
  DatabaseService,
  OrderByCondition,
  WhereCondition,
} from '../../../services/database.service';
import { SubjectService } from '../../../services/subject.service';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  providers: [ChangeTemplateService],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  items: Array<Usuarios> = [];
  subscription: Array<Subscription> = [];
  public subjectChanges = inject(SubjectService);
  constructor(
    private dialogService: NbDialogService,
    private changeService: ChangeTemplateService,
    private dataService: DatabaseService
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.getData();
    const sub = this.subjectChanges.getSubject().subscribe((value: string) => {
      if (value === 'UPDATE_CHANGES') {
        this.getData();
      }
    });

    this.subscription.push(sub);
  }

  async getData() {
    const orderByConditions: OrderByCondition<Usuarios>[] = [
      { field: 'nome', order: 'asc' },
    ];

    const whereConditions: WhereCondition<Usuarios>[] = [];

    const results = await this.dataService.getItens<Usuarios>('usuarios', {
      orderBy: orderByConditions,
      where: whereConditions,
    });

    this.items = results;

    this.loading = false;
  }

  create() {
    this.dialogService.open(FormUsuariosComponent, {
      autoFocus: true,
      closeOnBackdropClick: true,
      hasScroll: true,
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((a) => a.unsubscribe());
  }
}
