let Product = function (
  _id,
  _name,
  _price,
  _screen,
  _backCamera,
  _frontCamera,
  _imgUrl,
  _description,
  _type
) {
  this.id = _id;
  this.name = _name;
  this.type = _type;
  this.price = _price;
  this.screen = _screen;
  this.backCamera = _backCamera;
  this.frontCamera = _frontCamera;
  this.img = _imgUrl;
  this.desc = _description;
};
