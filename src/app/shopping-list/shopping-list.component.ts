import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    // standalone: true,
    // imports: [ShoppingEditComponent, NgFor],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  private endSubs!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.endSubs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredient: Ingredients[]) => {
        this.ingredients = ingredient;
      }
    );
  }
  onEditItem(index :number){
    this.shoppingListService.startEditing.next(index)
  }

  ngOnDestroy(): void {
    this.endSubs.unsubscribe();
  }
}
