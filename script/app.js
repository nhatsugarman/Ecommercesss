

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

const menuToggle = $(".menu-toggle");
const menu = $(".menu");
const close = $(".menu-close");

const desktopSliderImg = $(".products-desktop__active-photo img");
const sliderImg = $(".slider__active-photo img");
const closeSlide = $(".slider__active-close");

const desktopSliderThumbs = Array.from($$('.products-desktop__thumb'));
const sliderThumbs = Array.from($$('.slider__thumb'));


const prevBtnSlide = $(".slider__active-left");
const nextBtnSlide = $(".slider__active-right");

const nextBtnSlideMobile = $('.products-mobile-next')
const prevBtnSlideMobile = $('.products-mobile-prev')


const inputValue = $(".products-quantity");

const plusBtn = $(".products-add--plus");
const minusBtn = $(".products-add--minus");
const addToCartBtn = $(".products-add-btn");

const cartContent = $(".header-cart-content");



// Handle when clcik the button header-toggle

window.addEventListener("load", function () {
    const menuToggle = $(".menu-toggle");
    const menu = $(".menu");
    menuToggle && menuToggle.addEventListener("click", handleToggleMenu);
    function handleToggleMenu(e) {
        menu && menu.classList.add("is-show");
    }
    close && close.addEventListener('click', function () {
        menu && menu.classList.remove("is-show");
    })
    document.addEventListener("click", handleClickOutside);
    function handleClickOutside(e) {
        if (e.target.matches(".menu-toggle") || e.target.matches(".menu, .menu *"))
            return;
        menu && menu.classList.remove("is-show");
    }
});


// Show slide in the screen

desktopSliderImg.addEventListener("click", () => {
    alterClass($(".slider"), "is-show", "add");
});


// Hidden slide in the screen
closeSlide.addEventListener("click", () => {
    alterClass($(".slider"), "is-show", "remove");
});

document.addEventListener("click", (e) => {
    if (e.target.matches(".is-show")) {
        alterClass(document.querySelector(".slider"), "is-show", "remove");
    }
});






function alterClass(element, class_name, processName) {
    if (processName === "add") {
        element.classList.add(class_name);
    } else if (processName === "remove") {
        if (element.classList.contains(class_name)) {
            element.classList.remove(class_name);
        }
    } else if (processName === "toggle") {
        element.classList.toggle(class_name);
    }
}


// Slider when click the item
desktopSliderThumbs.forEach(item => {
    item.addEventListener("click", function () {
        showClickedPhoto(item, desktopSliderThumbs, desktopSliderImg, "products-desktop__thumb--active");
    });
});

function showClickedPhoto(element, siblings, visibleImg, class_name) {
    const srcImg = element.getAttribute("data-src");
    visibleImg.setAttribute("src", srcImg);
    siblings.forEach(item => {
        if (item.classList.contains(class_name)) {
            item.classList.remove(class_name);
        }
    });
    element.classList.add(class_name);
}


// Click the btn-prev and forward
prevBtnSlide.addEventListener("click", (e) => actionSlide("previous"));
nextBtnSlide.addEventListener("click", (e) => actionSlide("next"));

nextBtnSlideMobile.addEventListener("click", (e) => actionSlideMobile("next"));
prevBtnSlideMobile.addEventListener("click", (e) => actionSlideMobile("previous"));


function actionSlideMobile(action) {
    const activeSlideMobile = $$('.next-slide')
    activeSlideMobile.forEach((item, index) => {
        if (item.classList.contains("active")) {
            currentImgIndex = index;
        }
    });

    if (action === "next") {
        if (currentImgIndex < sliderThumbs.length - 1) {
            activeSlideMobile[currentImgIndex].classList.remove("active");
            currentImgIndex++;
            activeSlideMobile[currentImgIndex].classList.add("active");
        }
    } else if (action === "previous") {
        if (currentImgIndex > 0) {
            activeSlideMobile[currentImgIndex].classList.remove("active");
            currentImgIndex--;
            activeSlideMobile[currentImgIndex].classList.add("active");
        }
    }
}



function actionSlide(action) {
    sliderThumbs.forEach((item, index) => {
        if (item.classList.contains("slider__thumb--active")) {
            currentImgIndex = index;
        }
    });
    if (action === "next") {
        if (currentImgIndex < sliderThumbs.length - 1) {
            sliderThumbs[currentImgIndex].classList.remove("slider__thumb--active");
            currentImgIndex++;
            sliderImg.setAttribute("src", sliderThumbs[currentImgIndex].getAttribute("data-src"));
            sliderThumbs[currentImgIndex].classList.add("slider__thumb--active");
        }
    } else if (action === "previous") {
        if (currentImgIndex > 0) {
            sliderThumbs[currentImgIndex].classList.remove("slider__thumb--active");
            currentImgIndex--;
            sliderImg.setAttribute("src", sliderThumbs[currentImgIndex].getAttribute("data-src"));
            sliderThumbs[currentImgIndex].classList.add("slider__thumb--active");
        }
    }
}


// Increase Quantity Value When Click on plus Icon
plusBtn.addEventListener("click", increaseCart);

// Decrease Quantity Value When Click on Minus Icon
minusBtn.addEventListener("click", decreaseCart);



function increaseCart() {
    inputValue.textContent++;
}
function decreaseCart() {
    if (inputValue.textContent > 0) {
        inputValue.textContent--;
    }
}

addToCartBtn.addEventListener("click", addToCart);

function addToCart() {

    const cartIcon = $(".header-cart-icon");
    const span = document.createElement("span");

    const numberValue = Number(inputValue.textContent);
    if (typeof numberValue === "number" && numberValue > 0) {

        // Add Quantity Number to Span
        span.innerHTML = numberValue;

        if (cartIcon.contains(cartIcon.querySelector("span"))) {
            Array.from(cartIcon.querySelectorAll("span")).map((item) => {
                item.remove();
            });
        }
        // Add Quantity Span to Dom
        cartIcon.appendChild(span);
        // Add Product to Cart
        cartContent.innerHTML = `
        <h3 class="header-cart__heading">Cart</h3>
        <div class="header-cart__full">
            <div class="header-cart__product">
                <a class="header-cart__img">
                    <img src="images/image-product-1-thumbnail.jpg" alt="Product">
                </a>
                <div class="header-cart__text">
                    <p>Autumn Limited Edition...</p>
                    <div class="header-cart__price">$125.00 * ${numberValue}
                        <span>$${125*numberValue}.00</span>
                    </div>
                </div>
                <a class="header-cart__bin">
                    <ion-icon name="trash-outline"></ion-icon>
                </a>
            </div>
            <a class="header-cart__btn btn btn__full">Checkout</a>
        </div> `;
        emptyCartBtn = $(".header-cart__bin");
        if (emptyCartBtn) { emptyCartBtn.addEventListener("click", emptyCart) };
    } else {
        alert(`You can't Buy ${inputValue.textContent} Products`);
    }
}


function emptyCart() {

    const cartIcon = $(".header-cart-icon");

    if (cartIcon.contains(cartIcon.querySelector("span"))) {
        console.log(cartIcon.querySelectorAll("span"));

        Array.from(cartIcon.querySelectorAll("span")).map((item) => {
            item.remove();
        });
    }
    cartContent.innerHTML = `
        <h3 class="header-cart__heading">Cart</h3>
        <div class="header-cart__empty">
            Your cart is empty.
        </div>
    `;
}