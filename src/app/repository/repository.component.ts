import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../repository.service';
import {Assets} from '../Assets.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  repositories = [];
  repositoriesCount = 0;
  asset = Assets;
  filterOption = Assets.FullName;
  sortOrder = Assets.Descending;
  showDescending = true;
  paginated = {}

  constructor(private router: Router,
              private repoService: RepositoryService) {
    this.getRepoData();
  }

  getRepoData() {
    this.repositories =  this.repoService.repos;
    this.repositoriesCount = this.repoService.totalRepoCount;
    this.paginated = this.repoService.pagination;
  }


  ngOnInit(): void {
    if (this.repoService.repos.length === 0 ) {
      this.router.navigate(['/']);
    }
  }

  async filterResults() {
    let params = {};
    switch (this.filterOption) {
      case Assets.Updated:
        params = {
          sort: Assets.Updated,
          order: this.sortOrder,
        };
        await this.repoService.searchOrganizationRepository(params as any);
        this.getRepoData();
        return;
      case Assets.FullName:
        params = {
          sort: Assets.FullName,
          direction: this.sortOrder,
        };
        await this.repoService.getByName(params as any);
        this.getRepoData();
        return;
      case Assets.Stars:
        params = {
          sort: Assets.Stars,
          order: this.sortOrder,
        };
        await this.repoService.searchOrganizationRepository(params as any);
        this.getRepoData();
        return;
      case Assets.Forks:
        params = {
          sort: Assets.Forks,
          order: this.sortOrder,
        };
        await this.repoService.searchOrganizationRepository(params as any);
        this.getRepoData();
        return;
      default:
        params = {
          sort: Assets.Updated,
          order: this.sortOrder,
        };
        await this.repoService.searchOrganizationRepository(params as any);
        this.getRepoData();
        return;
    }
  }

  toggleSortDirection() {
    this.showDescending = !this.showDescending;
    this.showDescending ? this.sortOrder = Assets.Descending : this.sortOrder = Assets.Ascending;
    this.filterResults();
  }

  redirectToCommits(repo) {
    this.router.navigate(['/commits', {owner: repo.owner.login, name: repo.name}]);
  }

  async performPagination(url) {
    await this.repoService.performPaginationRequests({url, filter: this.filterOption });
    this.getRepoData();
  }

}
