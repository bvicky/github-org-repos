import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {RepositoryService} from '../repository.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  company = '';
  repoCommits = [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private repoService: RepositoryService) {
  }

  async ngOnInit(): Promise<any> {
   const owner =  this.route.snapshot.paramMap.get('owner');
   const name =  this.route.snapshot.paramMap.get('name');
   const repoCommitsData = await this.repoService.getLatestCommits(owner, name);
   this.repoCommits = repoCommitsData as any;
   this.company = owner;
  }

  navigateToRepo() {
    this.router.navigate(['/repos']);
  }

}
