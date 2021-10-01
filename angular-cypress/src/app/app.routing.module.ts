import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
