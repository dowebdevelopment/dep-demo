import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interval',
  imports: [AsyncPipe],
  templateUrl: './interval.html',
  styleUrl: './interval.scss'
})
export class Interval {
  // private unsubscribe$ = new Subject<void>();
  // public foo$ = interval(2000).pipe(shareReplay());
  // // private sub!: Subscription;

  // ngOnInit() {
  //   this.foo$.subscribe((value: number) => {
  //     console.log(value);
  //   });

  //   timer(5000).subscribe(() => {
  //     this.foo$.subscribe((value: number) => {
  //       console.log(value);
  //     });
  //   });
  // }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }
}
