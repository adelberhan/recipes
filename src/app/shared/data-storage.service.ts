import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipes } from '../recipes/recipes.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  recipes = [];
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private auth: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-book-3e571-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((data) => {});
  }

  postRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .post(
        'https://recipe-book-3e571-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((data) => {});
  }

  deleteRecipes(id: number) {
    this.http
      .delete(
        'https://recipe-book-3e571-default-rtdb.firebaseio.com/recipes.json'
      )
      .subscribe((data) => {});
  }

  fetchData() {
    return this.http
      .get<Recipes[]>(
        'https://recipe-book-3e571-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          if (recipes) {
            return recipes.map((recipes) => {
              return {
                ...recipes,
                ingredients: recipes.ingredient ? recipes.ingredient : [],
              };
            });
          } else {
            return [];
          }
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
