import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'github-org';
  repos: any[] = [];
  commits = [];
  org = '';
 constructor(private http: HttpClient) {
   // this.callGitHubOrgApi();
 }


  async callGitHubOrgApi() {
    this.org = 'netflix';

    const url = 'https://api.github.com/search/repositories?q=org:netflix&sort=stars&order=desc&per_page=1';

    const headers = {
      Accept: 'application/vnd.github.nebula-preview+json'
    };

    const reqParams = {
      method: 'GET',
      headers,
    };
    const response = await fetch(url, reqParams);
    const headerLink = response.headers.get('link');
    const {total_count, items} = await response.json();
    this.repos = items;

    // const {total_count, items} = await this.http.get(
    // `https://api.github.com/search/repositories?q=org:netflix&sort=updated&order=desc&per_page=100`, {headers}).toPromise() as any;
    // this.repos = items;

  }
}
