import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RepositoryService} from '../repository.service';
import {Assets} from '../Assets.enum';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  organization = '';
  repos: [] = [];
  searchEnabled = false;

  constructor(private router: Router,
              public repoService: RepositoryService) { }

  ngOnInit(): void {
    this.repoService.org.subscribe(orgz => {
      this.organization = orgz ;
    });
  }

   async searchOrg() {
    this.searchEnabled = true;
    this.repoService.totalRepoCount = 0;
    this.repoService.setOrganizationName(this.organization);

    const params = {
       sort: Assets.FullName,
       direction: Assets.Descending,
     };
    if (this.repoService.orgName.length > 0) {
      const result = await this.repoService.getByName(params);
      if (result) {
        this.router.navigate(['/repos']);
      } else {
        this.router.navigate(['/error']);
      }
    }
  }

}
