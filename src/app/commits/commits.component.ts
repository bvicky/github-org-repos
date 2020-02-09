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

  ngOnInit(): void {
   const owner =  this.route.snapshot.paramMap.get('owner');
   const name =  this.route.snapshot.paramMap.get('name');
   this.repoService.getLatestCommits(owner, name).then(data => {
     this.repoCommits = data;
   });
   this.company = owner;


  }

}
