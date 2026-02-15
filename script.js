document.addEventListener('DOMContentLoaded', () => {
    const addSampleProductBtn = document.getElementById('add-sample-btn');
    const productsElement = document.getElementById('products');
    const searchInputElement = document.getElementById('search-input');
    const searchNotFoundElement = document.getElementById('not-found-message');

    const CLASS_HIDDEN = 'hidden';
    const CLASS_ADDED = 'added';

    function renderProduct(product) {
        const cardElement = document.createElement('article');
        
        cardElement.className = "product-card";

        cardElement.innerHTML = `
            <img class="product-card-img" draggable="false" src="${product.image}" loading="lazy" alt="${product.title}">
            
            <div class="product-card-content">
                <h2 class="product-card-title">
                ${product.title}
                </h2>

                <p class="product-card-price">
                $${product.price}
                </p>

                <p class="product-card-description">
                ${product.description}
                </p>

                <button class="product-card-action btn-states">
                Add to Cart
                </button>
            </div>
        `;

        return cardElement;
    }

    function searchProduct() {
        const searchTerm = searchInputElement.value.toLowerCase().trim();
        
        const productCards = productsElement.querySelectorAll('.product-card');

        let productsVisible = 0;

        productCards.forEach(productCard => {
            const cardTitle = productCard.querySelector('.product-card-title').textContent.toLowerCase();
            
            const matches = cardTitle.includes(searchTerm);

            productCard.classList.toggle(CLASS_HIDDEN, !matches);

            matches && productsVisible++;
        });

        searchNotFoundElement.classList.toggle(CLASS_HIDDEN, (productsVisible > 0) || (searchTerm === ""));
    }

    addSampleProductBtn.addEventListener('click', function () {
        const sampleProductData = {
            title: 'Jacket',
            description: 'Rugged earth-toned canvas with a tailored fit. The perfect everyday layer.',
            image: './assets/model-pic-one.jpg',
            price: 90
        }

        const cardElement = renderProduct(sampleProductData);

        if (searchInputElement.value !== '') {
            searchInputElement.value = '';
            searchProduct();
        }

        productsElement.appendChild(cardElement);
        console.log(searchInputElement.value);
        
    });

    searchInputElement.addEventListener('input', searchProduct);

    productsElement.addEventListener('click', function (event) {
        if (!event.target.classList.contains('product-card-action')) return;

        const btnElement = event.target;
        const card = btnElement.closest(".product-card");

        const isAdded = card.classList.toggle(CLASS_ADDED);

        btnElement.textContent = isAdded ? 'Added' : 'Add To Cart';
    })
});