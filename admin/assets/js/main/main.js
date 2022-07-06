// Admin
// import { renderProduct } from "../../../../../assets/js/main/main.js";
const BASE_URL = "https://6277d8222f94a1d70612d6fe.mockapi.io/capstoneAPI";

let getAxios = () => {
  axios({
    url: `${BASE_URL}`,
    method: "GET",
  })
    .then((res) => {
      renderProductAdmin(res.data);
    })
    .catch((err) => {});
};
getAxios();
const turnOnLoading = () => {
  document.getElementById("loading").style.display = "flex";
};
const turnOffLoading = () => {
  document.getElementById("loading").style.display = "none";
};

const renderProduct = (list) => {
  let contentHTML = "";
  list.forEach(function (item) {
    contentHTML += /*html*/ `<div class="product__item freeShip cheapRefund rating sold sale">
                <div class="product__item--img">
                  <img
                    class="product__item--img--main"
                    alt=""
                    src="${item.img}"
                  />
                  <img
                    class="product__item--img--tag"
                    src="https://salt.tikicdn.com/ts/upload/dc/0d/49/ef9dc5d8164bd62b011e54276502b342.png"
                    alt=""
                  />
                </div>
                <p class="product__item--ad">Ad</p>
                <p class="product__item--desc">
                  ${item.name} - ${item.frontCamera} - ${item.backCamera} - ${
      item.screen
    } - ${item.desc}
                </p>
                <div class="produc__item--more">
                  <div class="product__item--rating">
                    <span class="star-icon filled">★</span>
                    <span class="star-icon filled">★</span>
                    <span class="star-icon filled">★</span>
                    <span class="star-icon filled">★</span>
                    <span class="star-icon filled">★</span>
                    <span class="h">|</span>
                  </div>
                  <span class="product__item--sold">Đã bán ${item.sold}</span>
                </div>
                <div class="product__item--price">
                  <span class="item__price">${vnd(item.price)}</span>
                  <span class="item__sale">-10%</span>
                </div>
                <img
                  src="https://salt.tikicdn.com/ts/upload/51/ac/cc/528e80fe3f464f910174e2fdf8887b6f.png"
                  alt=""
                  class="product__item--cheapRefund"
                />
                <button class="btn-tiki-light btn-addCart" onclick="addToCart(${
                  item.id
                })">
                  <i class="bi bi-bag-plus"></i>
                  Thêm vào giỏ hàng
                </button>
                <p class="d-none" id="checkBrand" value="${
                  item.type ? "1" : "0"
                }">${item.type ? "IPHONE" : "SAMSUNG"}</p>
              </div>
    `;
  });
  document.getElementById("search__content").innerHTML = contentHTML;
};
const getInformationProduct = () => {
  let name = document.getElementById("tenSanPham").value;
  let price = document.getElementById("giaSanPham").value * 1;
  let screen = document.getElementById("manHinhSanPham").value;
  let backCamera = document.getElementById("camSauSP").value;
  let frontCamera = document.getElementById("camTruocSP").value;
  let desc = document.getElementById("moTa").value;
  let img = document.getElementById("hinhSanPham").value;
  let type = document.getElementById("loaiSanPham").value * 1 ? true : false;
  return new PRODUCT(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
};

document.getElementById("btnThemSP").addEventListener("click", function () {
  let newProduct = getInformationProduct();
  let isValid = validationNewProduct(newProduct, getData());
  turnOnLoading();
  if (isValid) {
    axios({
      url: `${BASE_URL}`,
      method: "POST",
      data: newProduct,
    })
      .then((res) => {
        getAxios();
        $("#exampleModal").modal("hide");
        turnOffLoading();
      })
      .catch((err) => {});
  }
});
const addNewProductAPI = async (newProduct) => {
  let result = await axios.post(BASE_URL, newProduct);
  return result.data;
};
const getProductListAPI = async () => {
  let list = await axios.get(BASE_URL);
  return list.data;
};
document.getElementById("btnThemSP").addEventListener("click", async () => {
  let newProduct = getInformationProduct();
  let productList = await getProductListAPI();
  let isValid = validationNewProduct(newProduct, productList);
  if (isValid) {
    renderProductAdmin(newProduct);
    await addNewProductAPI(newProduct);
  }
});

const renderProductAdmin = (list) => {
  let contentHTML = "";
  list.forEach((item) => {
    contentHTML += /*html */ `
    <tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.type ? "IPHONE" : "SAMSUNG"}</td>
    <td>${vnd(item.price)}</td>
    <td>   ${item.name} - ${item.frontCamera} - ${item.backCamera} - ${
      item.screen
    } - ${item.desc}</td>
    <td><img class="w-100" src="${item.img}" alt="" /></td>
    <td>
    <i class="bi bi-trash3 btn_remove trashItem" onclick="removeProduct('${
      item.id
    }')"></i>
    <i
    data-toggle="modal"
    data-target="#exampleModal"
    class="bi bi-pencil btn_update updateItem" onclick="getInformationProductById('${
      item.id
    }')"></i>
    </td>
    </tr>`;
  });
  document.getElementById("productTable").innerHTML = contentHTML;
};
function removeProduct(id) {
  turnOnLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      getAxios();
      turnOffLoading();
    })
    .catch((err) => {});
}
const getInformationProductById = (id) => {
  turnOnLoading();

  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  })
    .then((res) => {
      showProductInformation(res.data);
      document.querySelector("#idsp").innerHTML = res.data.id;
      turnOffLoading();
      $("#exampleModal").modal("show");
    })
    .catch((err) => {});
};
const showProductInformation = (product) => {
  document.getElementById("productID").value = product.id;
  document.getElementById("tenSanPham").value = product.name;
  document.getElementById("giaSanPham").value = product.price;
  document.getElementById("manHinhSanPham").value = product.screen;
  document.getElementById("camSauSP").value = product.backCamera;
  document.getElementById("camTruocSP").value = product.frontCamera;
  document.getElementById("moTa").value = product.desc;
  document.getElementById("hinhSanPham").value = product.img;
  document.getElementById("loaiSanPham").value = product.type ? "1" : "0";
};

document.getElementById("btnCapNhat").addEventListener("click", function () {
  let updateProduct = getInformationProduct();
  let id = document.querySelector("#idsp").innerHTML * 1;
  turnOnLoading();

  axios({
    url: `${BASE_URL}/${id}`,
    method: "PUT",
    data: updateProduct,
  })
    .then((res) => {
      turnOffLoading();

      getAxios();
    })
    .catch((err) => {});
});
const vnd = (number) => {
  return (number * 1)

    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "₫");
};
