import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
import {Assets} from './Assets.enum';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  repos = [];
  totalRepoCount = 0;
  orgName = '';
  org: BehaviorSubject<string>;
  commits = [];
  pagination = {};
  setOrganizationName(organization) {
    this.org.next(organization);
  }

  constructor(private router: Router) {
    this.org = new BehaviorSubject(this.orgName);
  }

  async searchOrganizationRepository({sort, order}) {
    const url = `https://api.github.com/search/repositories?q=org:${this.orgName}&sort=${sort}&order=${order}`;
    const headers = {
      Accept: 'application/vnd.github.nebula-preview+json'
    };

    const reqParams = {
      method: 'GET',
      headers,
    };
    const response = await fetch(url, reqParams);

    this.getPagination(response);
    const {total_count, items} = await response.json();
    this.repos = items;
    this.totalRepoCount = total_count;
    return this.repos;
  }


  async getLatestCommits(owner, name) {
    const url = `https://api.github.com/repos/${owner}/${name}/commits`;

    const headers = {
      Accept: 'application/vnd.github.nebula-preview+json'
    };

    const reqParams = {
      method: 'GET',
      headers,
    };
    const response = await fetch(url, reqParams);
    this.redirectToError(response);
    if (Object.keys(response.headers).length !== 0) {
      this.getPagination(response);
    }
    const result = await response.json();
    this.commits = result;
    return this.commits;
  }
  redirectToError(response) {
    if (response.status === 404) {
      this.router.navigate(['/error']);
    }
    return;
  }

  async getByName({sort, direction}) {
    const url = `https://api.github.com/orgs/${this.orgName}/repos?sort=${sort}&direction=${direction}`;

    const headers = {
      Accept: 'application/vnd.github.nebula-preview+json'
    };

    const reqParams = {
      method: 'GET',
      headers,
    };
    const response = await fetch(url, reqParams);
    this.redirectToError(response);
    if (Object.keys(response.headers).length !== 0) {
      this.getPagination(response);
    }
    const result = await response.json();
    this.repos = result;
    return this.repos;
  }

  getPagination(response) {
    const links = response.headers.get('link').split(',');
    const urls = links.map(result => {
        return {
          url: result.split(';')[0].replace('>', '').replace('<', ''),
          title: result.split(';')[1].split('=')[1].replace(
            '"' , '').replace('"' , '')
        };
      });
    this.pagination = urls;
  }

  async performPaginationRequests({url, filter}) {
    const paginatedUrl = url;

    const headers = {
      Accept: 'application/vnd.github.nebula-preview+json'
    };

    const reqParams = {
      method: 'GET',
      headers,
    };

    const response = await fetch(paginatedUrl, reqParams);
    this.redirectToError(response);
    if (Object.keys(response.headers).length !== 0) {
      this.getPagination(response);
    }

    if (filter === Assets.FullName) {
      const result = await response.json();
      this.repos = result;
    } else {
      const {total_count, items} = await response.json();
      this.repos = items;
      this.totalRepoCount = total_count;
    }

    return this.repos;
  }
}
