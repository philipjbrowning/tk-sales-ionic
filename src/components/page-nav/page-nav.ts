import {Component, Input} from '@angular/core';

/**
 * Generated class for the PageNavComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'page-nav',
  templateUrl: 'page-nav.html'
})
export class PageNavComponent {
  @Input() title: string;
  @Input() loading: string;

  constructor() {
    console.log('Hello PageNavComponent Component');
  }
  
  loadRemoteData(): void {
  
  }

}
