import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage implements OnInit {
  items: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.items = this.carritoService.getItems();
    this.total = this.carritoService.getTotal();
  }

  removeItem(index: number) {
    this.carritoService.removeItem(index);
    this.loadCart();
  }

  clearCart() {
    this.carritoService.clearCart();
    this.loadCart();
  }
}
