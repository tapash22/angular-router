import { Injectable } from '@angular/core';
import {
  debounceTime,
  fromEvent,
  map,
  Observable,
  shareReplay,
  startWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  size$: Observable<{ width: number; height: number }> = fromEvent(
    window,
    'resize',
  ).pipe(
    debounceTime(500),
    map(() => ({ width: window.innerWidth, height: window.innerHeight })),
    startWith({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    shareReplay(1),
  );
}
