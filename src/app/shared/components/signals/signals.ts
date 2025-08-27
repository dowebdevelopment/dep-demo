import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.scss'
})
export class Signals {
  public foo = signal(0);
  public bar = signal(0);
  public fooAndBar = computed(() => this.foo() + this.bar());

  constructor() {
    effect(() => {
      console.log('Foo: ', this.foo(), 'bar: ', this.bar());
    });
  }

  public handleFooClick() {
    this.foo.update((value) => value + 1);
  }

  public handleBarClick(value: number) {
    this.bar.set(value);
  }

  // public reset() {
  //   this.foo.set(0);
  //   this.bar.set(0);
  // }
}
