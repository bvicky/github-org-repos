import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {FormsModule} from '@angular/forms';
import {RepositoryComponent} from './repository/repository.component';
import {RepositoryService} from './repository.service';
import { ErrorComponent } from './error/error.component';
import { CommitsComponent } from './commits/commits.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RepositoryComponent,
    ErrorComponent,
    CommitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
