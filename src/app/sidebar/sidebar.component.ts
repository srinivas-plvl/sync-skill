import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ModalService } from 'ng2-modal-dialog/modal.module';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeModelComponent } from '../employee-model/employee-model.component';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private shown: string = 'EQUIFAX';

  constructor(
     private modalService: ModalService,
      private profileService: ProfileService,
private router: Router
  ) { }

  ngOnInit() {
  }

  openEmployeeModal(empDetails): void {
    this.modalService.create(AppModule, EmployeeModelComponent, { empDetails });
  }
  
  
}
