let card = [];
let totalPrice = 0;
const overlay = document.querySelector(".overlay");
let addBtn = document.querySelector('.addBtn').addEventListener('click', function () {
  overlay.style.display = "block";
  myDialog.showModal();
  const productNames = productName.innerText
  const productPrices = productPrice.innerText
  const priceNumber = parseFloat(productPrices.replace('$', '').replace(',', ''));
  console.log(priceNumber);
  const productPhotos = productPhoto.src
  const foundedProduct = card.find(x => x.name === productNames)
  if (foundedProduct) {
    foundedProduct.quantity += 1
  } else {
    card.push({ name: productNames, price: priceNumber, quantity: 1, image: productPhotos })
  }
  console.log(card)
  console.log(foundedProduct)
  updateCard();
})

function updateCard() {

  let cardLength = card.length
  const cardLengthHtml = document.querySelector('.cardLength').innerText = `(${cardLength})`
  const productList = document.querySelector('.dialog-product-part');
  productList.innerHTML = ""
  card.forEach(x => {
    totalPrice = (x.price * x.quantity)
    const formattedTotalPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(totalPrice);
    productList.innerHTML = `
      <div class="product-left">
        <img src=${x.image} alt="">
      </div>
      <div class="product-middle" >
        <h2>${x.name}</h2>
        <h4>${x.price}</h4>
      </div>
      <div class="product-right">
        <button class="btn decrement">-</button>
        <span class="counter">${x.quantity}</span>
        <button class="btn increment">+</button>
      </div>

      `
    document.getElementById('total').innerText = `${formattedTotalPrice} `
  });
  removeBtn.addEventListener('click', function () {
    card = [];
    totalPrice = "0";
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


