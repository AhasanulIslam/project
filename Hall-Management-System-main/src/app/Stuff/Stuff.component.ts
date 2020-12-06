import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Stuff',
  templateUrl: './Stuff.component.html',
  styleUrls: ['./Stuff.component.scss']
})
export class StuffComponent implements OnInit {
  public sections: any;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllsections().subscribe(
      (res) => {
        this.sections = res;
        this.sections.shift();
      }
    );
  }

  onLogOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
