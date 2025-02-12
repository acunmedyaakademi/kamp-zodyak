let card=[];
let totalPrice = 0;
const overlay = document.querySelector(".overlay");
let addBtn = document.querySelector('.addBtn').addEventListener('click', function(){
  overlay.style.display = "block";
  myDialog.showModal();
  const productNames = productName.innerText
  const productPrices = productPrice.innerText
  card.push({name:productNames, price:productPrices})
  console.log(card)
})
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

let basketBtn = document.querySelector('.basketBtn').addEventListener('click', function(){
  myDialog.showModal();
})


