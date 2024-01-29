import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../modules/shared/shared.module';
import { HeaderRightComponent } from '../../utils/header-right/header-right.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { MenuComponent } from '../../utils/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, HeaderComponent, MenuComponent, HeaderRightComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
