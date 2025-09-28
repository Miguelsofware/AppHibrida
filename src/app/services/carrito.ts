import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: any[] = [];

  constructor() {}

  getItems() {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  addItem(item: any) {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  clearCart() {
    this.items = [];
  }
}
