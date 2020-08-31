
import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,LOCALE_ID} from '@angular/core';
import { AppComponent, ErrorDetailComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { Routing } from './app.routing';
import { HttpModule } from '@angular/http';
import {NgxMaskModule} from 'ngx-mask'

import {
  MatTableModule, 
  MatCardModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatIconModule, 
  MatDialogModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule, 
  MatSnackBarModule, 
  MatMenuModule, 
  MatProgressBarModule, 
  MatSidenavModule, 
  MatListModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteDialogComponent } from './pages/cliente/cliente-dialog/cliente-dialog.component';
import { AppNavigationComponent } from './pages/app-navigation/app-navigation.component';
import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RecebimentoComponent } from './pages/recebimento/recebimento.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ApartamentoDialogComponent } from './pages/apartamento/apartamento-dialog/apartamento-dialog.component';
import { ReservaDialogComponent } from './pages/reserva/reserva-dialog/reserva-dialog.component';
import { RecebimentoDialogComponent } from './pages/recebimento/recebimento-dialog/recebimento-dialog.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

@NgModule({
  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  declarations: [],
  
})
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    ClienteComponent,
    ClienteDialogComponent,
    ApartamentoComponent,
    ApartamentoDialogComponent,
    HotelComponent,
    RecebimentoComponent,
    RecebimentoDialogComponent,
    ReservaComponent,
    ReservaDialogComponent,
    ErrorDetailComponent
  ],
  entryComponents: [
    ClienteDialogComponent,
    ReservaDialogComponent,
    RecebimentoDialogComponent,
    ApartamentoDialogComponent,
    ErrorDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
