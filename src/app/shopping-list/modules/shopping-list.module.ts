import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from '../shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeRoutingModule } from '../../recipes/recipes-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

const modules = [ShoppingListComponent, ShoppingEditComponent];

@NgModule({
  declarations: [...modules],

  imports: [
    // RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    ShoppingListRoutingModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    FormsModule,
    SharedModule,
  ],
  exports: [...modules],
})
export class ShoppingListModule {}

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { ShoppingListRoutingModule } from './shopping-list-routing.module';
// import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
// import { ShoppingListComponent } from './shopping-list.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { RecipeRoutingModule } from '../recipes/recipes-routing.module';
// import { SharedModule } from '../shared/shared/shared.module';

// @NgModule({
//   declarations: [ // Declare your components here

//   ],
//   imports: [
//     ReactiveFormsModule,
//     ShoppingListRoutingModule,
//     FormsModule,

//   ],
//   exports: [

//   ],
// })
// export class ShoppingListModule {}
