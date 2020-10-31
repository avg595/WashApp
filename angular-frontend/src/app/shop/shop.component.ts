import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  userSessionId: any = sessionStorage.getItem('id');
  constructor() { }

  ngOnInit(): void {
    
  }

}
