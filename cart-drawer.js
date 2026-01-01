function openCartDrawer() {
  document.querySelector(".cart-drawer").classList.add("cart-drawer--active");
  document.querySelector(".layout-block").classList.add("active");
  document.querySelector("body.gradient").classList.add("active");
}

function closeCartDrawer() {
  document.querySelector(".cart-drawer").classList.remove("cart-drawer--active");
  document.querySelector(".layout-block").classList.remove("active");
  document.querySelector("body.gradient").classList.remove("active");
}

function updateCartItemCounts(count) {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

async function updateCartDrawer() {
  let res = await fetch("/?section_id=cart-drawer");
  let text = await res.text();
  let html = document.createElement("div");
  html.innerHTML = text;

  let newBox = html.querySelector("div.cart-drawer").innerHTML;
  document.querySelector("div.cart-drawer").innerHTML = newBox;

  let cartItem = document.querySelector(".product-item-count").textContent;
  document.querySelector(".product-count").innerHTML = cartItem;
  addCartDrawerListeners();
}

function addCartDrawerListeners() {
  document.querySelectorAll(".cart-drawer-quantity-selector button")
    .forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        let type = e.currentTarget;
        const rootItem = button.parentElement.parentElement.parentElement.parentElement.parentElement;
        const key = rootItem.getAttribute("data-line-item-key");
        let parent = type.closest(".drawer-cart-main-block");
        parent.querySelector(".loader").classList.add("loader--active");
        parent.querySelector(".layout__block").classList.add("active");
        
        const currentQuantity = Number(button.parentElement.querySelector("input").value);
        const isUp = button.classList.contains(
          "cart-drawer-quantity-selector-plus"
        );
        const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;
        let totalQty = document.querySelector(".drawer_quantity_val");
        let qty = totalQty.getAttribute("value");


        if (newQuantity <= qty) {
          let res = await fetch('/cart/update.js', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ updates: { [key]: newQuantity } })
          });
          let cart = await res.json();
          updateCartItemCounts(cart.item_count);
          updateCartDrawer();
          parent.querySelector(".loader").classList.remove("loader--active");
          parent.querySelector(".layout__block").classList.remove("active");
        }
        else {
          document.querySelector(".quantity_msg").classList.add('error');
          parent.querySelector(".loader").classList.remove("loader--active");
          parent.querySelector(".layout__block").classList.remove("active");
        }
      });
    });

  document.querySelectorAll('.remove_items').forEach((remove) => {
    remove.addEventListener("click", (e) => {
      e.preventDefault();
      let removeItem = remove.closest(".drawer-cart-main-block");
      let dataKey = removeItem.getAttribute("data-line-item-key");
      removeItem.querySelector(".loader").classList.add("loader--active");
      removeItem.querySelector(".layout__block").classList.add("active");
      axios.post("/cart/change.js", {
        id: dataKey,
        quantity: 0,
      })
        .then((res) => {
          removeItem.remove();
          updateCartDrawer();
          removeItem.querySelector(".loader").classList.remove("loader--active");
          removeItem.querySelector(".layout__block").classList.remove("active");
        })
    })
  })

  document.querySelector(".cart-drawer-box").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.querySelector(".svg_close_btn").addEventListener("click", () => {
    closeCartDrawer();
  });

}
addCartDrawerListeners();

document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let product_id = document.querySelector('#product-id').getAttribute('value');
    let qty = document.querySelector('#quantity').value;
    
    document.querySelector(".loader_filter").classList.add("loader_filter_active");
    document.querySelector(".layout_block_filter").classList.add("active");

    function processCart() {
      jQuery.post('/cart/add.js', {
        quantity: qty,
        id: product_id
      },
        null, 
        "json"
      ).done(function () {
        document.querySelector(".loader_filter").classList.remove("loader_filter_active");
        document.querySelector(".layout_block_filter").classList.remove("active");
        document.querySelector(".error_msg").classList.remove('error');
        openCartDrawer();
        updateCartDrawer();
      })
        .fail(function ($xhr) {
          var data = $xhr.responseJSON;
          $('.error_msg').addClass('error').html('<span><b>ERROR: </b>' + data.description);
          updateCartItemCounts();
          updateCartDrawer();
          document.querySelector(".loader_filter").classList.remove("loader_filter_active");
          document.querySelector(".layout_block_filter").classList.remove("active");
        });
    }
    processCart();
  });
});



// document.querySelector(".product-add-bundle").addEventListener("click", function () {
//   let selectedProducts = document.querySelectorAll(".bundle-product-item");

//   // console.log(selectedProducts,"123456");

//   if (selectedProducts.length === 0) {
//       alert("Please select at least one product to add.");
//       return;
//   }

//   // document.querySelector(".loader_filter").classList.add("loader_filter_active");
//   // document.querySelector(".layout_block_filter").classList.add("active");
  
//   let productsToAdd = [];
//   selectedProducts.forEach(product => {
//       let product_id = product.getAttribute("data-product-id");
//       let qty = parseInt(product.getAttribute("data-product-count")) || 1;

//       if (product_id) {
//           productsToAdd.push({ id: product_id, quantity: qty });
//       }
//   });
//   function addProductsToCart(index) {
//       if (index >= productsToAdd.length) {

//           // document.querySelector(".loader_filter").classList.remove("loader_filter_active");
//           // document.querySelector(".layout_block_filter").classList.remove("active");

//           openCartDrawer();
//           updateCartDrawer();
//           document.querySelector(".bundle_product_main_popup").classList.remove("active");
//           return;
//       }
//       let product = productsToAdd[index];
//       jQuery.post('/cart/add.js', product, null, "json")
//           .done(function () {
//               addProductsToCart(index + 1);
//           })
//           .fail(function ($xhr) {
//               var data = $xhr.responseJSON;
//               document.querySelector('.error_msg').classList.add('error');
//               document.querySelector('.error_msg').innerHTML = `<span><b>ERROR: </b>${data.description}</span>`;
//               document.querySelector(".loader_filter").classList.remove("loader_filter_active");
//               document.querySelector(".layout_block_filter").classList.remove("active");
//           });
//   }
//   addProductsToCart(0);
// });

document.querySelector(".open_cart").addEventListener("click", (e) => {
  e.preventDefault();
  openCartDrawer();
});