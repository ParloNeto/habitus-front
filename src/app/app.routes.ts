import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // importe o componente
import { HabitoComponent } from './pages/home/habito/habito.component';
import { CadastrarHabitoComponent } from './shared/components/cadastrar-habito/cadastrar-habito.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'habito/:id', component: HabitoComponent },
  { path: 'cadastrar-habito', component: CadastrarHabitoComponent }
];
