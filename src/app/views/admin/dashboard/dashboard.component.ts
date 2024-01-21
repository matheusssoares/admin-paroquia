import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../../services/change-template.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
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
