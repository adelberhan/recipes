import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

import { Recipes } from '../recipes.model';
import { Location } from '@angular/common';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  // standalone: true,
  // imports: [ReactiveFormsModule, NgFor],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recForm: FormGroup;
  recipes: Recipes[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _location: Location,
    private httpRes: DataStorageService
  ) {}

  ngOnInit(): void {
    this.recipeService.recipeChanged.subscribe((recipes: Recipes[]) => {
      this.recipes = recipes;
    });
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recName = '';
    let recImgPath = '';
    let recDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      (recName = recipe.name),
        (recImgPath = recipe.imgPath),
        (recDescription = recipe.description);
      if (recipe['ingredient']) {
        for (let singleIngredient of recipe.ingredient) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(singleIngredient.name, Validators.required),
              amount: new FormControl(singleIngredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recForm = new FormGroup({
      name: new FormControl(recName, Validators.required),
      imgPath: new FormControl(recImgPath, Validators.required),
      description: new FormControl(recDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    return (<FormArray>this.recForm.get('ingredients')).controls;
  }

  onSaveData() {
    this.httpRes.storeRecipes();
  }

  onAddIngredient() {
    (<FormArray>this.recForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    (<FormArray>this.recForm.get('ingredients')).removeAt(id);
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recForm.value);
    } else {
      this.recipeService.addRecipe(this.recForm.value);
    }
  }
}
