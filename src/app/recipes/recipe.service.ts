import { Injectable } from '@angular/core';
import { Recipes } from './recipes.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipes[]>();

  // private recipes: Recipes[] = [
  //   new Recipes(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://th.bing.com/th/id/R.1803e67832ce77c721986b8ab55ea376?rik=brHHTfu3jTpHMg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-T_N0SS3b5do%2fUWiwF7ooOTI%2fAAAAAAAABdM%2fdRII1dv7VMQ%2fs1600%2fPepsi80s.png&ehk=bzajebqMoub8iXO%2bBOjZ0Whs13wA5RyXgw4T9Cvyhy8%3d&risl=&pid=ImgRaw&r=0',
  //     [new Ingredients('Meet', 1), new Ingredients('Fries', 3)]
  //   ),
  //   new Recipes(
  //     'Recipe',
  //     'This is simply a test',
  //     'https://th.bing.com/th/id/R.1803e67832ce77c721986b8ab55ea376?rik=brHHTfu3jTpHMg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-T_N0SS3b5do%2fUWiwF7ooOTI%2fAAAAAAAABdM%2fdRII1dv7VMQ%2fs1600%2fPepsi80s.png&ehk=bzajebqMoub8iXO%2bBOjZ0Whs13wA5RyXgw4T9Cvyhy8%3d&risl=&pid=ImgRaw&r=0',
  //     [new Ingredients('Meet', 1), new Ingredients('Fries', 3)]
  //     ),
  //   ];

  private recipes:Recipes[]=[];
  private saveRecipe!:any;
    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipes[]) {
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice())
    }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  // addIngredientsToShoppingList(ingredients: Ingredients[]) {
  //   this.slService.addIngredient(ingredients);
  // }

  addRecipe(recipe: Recipes) {
    this.recipes.push(recipe);
    this.saveRecipe= this.recipeChanged.next(this.recipes.slice());
// this.store.storeRecipes()
  }

  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    // Splice removes the recipe at the specified 'index' from the 'recipes' array.
    // It removes 1 element starting from the 'index'.
    this.recipes.splice(index, 1);

    // After removing the recipe, the 'recipeChanged' subject is notified
    // by calling 'next' and passing a copy of the updated 'recipes' array.
    this.recipeChanged.next(this.recipes.slice());
  }
}
