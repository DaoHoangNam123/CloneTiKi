document.getElementById("btnThemSP").addEventListener("click", async () => {
  let newProduct = getProductData();
  let productList = await getProductListAPI();
  let isValid = validationNewProduct(newProduct, productList);
  if (isValid) {
    renderNewProductData(newProduct);
    await addNewProductAPI(newProduct);
  }
});
