import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { ProductModule } from './products/product/product.module';
import { GraphQLModule } from './apollo.config';
import { UserService } from './auth/user-service'
import { RegisterComponent } from './auth/register.component'
import { CartComponent } from 'src/app/cart/cart.component'
import { PurchaseComponent } from './purchase/purchase.component';

//graphql sve informacije prenosi s backenda na front

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    PurchaseComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    GraphQLModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'purchase', component: PurchaseComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]),
    ProductModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
