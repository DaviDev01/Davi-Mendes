const addSampleProductBtn = document.getElementById('add-sample-btn');
const productsElement = document.getElementById('products');
const searchInputElement = document.getElementById('search-input');

function renderProduct(product) {
    const cardElement = document.createElement('article');
    
    cardElement.className = "product-card";

    cardElement.innerHTML = `
        <img class="product-card-img" src="${product?.image}" alt="${product?.title}">
        
        <div class="product-card-content">
            <h2 class="product-card-title">
            ${product?.title}
            </h2>

            <p class="product-card-description">
            ${product?.description}
            </p>

            <p class="product-card-price">
            $${product?.price}
            </p>

            <button class="product-card-action">
            Add to Cart
            </button>
        </div>
    `;

    return cardElement;
}

function searchProduct() {
    const searchTerm = searchInputElement.value.toLowerCase();
    
    const productCards = document.querySelectorAll('.product-card')

    productCards.forEach(productCard => {
        const cardTitle = productCard.querySelector('.product-card-title').textContent.toLowerCase();
        
        const matches = cardTitle.includes(searchTerm);

        productCard.classList.toggle('hidden', !matches);
    });
}

addSampleProductBtn.addEventListener('click', function () {
    const sampleProductData = {
        title: 'Jacket',
        description: 'Comfortable Jacket',
        image: './assets/model-pic-one.jpg',
        price: 90
    }

    const cardElement = renderProduct(sampleProductData);

    productsElement.appendChild(cardElement);
});

searchInputElement.addEventListener('input', searchProduct);

productsElement.addEventListener('click', function (event) {
    if (!event.target.classList.contains('product-card-action')) return;

    const btnElement = event.target;
    const card = btnElement.closest(".product-card");

    const isAdded = card.classList.toggle("added");

    btnElement.textContent = isAdded ? 'Added' : 'Add To Cart';
})