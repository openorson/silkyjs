export class BaseStore {
  base = 2;

  changeBase() {
    this.base++;
  }
}

export class AppStore extends BaseStore {
  field = 1;

  changeField() {
    this.field++;
    this.changeBase();
  }
}
