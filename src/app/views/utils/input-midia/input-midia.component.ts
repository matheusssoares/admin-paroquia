import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Subscription } from 'rxjs';
import { FileUpload, Midia } from '../../../models/midia.model';
import { SharedModule } from '../../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../../services/change-template.service';
import {
  DatabaseService,
  OrderByCondition,
  WhereCondition,
} from '../../../services/database.service';
import { StorageService } from '../../../services/storage.service';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-input-midia',
  standalone: true,
  imports: [SharedModule, LazyLoadImageModule],
  templateUrl: './input-midia.component.html',
  styleUrl: './input-midia.component.scss',
  providers: [ChangeTemplateService],
})
export class InputMidiaComponent implements OnInit, OnDestroy {
  @Input() typeFile: string = 'image';
  @Input() path: string = 'file/images/';
  @Input() midias: any = [];
  @Input() arquivo!: Midia | undefined;
  @Output() selectFiles = new EventEmitter<Midia>();

  @ViewChild('fileInput') fileInput!: ElementRef;
  accepts: string = this.typeFile === 'image' ? '.jpg, .jpeg, .png' : '*';
  nameFile: string = '';
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  subjectChanges = inject(SubjectService);
  subscriptions: Array<Subscription> = [];
  public modalConfirmDelete!: NbDialogRef<any>;
  public modalPrincipal!: NbDialogRef<any>;
  defaultImage: string = 'assets/imgs/lazy-image.png';
  loadingCard: boolean = false;
  loading: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private dialogService: NbDialogService,
    private storageService: StorageService,
    private changeService: ChangeTemplateService
  ) {}

  ngOnInit(): void {
    this.initialize();

    const sub = this.subjectChanges.getSubject().subscribe((value) => {
      if (value === 'UPDATE_FILES') {
        this.initialize();
      }
    });

    this.subscriptions.push(sub);
  }

  async initialize() {
    const orderByConditions: OrderByCondition<Midia>[] = [
      { field: 'timestamp', order: 'desc' },
    ];

    const whereConditions: WhereCondition<Midia>[] = [];

    const results = await this.databaseService.getItens<Midia>('files', {
      orderBy: orderByConditions,
      where: whereConditions,
    });

    this.midias = results;
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  openFile(event: any) {
    this.selectedFiles = event.target.files;
    this.nameFile = event.target.files[0].name;
  }

  open(dialog: TemplateRef<any>) {
   this.modalPrincipal = this.dialogService.open(dialog, {
      context: 'this is some additional data passed to dialog',
    });
  }

  async upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        try {
          this.loadingCard = true;
          const upload = await this.storageService.pushFileToStorage(
            this.currentFileUpload,
            this.path
          );

          if (upload) {
            const result = await this.databaseService.createData<Midia>(
              'files',
              upload
            );

            if (result) {
              this.subjectChanges.setUpdate('UPDATE_FILES');
              this.nameFile = '';
              this.loadingCard = false;
            }
          }
        } catch (err) {
          this.loadingCard = false;
          this.handleMessage(
            'Não conseguimos fazer upload do arquivo.',
            'Putzzz!',
            'danger'
          );
        }
      }
    }
  }

  private handleMessage(text: string, title: string, status: string) {
    this.changeService.showToastr(text, title, { status });
  }

  public deleteFile(file: Midia, context: TemplateRef<any>) {
    this.modalConfirmDelete = this.dialogService.open(context, {
      context: file,
    });
  }

  async confirmDelete(data: any) {
    console.log(data.id.id);
    this.loading = true;

    try {
      const deleteFile = await this.storageService.deleteFile(data.path);
      if (deleteFile) {
        const deleteData = await this.databaseService.deleteData(
          'files',
          data.id.id
        );
        if (deleteData) {
          this.handleMessage(
            'Arquivo excluído com sucesso!',
            'Parabéns!',
            'success'
          );

          this.changeService.detectChange();
          this.subjectChanges.setUpdate('UPDATE_FILES');
          this.loading = false;
          this.closeDialog();
        }
      }
    } catch (err) {
      this.loading = false;
      this.handleMessage(
        'Tivemos um problema interno, desculpe',
        'Putzzz!',
        'danger'
      );
      console.log(err);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.modalConfirmDelete.close();
  }

  changeSelectFiles(item: Midia) {
    this.selectFiles.emit(item);
    this.modalPrincipal.close()
  }

  removerSelect() {
    this.selectFiles.emit(undefined)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((a) => a.unsubscribe());
  }
}
