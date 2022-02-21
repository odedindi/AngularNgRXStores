import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, scan, share, switchMap, tap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import type { Album, Photo } from 'src/app/types/album.interface';
const baseUrl = 'https://jsonplaceholder.typicode.com/albums';

// const initialAlbums$ = fromFetch(baseUrl).pipe(
//   switchMap((res) => {
//     if (res.ok) return res.json();
//     return of({ error: true, message: `Error ${res.status}` });
//   }),
//   catchError((err) => {
//     // Network or other error, handle appropriately
//     console.error(err);
//     return of({ error: true, message: err.message });
//   })
// );
// // ...
// // ...
// // ...
// initialAlbums$.subscribe({
//   next: (result) => console.log(result),
//   complete: () => console.log('done'),
// });

// type AlbumOperation = (albums: Album[]) => Album[];
// type ServiceOperation = <T>(t: T) => T;

// @Injectable({
//   providedIn: 'root',
// })
// export class AlbumsService {
//   private albums$: Observable<Album[]>;
//   private update$ = new BehaviorSubject<AlbumOperation>((albums: Album[]) => albums);

//   private remove$ = new
//   constructor() {}
// }
