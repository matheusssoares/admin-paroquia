import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Midia } from '../../../../models/midia.model';
import { SharedModule } from '../../../../modules/shared/shared.module';
import { InputMidiaComponent } from '../../../utils/input-midia/input-midia.component';

@Component({
  selector: 'app-form-noticias',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CKEditorModule,
    InputMidiaComponent,
  ],
  templateUrl: './form-noticias.component.html',
  styleUrl: './form-noticias.component.scss',
})
export class FormNoticiasComponent {
  loading: boolean = false;
  title!: string;
  id!: string;
  public form: FormGroup = this.fb.group({
    author: [''],
    category: ['', [Validators.required]],
    like: [0],
    sendNotification: [false],
    shared: [0],
    status: [true],
    title: ['', [Validators.required]],
    views: [0],
    createAt: [new Date()],
    description: ['', [Validators.required]],
  });
  typeFile: string = 'image';
  path: string = 'files/image/news';
  midias = [];
  selectMidia!: Midia;
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Descreva sua notícia...',
  };

  defaultImage: string = 'assets/imgs/lazy-image.png';

  constructor(private fb: FormBuilder) {}

  public onReady(editor: any) {
    console.log('CKEditor5 Angular Component is ready to use!', editor);
  }

  onSubmit() {}

  selectFile(event: Midia) {
    this.selectMidia = event;
  }
}
