/* navigation */
const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) => item.addEventListener('click', activeLink));

/* footer btn */
const button = document.getElementById("btn");
button.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});