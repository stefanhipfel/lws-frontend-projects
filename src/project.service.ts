import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from './project';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

  private projectsUrl = 'api/projects';  // URL to web api
  public busyIndicator  = new ReplaySubject<boolean>();

  constructor(
    private http: HttpClient) { }

  /** GET projects from the server */
  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(projects => this.log(`fetched projects`)),
        catchError(this.handleError('getprojects', []))
      );
      /*
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next([{id: '1', title: 'myTitle'}, {id: '2', title: 'myTitle2'}, {id: '3', title: 'myTitle3'}]);
          console.log('am done');
          observer.complete();
        }, 2000);
      });
      */
  }

  /** GET Project by id. Return `undefined` when id not found */
  getProjectNo404<Data>(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/?id=${id}`;
    return this.http.get<Project[]>(url)
      .pipe(
        map(projects => projects[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Project id=${id}`);
        }),
        catchError(this.handleError<Project>(`getProject id=${id}`))
      );
  }

  /** GET Project by id. Will 404 if id not found */
  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;

    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched Project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );

    /*
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next({id: '1', title: 'myTitle', images: ['ww', 'ss']});
        console.log('am done');
        observer.complete();
      }, 0);
    });
    */
  }

  /* GET projects whose name contains search teerm */
  searchprojects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if not search term, return empty Project array.
      return of([]);
    }
    return this.http.get<Project[]>(`api/projects/?name=${term}`).pipe(
      tap(_ => this.log(`found projects matching "${term}"`)),
      catchError(this.handleError<Project[]>('searchprojects', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Project to the server */
  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, Project, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((project: Project) => this.log(`added Project w/ id=${project.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** PUT: update the Project on the server */
  updateProject (project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, httpOptions).pipe(
      tap(_ => this.log(`updated Project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProjectService message with the MessageService */
  private log(message: string) {
    console.log('ProjectService: ' + message);
  }
}
