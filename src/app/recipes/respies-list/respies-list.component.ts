import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeItemComponent } from './respie-item/respie-item.component';
import { NgFor } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-respies-list',
  templateUrl: './respies-list.component.html',
  styleUrls: ['./respies-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  endSubs: Subscription;
  isAuth = false;

  constructor(
    private recipeService: RecipeService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.endSubs = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipes[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
    this.endSubs = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  newItem() {
    this.route.navigate(['new'], { relativeTo: this.activeRoute });
  }
  recipes: Recipes[];

  ngOnDestroy(): void {
    this.endSubs.unsubscribe();
  }
}
