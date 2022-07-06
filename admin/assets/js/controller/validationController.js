const Pattern = /^[0-9]{1,}$/;
// Xoa hien thi loi
const clearSpanError = function (spanID) {
  document.getElementById(spanID).style.display = "none";
  document.getElementById(spanID).innerHTML = "";
};
//  Hien thi loi
const showSpanError = function (spanID, message) {
  document.getElementById(spanID).style.display = "block";
  document.getElementById(spanID).innerHTML = message;
};
const getIndex = (ID, List) => {
  return List.findIndex((item) => {
    return item.id == ID;
  });
};
// Kiem tra input rong
const checkNotEmpty = (input, spanID, inputName) => {
  if (input === "") {
    let msg = `${inputName} không được để trống`;
    showSpanError(spanID, msg);
    return false;
  }
  clearSpanError(spanID);
  return true;
};
// Kiem tra input valid
const checkValidID = (ID, spanID, inputName) => {
  if (!ID.match(Pattern)) {
    let msg = `${inputName} phải là số`;
    showSpanError(spanID, msg);
    return false;
  }
  clearSpanError(spanID);
  return true;
};
//Kiem tra price valid
const checkValidPrice = (price, spanID, inputName) => {
  if (!price.match(Pattern)) {
    let msg = `${inputName} phải là số nguyên`;
    showSpanError(spanID, msg);
    return false;
  }
  clearSpanError(spanID);
  return true;
};
// Kiem tra input co trung
const checkDuplicate = (inputIndex, spanID, inputName) => {
  if (inputIndex != -1) {
    let msg = `${inputName} không được trùng`;
    showSpanError(spanID, msg);
    return false;
  }
  clearSpanError(spanID);
  return true;
};
// Kiem tra product ID : Not empty , Not duplicated, Must be number
const validationProductID = (product, productList) => {
  let isValid =
    checkNotEmpty(product, "invalidID", "Mã sản phẩm") &&
    checkValidID(product, "invalidID", "Mã sản phẩm") &&
    checkDuplicate(getIndex(product, productList), "invalidID", "Mã sản phẩm");
  return isValid;
};
// Kiem tra product name: Not empty
const validationName = (name) => {
  let isValid = checkNotEmpty(name, "invalidTen", "Tên sản phẩm");
  return isValid;
};

//Kiem tra loai san pham: Not empty
const validationType = (type) => {
  let isValid = checkNotEmpty(type, "invalidLoai", "Loại sản phẩm");
  return isValid;
};
//Kiem tra gia san pham: Not empty, Must be number
const validationPrice = (price) => {
  let isValid =
    checkNotEmpty(price, "invalidGia", "Giá sản phẩm") &&
    checkValidPrice(price, "invalidGia", "Giá sản phẩm");
  return isValid;
};
//Kiem tra man hinh san pham: Not empty
const validationScreen = (screen) => {
  let isValid = checkNotEmpty(screen, "invalidScreen", "Màn hình sản phẩm");
  return isValid;
};
//Kiem tra camera sau san pham: Not empty
const validationBackCamera = (backCam) => {
  let isValid = checkNotEmpty(backCam, "invalidBackCam", "Camera sau");
  return isValid;
};
//Kiem tra camera truoc san pham: Not empty
const validationFrontCamera = (frontCam) => {
  let isValid = checkNotEmpty(frontCam, "invalidFrontCam", "Camera trước");
  return isValid;
};
//Kiem tra link hinh san pham: not empty
const validationImageUrl = (imgUrl) => {
  let isValid = checkNotEmpty(imgUrl, "invalidHinhSP", "Hình sản phẩm");
  return isValid;
};
//Kiem tra mo ta san pham: not empty
const validationDescription = (description) => {
  let isValid = checkNotEmpty(description, "invalidMoTa", "Mô tả sản phẩm");
  return isValid;
};
// Kiem tra khi them moi san pham
const validationNewProduct = (product, productList) => {
  return (
    validationProductID(product.id, productList) &
    validationName(product.name) &
    validationPrice(product.price) &
    validationType(product.type) &
    validationBackCamera(product.backCamera) &
    validationFrontCamera(product.frontCamera) &
    validationImageUrl(product.img) &
    validationScreen(product.screen) &
    validationDescription(product.desc)
  );
};
