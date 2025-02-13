// import { card, saveCartToLocalStorage } from './details.js';

const checkoutList = document.querySelector('.checkout-list');
const order = document.querySelector('.order-total');

const storedCard = localStorage.getItem('card');
const card = storedCard ? JSON.parse(storedCard) : [];

let total = 0;
card.forEach(element => {
  total += element.price * element.quantity;
});
const shipping = 50
const vat = total * 0.2;

const formattedTotalPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(total);

const formattedVatPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(vat);

const formattedTotal = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(total + vat + shipping);


checkoutList.innerHTML += card.map(item => 
  `
    <div class="checkout-item">
      <img src=${item.image} alt="">
      <div class="checkout-product-detail">
        <h3>${item.name}</h3>
        <p>$ ${item.price}</p>
      </div>
      <p>x${item.quantity}</p>
    </div>
  `
).join('')

order.innerHTML += 
  `
    <div class="pay-details">
      <div class="pay">
        <p>Total</p>
        <h6>${formattedTotalPrice}</h6>
      </div>
      <div class="pay">
        <p>Shipping</p>
        <h6>$ ${shipping}</h6>
      </div>
      <div class="pay">
        <p>Vat (included)</p>
        <h6>${formattedVatPrice}</h6>
      </div>
      <div class="total">
        <p>Grand Total : </p>
        <h6>${formattedTotal}</h6>
      </div>
      <a href="#" class="completed-pay">Continue & Pay</a>
    </div>
  `
console.log(card);
const overlay = document.querySelector(".overlay");


document.querySelector('.completed-pay').addEventListener('click', function() {
  const endDialog = document.querySelector('.endDialog');
  overlay.style.display = "block";
  endDialog.showModal();
})

document.querySelector('.form').addEventListener('click', function(e) {
  e.preventDefault();
})


const dialogCard = document.querySelector('.end-dialog-card');
dialogCard.innerHTML +=
`
  <div class="dialog-card-top">
    <img src=${card[0].image} alt="Product Image">
    <div class="dialog-card-text">
      <h3>${card[0].name}</h3>
      <h4>${card[0].price}</h4>
    </div>
    <span>${card[0].quantity}</span> -->
  </div>
  ${card.length > 1 ? `<p>and ${card.length - 1} other item(s)</p>` : ''}
  <div class="dialog-card-bottom">
    <h5>GRAND TOTAL</h5>
    <span class="grand-total">${formattedTotal}</span> -->
  </div>
` 


function goBack() {
  window.history.back();
}
