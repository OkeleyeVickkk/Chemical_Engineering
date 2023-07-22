const menuCloseButton = document.querySelector(".v-sidebar-close");
const menuOpenButton = document.querySelector(".v-sidebar-toggler");
const sideBar = document.querySelector(".v-sidebar");

function openSideBar() {
	sideBar.classList.add("active");
}
function closeSideBar() {
	sideBar.classList.remove("active");
}
menuOpenButton.addEventListener("click", openSideBar);
menuCloseButton.addEventListener("click", closeSideBar);
