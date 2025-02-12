let card = [];
let totalPrice = "";
const overlay = document.querySelector(".overlay");
let addBtn = document.querySelector('.addBtn').addEventListener('click', function () {
  overlay.style.display = "block";
  myDialog.showModal();
  const productNames = productName.innerText
  const productPrices = productPrice.innerText
  const productPhotos = productPhoto.src
  card.push({ name: productNames, price: productPrices, quantity: 1, image: productPhotos })
  totalPrice += productPrices
  console.log(card)
  updateCard();
})

function updateCard() {
  let cardLength = card.length
  myDialog.innerHTML=`
          <div class="dialog-top">
          <h3>Cart <span>(0)</span></h3>
          <button class="remove-all" id="removeBtn">Remove All</button>
        </div>
        </div>
        <div class="dialog-bottom">
          <h6>TOTAL</h6>
          <span id="total" > </span>
        </div>
    <button class="checkout-btn">CHECKOUT</button>
  `
  card.forEach(x => {
    myDialog.innerHTML = `
        <div class="dialog-top">
          <h3>Cart <span>(${cardLength})</span></h3>
          <button class="remove-all" id="removeBtn">Remove All</button>
        </div>
        <div class="dialog-product-part">
          <div class="product-left">
            <img src=${x.image} alt="">
          </div>
          <div class="product-middle" >
            <h2>${x.name}</h2>
            <h4>${x.price}</h4>
          </div>
          <div class="product-right">
            <button class="btn decrement">-</button>
            <span class="counter">0</span>
            <button class="btn increment">+</button>
          </div>
        </div>
        <div class="dialog-bottom">
          <h6>TOTAL</h6>
          <span id="total"> </span>
        </div>
      `
  });
  document.getElementById('total').innerText= `${totalPrice} `
  removeBtn.addEventListener('click', function(){
    card = [];
    totalPrice ="0";
    updateCard()

  })
 
}

// close the dialog with overlay
myDialog.addEventListener("click", (event) => {
  const dialogBounds = myDialog.getBoundingClientRect();
  const isInsideDialog = (
    event.clientX >= dialogBounds.left &&
    event.clientX <= dialogBounds.right &&
    event.clientY >= dialogBounds.top &&
    event.clientY <= dialogBounds.bottom
  );

  if (!isInsideDialog) {
    myDialog.close();
    overlay.style.display = "none";
  }
});
// end the close event

let basketBtn = document.querySelector('.basketBtn').addEventListener('click', function () {
  myDialog.showModal();
})


