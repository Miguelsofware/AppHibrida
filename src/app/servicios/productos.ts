import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://fakestoreapi.com/products'; 
  // 🔹 Cambia esta URL si más adelante usas tu propio backend

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
