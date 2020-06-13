import { AuthGuard } from './components/auth/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';




const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  { path: '**',
    redirectTo: 'login', pathMatch: 'full'
  }

  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        // enableTracing: true,
        preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
