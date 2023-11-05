import { Component } from '@angular/core';
import { Recipes } from './recipes.model';
import { RecipeService } from './recipe.service';


@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    // standalone: true,
    // imports: [RecipesListComponent, RouterOutlet]
})
export class RecipesComponent {
  constructor(private recipeService: RecipeService) { }



  selectedRecipe:Recipes


}
