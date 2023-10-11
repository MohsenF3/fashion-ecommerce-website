/* ========== User Form =========== */

const formWrapper = document.querySelector(".form-wrapper");
const inputs = document.querySelectorAll(".form-box input[type = 'password']");
const icons = [...document.querySelectorAll(".form-icon")];
const spans = [...document.querySelectorAll(".form-box .top span")];
const userForm = document.querySelector(".user-form");

[".user-icon", ".user-link"].forEach((p) => {
  document.querySelector(p).onclick = () => {
    userForm.classList.add("show");
  };
});

document.querySelector(".close-form").onclick = () => {
  userForm.classList.remove("show");
};

spans.map((span) => {
  span.addEventListener("click", (e) => {
    const color = e.target.dataset.id;
    formWrapper.classList.toggle("active");
    userForm.classList.toggle("active");
    document.querySelector(":root").style.setProperty("--custom", color);
  });
});
