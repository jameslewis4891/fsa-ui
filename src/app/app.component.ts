import { Component } from '@angular/core';
import { FSAService } from './services/fsa.service';
import { IRatingPercentage } from './interfaces/IRatingPercentage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fsa-ui';

  authorities = [];
  displayedColumns = ['rating', 'percentage'];
  ratingPercentages: IRatingPercentage[];
  selectedAuthorityId;

  loading: boolean;
  dataLoaded: boolean;

  constructor(private fsaService: FSAService) {
    this.loading = false;
    this.dataLoaded = false;
    fsaService.getAuthorities().subscribe(response => {
      this.authorities = response.authorities;
    });
  }

  authorityChanged(event: any) {
    this.dataLoaded = false;
    this.loading = true;
    this.fsaService.getRatingPercentages(event.value).subscribe(response => {
      this.loading = false;
      this.ratingPercentages = response;
      this.dataLoaded = true;
    });
  }

}
