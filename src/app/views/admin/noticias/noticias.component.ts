import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SharedModule } from '../../../modules/shared/shared.module';
import { FormNoticiasComponent } from './form-noticias/form-noticias.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
  constructor(
    private dialogService: NbDialogService,
  ) {

  }

  news() {
    this.dialogService.open(FormNoticiasComponent, {
      context: {
        title: 'Adicionar notícias',
      },
      autoFocus: true,
      closeOnBackdropClick: true,
    });
  }

}
