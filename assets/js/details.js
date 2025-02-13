let card = [];
let selectedQuantity = 1;

function saveCartToLocalStorage () {
  localStorage.setItem('card', JSON.stringify(card));
}

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('card')
  card = storedCart ? JSON.parse(storedCart) : [];
}

const overlay = document.querySelector(".overlay");

document.querySelector(".increase").addEventListener('click', function() {
  selectedQuantity++;
  document.querySelector(".quantity").innerText = selectedQuantity
})
document.querySelector(".decrease").addEventListener('click', function() {
  if(selectedQuantity > 1) {
    selectedQuantity--;
    document.querySelector(".quantity").innerText = selectedQuantity
  }
})


let addBtn = document.querySelector('.addBtn').addEventListener('click', function () {
  overlay.style.display = "block";
  myDialog.showModal();

  const productNames = productName.innerText
  const productPrices = productPrice.innerText
  const priceNumber = parseFloat(productPrices.replace('$', '').replace(',', ''));
  console.log(priceNumber);

  loadCartFromLocalStorage();

  const productPhotos = productPhoto.src
  const foundedProduct = card.find(x => x.name === productNames)

  if (foundedProduct) {
    foundedProduct.quantity += selectedQuantity;
  } else {
    card.push({ name: productNames, price: priceNumber, quantity: selectedQuantity, image: productPhotos })
  }

  saveCartToLocalStorage();
  updateCard();

  selectedQuantity = 1;
  document.querySelector(".quantity").innerText = selectedQuantity
})

function updateCard() {

  let cardLength = card.length
  document.querySelector('.cardLength').innerText = `(${cardLength})`

  const productList = document.querySelector('.dialog-product-list');
  productList.innerHTML = ""
  let totalPrice = 0;

  card.forEach((x,i)=> {
    totalPrice += (x.price * x.quantity)
    const formattedTotalPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(totalPrice);
    productList.innerHTML += `
      <div class="dialog-product-part">
        <div class="product-left">
          <img src=${x.image} alt="">
        </div>
        <div class="product-middle" >
          <h2>${x.name}</h2>
          <h4>${x.price}</h4>
        </div>
        <div class="product-right">
          <button class="btn decrement"  data-id="${i}" >-</button>
          <span class="counter">${x.quantity}</span>
          <button class="btn increment" data-id="${i}">+</button>
        </div>
      </div>
      `
    document.getElementById('total').innerText = `${formattedTotalPrice} `

  });

  // Eğer sepet boşsa toplam fiyatı sıfırla
  if(card.length === 0) {
    total.innerText = "0"
  }


  removeBtn.addEventListener('click', function () {
    card = [];
    saveCartToLocalStorage();
    updateCard()

  })

  // quantity decrease/increase
  document.querySelectorAll('.increment').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.dataset.id;
      if(card[index]) {
        card[index].quantity += 1;
        saveCartToLocalStorage ()
        updateCard()
      }
    })
  })

  document.querySelectorAll('.decrement').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.dataset.id;
      if(card[index].quantity > 1) {
        card[index].quantity--;

      }else {
        card.splice(index, 1)
      }
      saveCartToLocalStorage ()
      updateCard()
    })
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

// document.querySelector('.checkout-btn').addEventListener('click', function () {
//   window.location.href = "checkout.html";
// });

loadCartFromLocalStorage();
updateCard();

