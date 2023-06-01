import { Component } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService
      .getMovies()
      .subscribe((movies) => (this.movies = movies.slice(1, 5)));
  }

  add(id: number, title: string, releaseDate: string, rating: number): void {
    id = +id;
    title = title.trim();
    releaseDate = releaseDate.trim();
    rating = +rating;
    const genres: string[] = ['Action', 'Adventure'];
    if (!title && !releaseDate && !rating) {
      return;
    }
    this.movieService.addMovie({
      id,
      title,
      releaseDate,
      rating,
      genres,
    } as Movie).subscribe();
  }
}
