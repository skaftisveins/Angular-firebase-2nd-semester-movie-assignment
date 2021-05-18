import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fadeInMovies', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *',
      animate(800)),
    ])
  ]
})
export class MainComponent implements OnInit {
  movies = [];
  genreList = [];
  selectedGenre: string;
  nameSearch: string;
  temp: string;

  popularMovies$: Observable<any>;

  // Angular Pagination
  collectionSize: any;
  pageSize: any;
  currentPage: any;

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPopular(+this.route.snapshot.paramMap.get('movie'));
    this.getGenres();

  }

  onSelectGenre(selected: string): void {
    this.selectedGenre = selected;
  }

  getGenres() {
    this.data.getGenres().subscribe(x => {
      this.genreList = x.genres;
      console.log(this.genreList);
    });
  }

  getPopular(page: number = 1) {
    this.data.getPopular(page).pipe(
      first()).
        subscribe(x => {
          this.movies = x.results;
          this.pageSize = x.total_pages;
          this.currentPage = x.page;
          this.temp = 'Popular Movies';
          console.log(x, page);
    });
  }

  getTopRated(page: number = 1) {
    if (page > 1) {
      page = this.loadPageLists();
      } else {
      this.data.getTopRated(page).pipe(
        first()).
          subscribe(x => {
          this.movies = x.results;
          this.pageSize = x.total_pages;
          this.currentPage = x.page;
          this.temp = 'Top Rated Movies';
          console.log(x);
        });
      }
    }

  getUpComing(page: number = 1) {
    this.data.getUpComing(page).pipe(
      first()).
        subscribe(x => {
        this.movies = x.results;
        this.pageSize = x.total_pages;
        this.currentPage = x.page;
        this.temp = 'Up Coming Movies';
        console.log(x);
      });
    }

  setPage(x: number): void {
    this.getPopular(x);
    this.route.snapshot.paramMap.get('main');
    this.router.navigate(['/page', x]);
    console.log(x);
  }

  loadPageLists() {
    return +this.route.snapshot.paramMap.get('main');
  }
}
