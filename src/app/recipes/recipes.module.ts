import { NgModule } from '@angular/core';
import { RecipeItemComponent } from './respies-list/respie-item/respie-item.component';
import { RecipesDetailsComponent } from './respies-details/respies-details.component';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './respies-list/respies-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared/shared.module';

const modules = [
  RecipesComponent,
  RecipesListComponent,
  RecipesDetailsComponent,
  RecipeItemComponent,
  RecipeStartComponent,
  RecipeEditComponent,
];

@NgModule({
  declarations: [...modules],
  imports: [ReactiveFormsModule, RecipeRoutingModule, SharedModule],
  // exports: [...modules],
})
export class RecipesModule {}
