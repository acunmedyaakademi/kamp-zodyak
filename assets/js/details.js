let card=[];
let totalPrice = 0;

let addBtn = document.querySelector('.addBtn').addEventListener('click', function(){
  myDialog.showModal();
  const productNames = productName.innerText
  const productPrices = productPrice.innerText
  console.log(productNames)
  card.push({name:productNames, price:productPrices})
})


let basketBtn = document.querySelector('.basketBtn').addEventListener('click', function(){
  myDialog.showModal();
})


