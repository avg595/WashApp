import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {
  
  userSessionType: string = sessionStorage.getItem('type');

  constructor(private router: Router) {

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userSessionType === 'customer') {
      return true;
    } else if (this.userSessionType === null){
      this.router.navigate(['/login'])
      return false;
    } else {
      this.router.navigate(['/home'])
      return false;
    }
  }
  
}