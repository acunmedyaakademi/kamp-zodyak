const dialogPart = document.querySelector(".dialog-product-part");
const totalElement = document.querySelector("#total"); // Total gösterecek element

let data = JSON.parse(localStorage.getItem('card')); // Veriyi JSON olarak parse et

let basketBtn = document.querySelector('.basketBtn').addEventListener('click', function () {
    myDialog.showModal();
    dialogPart.innerHTML = ''; // Her seferinde yeni içerik eklemek için temizle (varsa eski içerikleri temizle)

    let total = 0; // Toplam fiyatı tutacak değişken

    // Eğer data bir array ise, her ürün için HTML oluştur
    if (Array.isArray(data)) {
        data.forEach((x, i) => {
            dialogPart.innerHTML += `
            <div class="dialog-product-part" data-index="${i}">
                <div class="product-left">
                    <img src="${x.image}" alt="">
                </div>
                <div class="product-middle">
                    <h2>${x.name}</h2>
                    <h4 class="price" data-price="${x.price}">${x.price * x.quantity}</h4> <!-- Fiyatı toplam fiyat ile göster -->
                </div>
                <div class="product-right">
                    <button class="btn decrement" data-id="${i}">-</button>
                    <span class="counter">${x.quantity}</span>
                    <button class="btn increment" data-id="${i}">+</button>
                </div>
            </div>
            `;
            total += x.price * x.quantity; // Her ürünün fiyatını toplama ekle
        });
    } else {
        console.log("Data bir array değil!");
    }

    // Toplam fiyatı total kısmına ekle
    totalElement.innerText = `$${total.toFixed(2)}`; // Toplamı ekrana yazdır

    // Artı butonuna tıklanınca miktarı artır
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.id;
            if (data[index]) {
                data[index].quantity += 1; // Quantity'yi artır
                updateProduct(index); // Ürün bilgisini güncelle
                updateTotal(); // Toplamı güncelle
            }
        });
    });

    // Eksi butonuna tıklanınca miktarı azalt
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.id;
            if (data[index] && data[index].quantity > 0) {
                data[index].quantity -= 1; // Quantity'yi azalt
                updateProduct(index); // Ürün bilgisini güncelle
                updateTotal(); // Toplamı güncelle
            }
        });
    });
});

// Ürün bilgisini güncelle
function updateProduct(index) {
    const product = data[index];
    const productElement = dialogPart.querySelector(`.dialog-product-part[data-index="${index}"]`);
    const priceElement = productElement.querySelector('.price');
    const quantityElement = productElement.querySelector('.counter');

    // Eğer ürünün miktarı 0'a düştüyse, ürünü kaldır
    if (product.quantity === 0) {
        // Ürünü HTML'den kaldır
        productElement.remove();
        // Ürünü localStorage'dan sil
        data.splice(index, 1);
    } else {
        // Yeni miktarı ve fiyatı güncelle
        priceElement.innerText = product.price * product.quantity; // Fiyatı güncelle
        quantityElement.innerText = product.quantity; // Miktarı güncelle
    }

    // LocalStorage'ı güncelle
    localStorage.setItem('card', JSON.stringify(data));
}

// Toplam fiyatı güncelle
function updateTotal() {
    let total = 0; // Toplam fiyatı sıfırla

    // Data array'ini tekrar kontrol ederek toplam fiyatı hesapla
    if (Array.isArray(data)) {
        data.forEach(x => {
            total += x.price * x.quantity;
        });
    }

    // Hesaplanan toplam fiyatı göster
    totalElement.innerText = `$${total.toFixed(2)}`;
}

// Modalın dışına tıklanınca kapansın
myDialog.addEventListener('click', function (event) {
    if (event.target === myDialog) { // Eğer tıklanan yer modalın kendisi ise
        myDialog.close(); // Modalı kapat
        console.log(Array.isArray(data)); // Bu, data'nın bir array olup olmadığını kontrol eder
        console.log(localStorage); // LocalStorage içeriği
    }
});
