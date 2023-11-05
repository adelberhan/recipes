export class User {
  constructor(
    public email,
    public id,
    private _token,
    private tokenExpirationDate: Date
  ) {}

  get token(){
    if(!this.tokenExpirationDate || new Date() > this.tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}
