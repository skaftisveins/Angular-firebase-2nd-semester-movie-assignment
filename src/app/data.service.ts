import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie } from './interfaces/movie';

import { API_KEY } from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKey = API_KEY;
  private baseUrl = 'https://api.themoviedb.org/3';
  private basePoster = 'https://image.tmdb.org/t/p/w200';
  private largePoster = 'https://image.tmdb.org/t/p/w400';
  private backdropCover = 'https://image.tmdb.org/t/p/original';
  private youtubeUrl = 'https://www.youtube.com/embed/';

  constructor(private http: HttpClient) { }

  getPopular(page: number = 1): Observable<any> {
    page = page > 0 ? page : 1;
    return this.http.get<any>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}&language=en-US`);
  }

  getTopRated(page: number = 1): Observable<any> {
    page = page > 0 ? page : 1;
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}&language=en-US`);
  }

  getUpComing(page: number = 1): Observable<any> {
    page = page > 0 ? page : 1;
    return this.http.get(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&page=${page}language=en-US`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }

  getMovie(id: number = 1): Observable<Movie> {
    id = id > 0 ? id : 1;
    console.log(id);
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
  }

  getVideo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=en-US`);
  }
}
