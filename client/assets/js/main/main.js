export const BASE_URL =
  "https://6277d8222f94a1d70612d6fe.mockapi.io/capstoneAPI";

let getAxios = () => {
  axios({
    url: `${BASE_URL}`,
    method: "GET",
  })
    .then((res) => {
      ProducList = res.data;
      renderProduct(res.data);
    })
    .catch((err) => {});
};
getAxios();
export const renderProduct = (list) => {
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

const componentSearchTag = (text) => {
  return /*html*/ `<span class="search__tag--item">
    ${text}
    <i class="bi bi-x-circle-fill"></i>
  </span>`;
};

document
  .getElementById("form-check-brand")
  .addEventListener("click", function () {
    let checkbox = document.querySelectorAll("input[name=brand]");
    let samsung = false;
    let iphone = false;
    let searchTagHTML = "";
    checkbox.forEach((e, i) => {
      switch (e.value) {
        case "0":
          if (e.checked) {
            samsung = true;
            searchTagHTML += componentSearchTag("samsung");
          }
          break;
        case "1":
          if (e.checked) {
            iphone = true;
            searchTagHTML += componentSearchTag("iphone");
          }
          break;
      }
    });
    let tempArr = ProducList;
    if (samsung && !iphone) {
      tempArr = ProducList.filter((item) => {
        return item.type === false;
      });
    } else if (!samsung && iphone) {
      tempArr = ProducList.filter((item) => {
        return item.type === true;
      });
    }
    document.getElementById("search__tag").innerHTML = searchTagHTML;
    renderProduct(tempArr);
  });
