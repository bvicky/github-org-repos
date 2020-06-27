# About

Built an interactive UI to display a list of an arbitrary user-specified organization's GitHub projects ranked by meaningful metrics.

# GithubOrg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Install the Dependencies
Run `npm install` to run the dependcies for the project

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

##List of Manual Tests
  - Search 
    - Searching for any other org would not let you render results on the page or if the field is empty
    - Entering an invalid organization will give a response that the org name was incorrect.
  - Sorting & Results
     - Searching for any other org would not let you render results on the page or if the field is empty
     - Entering an invalid organization will give a response that the org name was incorrect.
     - If any invalid search param would result in displaying the data based on score 
  - View Commits
     - If the repo has no commits then it displays no commits found
     - Results are sorted based on the latest commit
     - If there is a 404 then it redirects to the error page
       
  
