import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../servicios/foto';
import { AuthService } from '../servicios/auth.service';
import { CarritoService } from '../services/carrito';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  // campos para login
  email: string = '';
  password: string = '';
  usuario: any = null;

  constructor(
    public photoService: PhotoService,
    private carritoService: CarritoService,
    private actionSheetController: ActionSheetController,
    private authService: AuthService
  ) {}

  addToCart() {
  const producto = { nombre: 'Foto Impresa', precio: 10000 };
  this.carritoService.addItem(producto);
  console.log('Producto agregado al carrito:', producto);
}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
    this.usuario = this.authService.usuarioActual;
  }

  async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Métodos de autenticación
  async registrar() {
    try {
      const user = await this.authService.registrar(this.email, this.password);
      this.usuario = user.user;
      console.log('Usuario registrado:', user);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }

  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      this.usuario = user.user;
      console.log('Usuario logueado:', user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async logout() {
    await this.authService.logout();
    this.usuario = null;
  }
}
