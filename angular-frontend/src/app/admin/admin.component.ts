import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem('reload') === 'no reload') {
      location.reload();
      sessionStorage.removeItem('reload');
    }
  }

}
