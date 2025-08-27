import { Component, computed, effect, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  imports: [],
  templateUrl: './rxjs.html',
  styleUrl: './rxjs.scss'
})
export class Rxjs {
  
  public foo = signal(0);
  public bar = signal(0);
  public fooDouble = computed(() => this.foo() * 2);
  public fooAndBar = computed(() => this.foo() + untracked(this.bar));

  public handleFooClick() {
    this.foo.update((value) => value + 1);
  }

  public handleBarClick() {
    this.bar.update((value) => value + 1);
  }

  constructor() {
    effect(() => {
      untracked(() => {
        console.log(this.bar());
      });
    });
  }

  ngOnInit() {

    const query = signal('');

    effect((onCleanup) => {
      const q = query();
      const c = new AbortController();

      onCleanup(() => c.abort());

      fetch(`/api?q=${encodeURIComponent(q)}`, { signal: c.signal });
    });
    // combineLatest([this.foo$, this.bar$]).subscribe((values) => {
    //   console.log('CombineLatest emitted:', values);
    // });

    // this.foo$.pipe(switchMap((foo) => this.bar$.pipe(first()))).subscribe((value) => {
    //   console.log('SwitchMap emitted:', value);
    // });

    // this.foo$.pipe(withLatestFrom(this.bar$)).subscribe((values) => {
    //   console.log('WithLatestFrom emitted:', values);
    // });

    // forkJoin([this.foo$.pipe(first()), this.bar$.pipe(first())]).subscribe((values) => {
    //   console.log('ForkJoin emitted:', values);
    // });
  }
}
  
