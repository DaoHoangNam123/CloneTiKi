const renderPaymentList = (arr) => {
  let contentHTML = "";
  let totalPayment = 0;
  if (arr.length) {
    arr.forEach((item, i) => {
      let total = item.quantity * item.product.price;
      totalPayment += total;
      contentHTML += /*html*/ `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>
          <img
            src="${item.product.img}"
            alt=""
          />
        </td>
        <td> ${item.product.name} - ${item.type ? "Iphone" : "Samsung"} - ${
        item.product.frontCamera
      } - ${item.product.backCamera} - ${item.product.screen} - ${
        item.product.desc
      } </td>
        <td class="td-price">${vnd(item.product.price)}</td>
        <td class="td-quant">
          <div class="input-group">
            <span class="bi bi-dash btn-quant" onclick="subItem(${
              item.product.id
            })"></span>
            <input
              type="text"
              name="quant[2]"
              class="form-control input-number"
              value="${item.quantity}"
              min="1"
              max="100"
            />
            <span class="bi bi-plus btn-quant" onclick="addToCart(${
              item.product.id
            })"></span>
          </div>
        </td>
        <td class="td-total">${vnd(total)}</td>
        <td class="td-delete "><i class="bi bi-trash3 btn-delete-cart" onclick="delProduct(${i})"></i></td>
      </tr>
        `;
    });
  }
  document.getElementById("payment_body").innerHTML = contentHTML;
  document.getElementById("totalMoney__money").innerHTML = vnd(totalPayment);
  countQuant();
};

const removeCart = () => {
  Swal.fire({
    title: "Xoá giỏ hàng?",
    text: "Toàn bộ đơn hàng trong giỏ sẽ bị xoá!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1a94ff",
    cancelButtonColor: "#d33",
    cancelButtonText: "Không",
    confirmButtonText: "Đồng ý",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      renderPaymentList(cart);
      Swal.fire("Thành công!", "Bạn đã xoá giỏ hàng", "success");
    }
  });
};

const paymentDone = () => {
  Swal.fire({
    title: "Thanh toán",
    text: "Bạn có muốn thanh toán toàn bộ đơn hàng?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#1a94ff",
    cancelButtonColor: "#d33",
    cancelButtonText: "Không",
    confirmButtonText: "Thanh toán",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      countQuant();
      $("#paymentModal").modal("hide");
      Swal.fire("Thành công!", "Thanh toán thành công", "success");
    }
  });
};

const delProduct = (index) => {
  cart.splice(index, 1);
  renderPaymentList(cart);
};

const alertCartEmty = () => {
  return Swal.fire("Thông báo", "Không có đơn hàng nào trong giỏ", "warning");
};

document.getElementById("btnCart").addEventListener("click", () => {
  if (cart.length) {
    renderPaymentList(cart);
    $("#paymentModal").modal("show");
  } else {
    alertCartEmty();
  }
});
document.getElementById("btnRemove").addEventListener("click", () => {
  cart.length ? removeCart() : alertCartEmty();
});
document.getElementById("paymentDone").addEventListener("click", () => {
  cart.length ? paymentDone() : alertCartEmty();
});
