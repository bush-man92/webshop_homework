import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from '../product-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ConvertToSpacesPipe } from 'src/app/shared/convert-to-spaces.pipe';
import { ProductDetailGuard } from '../product-detail.guard';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailsComponent},
    ])
  ]
})
export class ProductModule { }
