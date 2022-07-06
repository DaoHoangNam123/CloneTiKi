let ProducList = [];
let cart = [];

const vnd = (number) => {
  return (number * 1)

    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "₫");
};

const findIndexList = (id) => {
  return ProducList.findIndex((e) => {
    return e.id == id;
  });
};

const addToCart = (id) => {
  let index = -1;
  if (cart.length) {
    index = cart.findIndex((e) => {
      return e.product.id == id;
    });
  }
  if (index === -1) {
    let cartItem = {
      product: ProducList[findIndexList(id)],
      quantity: 1,
    };
    cart.push(cartItem);
  } else {
    cart[index].quantity += 1;
  }
  countQuant();
  renderPaymentList(cart);
};

const subItem = (id) => {
  let index = cart.findIndex((e) => {
    return e.product.id == id;
  });
  let quant = cart[index].quantity;
  if (quant === 1) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quant - 1;
  }
  renderPaymentList(cart);
};

const countQuant = () => {
  let count = 0;
  cart.forEach((e) => {
    count += e.quantity;
  });
  document.getElementById("cart-quantity").innerHTML = count;
};
