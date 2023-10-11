let swiperWrapper = document.getElementById("wrapper");
let categoriesCards = document.getElementById("categories-cards");
let loadBtn = document.querySelector(".load-btn");
let filterBtn = document.querySelectorAll(".products-collection button");
/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 70,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    567: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
  },
});
/* ========== Fetch the Products =========== */
const getProducts = async () => {
  try {
    let response = await fetch("./data/products.json");
    let data = await response.json();
    data = data.products;
    return data;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  let products = await getProducts();
  products = products.filter((product) => product.category === "Dresses");
  displayProducts(products);
  allProducts();
});
/* ========== Display Products =========== */
const displayProducts = (product) => {
  let pro = product.map(
    ({ title, price, url }) => `
  <div class="swiper-slide">
  <div class="pro-img">
    <img src=${url} alt="" class="img-fluid" />
    <i class="fa fa-heart"></i>
  </div>
  <div class="pro-info">
    <h3>${title}</h3>
    <div class="pro-footer">
      <span>$${price}</span>
      <div class="stars">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
    </div>
  </div>
</div>
  `
  );
  swiperWrapper.innerHTML = pro;
};
/* ========== Filter Products =========== */
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[2].classList.add("active-btn");
  filterBtn[i].addEventListener("click", async (e) => {
    let products = await getProducts();
    let target = e.target;
    let category = target.getAttribute("data-filter");
    filterBtn.forEach((btn) => btn.classList.remove("active-btn"));
    target.classList.add("active-btn");
    let newProducts = products.filter((product) => {
      if (product.category === category) {
        return product;
      }
    });
    displayProducts(newProducts);
    swiper.update();
  });
}
/* ========== Categories Products =========== */
let currentIndex = 0;
const allProducts = async () => {
  let maxResult = 8;
  let products = await getProducts();
  if (currentIndex >= products.length) {
    loadBtn.disabled = true;
    loadBtn.innerHTML = "No More Products";
    loadBtn.style.color = "#fff";
    return;
  }
  for (let i = 0; i < maxResult; i++) {
    let { title, price, url } = products[i + currentIndex];
    categoriesCards.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col categories-card">
              <i class="fa fa-heart"></i>
              <div class="pro-img">
                <img src=${url} alt="" class="img-fluid" />
              </div>
              <div class="pro-info">
                <div class="pro-content">
                  <h3>${title}</h3>
                  <button class="btn">add to cart</button>
                </div>
                <div class="pro-footer">
                  <span>$${price}</span>
                  <div class="stars">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
      `
    );
  }
  currentIndex += maxResult;
};

loadBtn.addEventListener("click", allProducts);
