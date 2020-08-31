import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RecebimentoComponent } from './pages/recebimento/recebimento.component';

const appRoutes: Routes = [
    { path: 'clientes', component: ClienteComponent },
    { path: 'apartamentos', component: ApartamentoComponent},
    { path: 'reservas', component: ReservaComponent},
    { path: 'hoteis', component: HotelComponent},
    { path: 'recebimentos', component: RecebimentoComponent}
]

export const Routing = RouterModule.forRoot(appRoutes);