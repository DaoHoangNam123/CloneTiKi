const BASE_URL = "https://6277d8222f94a1d70612d6fe.mockapi.io/capstoneAPI";
const getProductData = () => {
  let id = document.getElementById("MaSP").value;
  let name = document.getElementById("tenSP").value;
  let typeOption = document.getElementById("loaiSP");
  let type = typeOption.options[typeOption.selectedIndex].value;
  let price = document.getElementById("giaSP").value;
  let screen = document.getElementById("manHinh").value;
  let backCamera = document.getElementById("camSau").value;
  let frontCamera = document.getElementById("camTruoc").value;
  let imgUrl = document.getElementById("hinhSP").value;
  let description = document.getElementById("moTa").value;
  return new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    imgUrl,
    description,
    type
  );
};
const renderNewProductData = (newProduct) => {
  document.getElementById("spMa").textContent = newProduct.id;
  document.getElementById("spTenSP").textContent = newProduct.name;
  document.getElementById("spLoaiSP").textContent = newProduct.type
    ? "Iphone"
    : "Samsung";
  document.getElementById("spGia").textContent = newProduct.price;
  document.getElementById("spManHinh").textContent = newProduct.screen;
  document.getElementById("spCamSau").textContent = newProduct.backCamera;
  document.getElementById("spCamTruoc").textContent = newProduct.frontCamera;
  document.getElementById("spMoTa").textContent = newProduct.desc;
  document.getElementById("imgSP").setAttribute("src", newProduct.img);
};
const addNewProductAPI = async (newProduct) => {
  let result = await axios.post(BASE_URL, newProduct);
  return result.data;
};
const getProductListAPI = async () => {
  let list = await axios.get(BASE_URL);
  return list.data;
};
