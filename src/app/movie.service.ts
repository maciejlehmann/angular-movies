import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './mock-movies';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      'https://angular-movies-app-8ff78-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `https://angular-movies-app-8ff78-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(
      `https://angular-movies-app-8ff78-default-rtdb.europe-west1.firebasedatabase.app/movies/${movie.id}.json`,
      movie,
      this.httpOptions
    );
  }
}
