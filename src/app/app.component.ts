import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { ChangeTemplateService } from './services/change-template.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ChangeTemplateService
  ]
})
export class AppComponent implements OnInit {

  constructor(
  ) {}
  ngOnInit(): void {
  }

  
}