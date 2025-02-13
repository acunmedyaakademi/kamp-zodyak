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

document.querySelector('.form').addEventListener('click', function(e) {
  e.preventDefault();
})

function goBack() {
  window.history.back();
}
