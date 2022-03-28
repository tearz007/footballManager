import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DreamTeamComponent } from './dream-team/dream-team.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'',component: AuthComponent},
  {path:'home',component: HomeComponent},
  {path:'auth',component: AuthComponent},
  {path:'dreamTeam',component: DreamTeamComponent},
  {path:'profile',component: ProfileComponent },

  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
