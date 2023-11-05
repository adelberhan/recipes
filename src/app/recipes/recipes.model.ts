import { Ingredients } from "../shared/ingredients.model";

export class Recipes{
 public   name: string;
  public  description: string;
 public imgPath: string;
 public ingredient:Ingredients[]

    constructor(name: string, desc: string, imgPath: string,ingredients:Ingredients[]) {
        this.name = name;
        this.description = desc;
      this.imgPath = imgPath;
      this.ingredient=ingredients
    }
}
