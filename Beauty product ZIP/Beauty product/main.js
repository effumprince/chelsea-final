// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Product tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
            });
        });
    }
    
    // Product image thumbnail click functionality
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.src.replace('-thumb', '');
                mainImage.src = newSrc;
            });
        });
    }
    
    // Quantity buttons functionality
    const minusBtns = document.querySelectorAll('.qty-btn.minus');
    const plusBtns = document.querySelectorAll('.qty-btn.plus');
    const qtyInputs = document.querySelectorAll('.qty-input');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });
    
    // Rating stars functionality
    const ratingStars = document.querySelectorAll('.rating-input i');
    
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                const container = this.parentElement;
                
                // Reset all stars
                container.querySelectorAll('i').forEach(s => {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                });
                
                // Fill stars up to the clicked one
                for (let i = 0; i < rating; i++) {
                    container.children[i].classList.remove('far');
                    container.children[i].classList.add('fas', 'active');
                }
            });
        });
    }
    
    // Load featured products (simulated)
    const featuredProductsGrid = document.querySelector('.featured-products .product-grid');
    const productGrid = document.querySelector('.products-page .product-grid');
    const relatedProductsGrid = document.querySelector('.related-products .product-grid');
    const crossSellGrid = document.querySelector('.cross-sell .product-grid');
    
    const products = [
        {
            id: 1,
            name: "Hydrating Facial Moisturizer",
            price: 24.99,
            image: "/images/55ba2c1b3869765cc46c7047862488ed.jpg",
            category: "skincare",
            rating: 4.5,
            reviews: 42,
            badge: "Bestseller"
        },
        {
            id: 2,
            name: "Matte Lipstick - Ruby Red",
            price: 16.99,
            image: "images/63e4811bc622783df8f00b71993191b6.jpg",
            category: "makeup",
            rating: 4.8,
            reviews: 35,
            badge: "New"
        },
        {
            id: 3,
            name: "Volumizing Shampoo",
            price: 18.99,
            image: "images/b7b759de624b1d78cabae379966cac35.jpg",
            category: "haircare",
            rating: 4.2,
            reviews: 28
        },
        {
            id: 4,
            name: "Anti-Aging Serum",
            price: 34.99,
            oldPrice: 39.99,
            image: "images/b4f7d2d00e1959e7032f6907f664cce8.jpg",
            category: "skincare",
            rating: 4.7,
            reviews: 56,
            badge: "Sale"
        },
        {
            id: 5,
            name: "Eyeshadow Palette - Nude",
            price: 29.99,
            image: "images/e2e0da9e0b0d96e0ea19319af1e9b412.jpg",
            category: "makeup",
            rating: 4.9,
            reviews: 72
        },
        {
            id: 6,
            name: "Deep Conditioner",
            price: 22.99,
            image: "images/f84de2d4bed0c30461cb75d356bb0001.jpg",
            category: "haircare",
            rating: 4.3,
            reviews: 19
        },
        {
            id: 7,
            name: "Facial Cleanser",
            price: 19.99,
            image: "images/cf6461455edc750272e740b526650904.jpg",
            category: "skincare",
            rating: 4.6,
            reviews: 38
        },
        {
            id: 8,
            name: "Mascara - Black",
            price: 14.99,
            image: "images/64421decb6d49e74eab3883db9aab02d.jpg",
            category: "makeup",
            rating: 4.4,
            reviews: 47
        }
    ];
    
    function renderProducts(productsArray, container) {
        if (!container) return;
        
        container.innerHTML = '';
        
        productsArray.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">
                        $${product.price.toFixed(2)}
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${renderStars(product.rating)} (${product.reviews})
                    </div>
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            container.appendChild(productElement);
        });
        
        // Add event listeners to add-to-cart buttons
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }
    
    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
    
    // Render featured products on home page
    if (featuredProductsGrid) {
        const featuredProducts = products.slice(0, 4);
        renderProducts(featuredProducts, featuredProductsGrid);
    }
    
    // Render all products on products page
    if (productGrid) {
        renderProducts(products, productGrid);
        
        // Filter functionality
        const categoryFilter = document.getElementById('category');
        const sortFilter = document.getElementById('sort');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterProducts);
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', filterProducts);
        }
        
        function filterProducts() {
            let filteredProducts = [...products];
            
            // Filter by category
            const category = categoryFilter.value;
            if (category !== 'all') {
                filteredProducts = filteredProducts.filter(p => p.category === category);
            }
            
            // Sort products
            const sort = sortFilter.value;
            switch (sort) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    // Default sorting (by ID or whatever)
                    break;
            }
            
            renderProducts(filteredProducts, productGrid);
        }
    }
    
    // Render related products on product detail page
    if (relatedProductsGrid) {
        const relatedProducts = products.slice(0, 4);
        renderProducts(relatedProducts, relatedProductsGrid);
    }
    
    // Render cross-sell products on cart page
    if (crossSellGrid) {
        const crossSellProducts = products.slice(4, 8);
        renderProducts(crossSellProducts, crossSellGrid);
    }
    
    // Initialize cart count
    updateCartCount();
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    countElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Notification styles (added dynamically)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);