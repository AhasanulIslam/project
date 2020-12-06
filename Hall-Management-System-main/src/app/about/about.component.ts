import { SectionsService } from './../services/sections.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'ABOUT US';
  // tslint:disable-next-line: max-line-length
  description = 'Streams Tech Ltd. is a software development company providing full-cycle software engineering, custom application development and system integration services. Our business goal is to help our clients meet their software development needs on time and within a budget, while exceeding quality requirements.';
  logo = 'https://thefinancialexpress.com.bd/uploads/1591158383.jpg';
  constructor( private section: SectionsService) { }

  ngOnInit() {
    this.section.getSections().subscribe(
      (data) => {
        this.title = data[0].Title;
        this.description = data[0].SectionDescription;
        // this.logo = data[0].ImagePath;
      }
    );
  }

}
