import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../../services/change-template.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { MenuComponent } from '../../utils/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, HeaderComponent, MenuComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(
    private changeService: ChangeTemplateService
  ) {

  }

  ngOnInit(): void {
      this.changeService.getChangeTemplate().subscribe(data => {
        console.log('dashboard:', data);
        
      })
  }
  
}
