import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-invalid-access',
  templateUrl: './invalid-access.component.html',
  styleUrls: ['./invalid-access.component.scss']
})
export class InvalidAccessComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.stop();
  }

}
