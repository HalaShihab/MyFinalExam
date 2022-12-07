class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Book extends Product {
  constructor(name, price, author, yearPublished) {
    super(name, price);
    this.author = author;
    this.yearPublished = yearPublished;
  }
  displayBook() {
    return `${this.author}, ${this.yearPublished}`;
  }
}

class Movie extends Product {
  constructor(name, price, director, actors) {
    super(name, price);
    this.director = director;
    this.actors = actors;
  }

  addActor() {
    this.actors.push(this.name);
  }
  displayMovie() {
    return `${this.director}, ${this.actors}`;
  }
}
