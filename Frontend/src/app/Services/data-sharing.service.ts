import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private static searchByWordSubject: Subject<string> = new Subject<string>();
  static searchByWord$ = DataSharingService.searchByWordSubject.asObservable();

  private static productByCategorySubject: Subject<string> = new Subject<string>();
  static productByCategory$ = DataSharingService.productByCategorySubject.asObservable();

  private static viewdetailsSubject: Subject<string> = new Subject<string>();
  static viewdetails$ = DataSharingService.viewdetailsSubject.asObservable();

  static updateSearchByWord(word: string) {
    DataSharingService.searchByWordSubject.next(word);
  }

  static updateProductByCategory(category: string) {
    DataSharingService.productByCategorySubject.next(category);
  }

  static updateviewdetails(viewdetails: string) {
    DataSharingService.viewdetailsSubject.next(viewdetails);
  }
}

