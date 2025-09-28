import { Injectable } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() {}

  // Obtener todos los productos del carrito
  getCart() {
    return this.cart;
  }

  // Agregar producto al carrito
  addToCart(product: CartItem) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
  }

  // Eliminar producto del carrito
  removeFromCart(productId: string) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  // Vaciar carrito
  clearCart() {
    this.cart = [];
  }

  // Calcular total
  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
