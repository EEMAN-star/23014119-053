
const ham = document.querySelector(".hamburger");
ham.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.querySelector(".overlay");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}


$(document).ready(function () {
   
    $("#finder-dropdown").on("click", function (e) {
        e.preventDefault();
        $(".my-dropdown").toggleClass("show");
    });

    
    $(".dropdown-search").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $(".dropdown-select").find("option").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(value));
        });
    });

    
    $(".close-btn").hide();

    $(".cart-icon").on("click", function () {
        $(".cart-nav").addClass("open");
        $(".close-btn").show();
    });

    $(".close-btn").on("click", function () {
        $(".cart-nav").removeClass("open");
        $(".close-btn").hide();
    });

   
    function setCookie(data) {
        document.cookie = "Cart=" + JSON.stringify(data) + "; max-age=80600; path=/";
        console.log("Cookie set:", document.cookie);
    }

    function getCookie(name) {
        let cookie = document.cookie.split(";");
        for (let i = 0; i < cookie.length; i++) {
            let [key, value] = cookie[i].split("=");
            if (key.trim() === name) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    console.error("Error parsing cookie:", e);
                    return null;
                }
            }
        }
        return null;
    }

  
    function setCart(data) {
        if (!Array.isArray(data)) {
            console.error("setCart Error: Data is not an array!", data);
            return;
        }
        localStorage.setItem("cart", JSON.stringify(data));
    }

    function getCart() {
        try {
            let cartData = localStorage.getItem("cart");
            if (!cartData) return [];
            let parsedData = JSON.parse(cartData);
            return Array.isArray(parsedData) ? parsedData : [];
        } catch (e) {
            console.error("Error retrieving cart:", e);
            return [];
        }
    }

    
    function renderCart() {
        let cartsItem = getCookie("Cart");

     
        if (!Array.isArray(cartsItem)) {
            cartsItem = [];
        }

        $(".cart-content").html("");

        if (cartsItem.length === 0) {
            $(".cart-content").html('<p class="emp-cart">Your cart is empty</p>');
        } else {
            $(".emp-cart").hide();
            cartsItem.forEach((item, index) => {
                let cartItem = `
                    <div class="cart-item" data-index="${index}">
                        <div class="cart-img"><img src="${item.img}" alt="${item.name}"></div>
                        <div class="cart-data">
                            <p>${item.name}</p>
                            <p>${item.price}</p>
                            <button class="remove-item">Remove</button>
                        </div>
                    </div>`;
                $(".cart-content").append(cartItem);
            });
        }
    }

  
    $(".p-btn").click(function () {
        var product = $(this).closest(".product");
        var img = product.find("img").attr("src");
        var name = product.find("span").text();
        var price = product.find("p").text();

     
        var cartsItem = getCookie("Cart");

        
        if (!Array.isArray(cartsItem)) {
            cartsItem = [];
        }

        cartsItem.push({ img: img, name: name, price: price });

       
        setCookie(cartsItem);

        
        renderCart();
    });

    $(document).on("click", ".remove-item", function () {
        let index = $(this).closest(".cart-item").data("index");
        let cartsItem = getCookie("Cart");

        if (Array.isArray(cartsItem)) {
            cartsItem.splice(index, 1); 
            setCookie(cartsItem); 
            renderCart(); 
        }
    });

    renderCart();
});