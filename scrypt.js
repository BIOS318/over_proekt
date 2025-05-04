document.addEventListener('DOMContentLoaded', function() {
    const mockData = {
        "iphone 13": [
            {
                store: "wildberries",
                name: "Смартфон Apple iPhone 13 128GB Midnight",
                price: 64990,
                originalPrice: 69990,
                url: "https://www.wildberries.ru/catalog/12345678/detail.aspx",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Wildberries_logo.svg/1200px-Wildberries_logo.svg.png"
            },
            {
                store: "ozon",
                name: "Apple iPhone 13 128GB (полноценная версия)",
                price: 65990,
                originalPrice: 68990,
                url: "https://www.ozon.ru/product/12345678",
                logo: "https://ozon-st.cdn.ngenix.net/marketing/logo/ozon_340x340.png"
            }
        ],
        "samsung galaxy s22": [
            {
                store: "wildberries",
                name: "Смартфон Samsung Galaxy S22 8/128GB Phantom Black",
                price: 54990,
                originalPrice: 59990,
                url: "https://www.wildberries.ru/catalog/87654321/detail.aspx",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Wildberries_logo.svg/1200px-Wildberries_logo.svg.png"
            },
            {
                store: "citilink",
                name: "Samsung Galaxy S22 8/128GB (SM-S901BZKHSER)",
                price: 52990,
                originalPrice: 57990,
                url: "https://www.citilink.ru/product/87654321",
                logo: "https://www.citilink.ru/static/shop/v1/design/images/logo/logo.svg"
            }
        ],
        "airpods pro": [
            {
                store: "ozon",
                name: "Наушники Apple AirPods Pro 2",
                price: 19990,
                originalPrice: 24990,
                url: "https://ozon.ru/airpods-pro2",
                logo: "https://ozon-st.cdn.ngenix.net/marketing/logo/ozon_340x340.png"
            },
            {
                store: "yandex",
                name: "Apple AirPods Pro 2 (2023)",
                price: 18990,
                originalPrice: 22990,
                url: "https://market.yandex.ru/product--apple-airpods-pro-2/12345678",
                logo: "https://avatars.mds.yandex.net/get-bunker/60661/4c8c5d09b899ced01b3a0b5b1a1a3273f5466f15/orig"
            }
        ]
    };

    const searchBtn = document.getElementById('search-btn');
    const productSelect = document.getElementById('product-select');
    const storeSelect = document.getElementById('stores-select');
    const resultsTable = document.getElementById('results-table');

    function displayResults(products) {
        if (!products || products.length === 0) {
            resultsTable.innerHTML = '<div class="no-results"><p>Товары не найдены.</p></div>';
            return;
        }

        products.sort((a, b) => a.price - b.price);

        let html = '';
        products.forEach(product => {
            const discount = product.originalPrice ? 
                Math.round((1 - product.price / product.originalPrice) * 100) : 
                0;
            
            html += `
                <div class="result-item">
                    <div class="store-info">
                        <img src="${product.logo}" alt="${product.store}" class="store-logo">
                        <div>
                            <h3>${product.name}</h3>
                            <p>${product.store.charAt(0).toUpperCase() + product.store.slice(1)}</p>
                        </div>
                    </div>
                    <div class="price-info">
                        ${product.originalPrice ? `
                            <p class="original-price">${product.originalPrice.toLocaleString()} ₽</p>
                            <p class="discount">-${discount}%</p>
                        ` : ''}
                        <p class="price">${product.price.toLocaleString()} ₽</p>
                        <a href="${product.url}" target="_blank" class="goto-btn">Перейти</a>
                    </div>
                </div>
            `;
        });

        resultsTable.innerHTML = html;
    }

    searchBtn.addEventListener('click', function() {
        const selectedProduct = productSelect.value;
        const selectedStore = storeSelect.value;
        
        if (!selectedProduct) {
            alert('Выберите товар из списка');
            return;
        }

        let foundProducts = mockData[selectedProduct] || [];

        if (selectedStore && selectedStore !== "all") {
            foundProducts = foundProducts.filter(p => p.store === selectedStore);
        }

        displayResults(foundProducts);
    });

    storeSelect.addEventListener('change', function() {
        if (productSelect.value) {
            searchBtn.click();
        }
    });
});