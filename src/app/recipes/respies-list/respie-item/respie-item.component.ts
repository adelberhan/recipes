import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../../recipes.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css'],
  // standalone: true,
  // imports: [RouterLinkActive, RouterLink],
})
export class RecipeItemComponent {
  @Input() recipe: Recipes;
  @Input() id: number;
  constructor(private recipeService: RecipeService) {}
}
