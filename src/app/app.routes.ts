import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // importe o componente
import { HabitoComponent } from './pages/habito/habito.component';
import { CadastrarHabitoComponent } from './pages/cadastrar-habito/cadastrar-habito.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: "Home - Habitus" },
  { path: 'habito/:id', component: HabitoComponent },
  { path: 'cadastrar-habito', component: CadastrarHabitoComponent },

  { path: '**', redirectTo: 'home' }
];
