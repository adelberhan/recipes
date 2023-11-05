import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { NgFor } from '@angular/common';
import { DropdownDirective } from '../../shared/drop-down.directive';

@Component({
    selector: 'app-respies-details',
    templateUrl: './respies-details.component.html',
    styleUrls: ['./respies-details.component.css'],
    // standalone: true,
    // imports: [DropdownDirective, NgFor],
})
export class RecipesDetailsComponent implements OnInit {
  id: number;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  editRecipe() {
    // this.router.navigate(['edit'],{relativeTo:this.route})
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  recipe: Recipes;
}
