import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favorites {
  private ids = signal<Set<string>>(new Set());

  public count = computed(() => this.ids().size);
  public list = computed(() => [...this.ids()])
  
  public toggle(id: string): void {
    const s = new Set(this.ids());
    s.has(id) ? s.delete(id) : s.add(id);
    this.ids.set(s);
  }

  public isFavorite(id: string) {
    return this.ids().has(id);
  }
}
