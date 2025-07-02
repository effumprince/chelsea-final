document.addEventListener('DOMContentLoaded', function() {
    // Render cart items
    renderCartItems();
    
    // Update cart totals
    updateCartTotals();
    
    // Quantity button functionality
    const minusBtns = document.querySelectorAll('.cart-item-quantity .minus');
    const plusBtns = document.querySelectorAll('.cart-item-quantity .plus');
    const qtyInputs = document.querySelectorAll('.cart-item-quantity .qty-input');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateCartItem(this);
            }
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            updateCartItem(this);
        });
    });
    
    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
            updateCartItem(this);
        });
    });
    
    // Remove button functionality
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = parseInt(cartItem.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    // Update cart button
    const updateCartBtn = document.querySelector('.update-cart');
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            updateCartFromInputs();
        });
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'products.html';
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }
    
    // Coupon button
    const couponBtn = document.querySelector('.coupon .btn');
    if (couponBtn) {
        couponBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const couponInput = this.previousElementSibling;
            applyCoupon(couponInput.value);
        });
    }
    
    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;
        
        // Clear existing items except header
        const header = cartItemsContainer.querySelector('.cart-header');
        cartItemsContainer.innerHTML = '';
        if (header) cartItemsContainer.appendChild(header);
        
        if (cart.length === 0) {
            const emptyCart = document.createElement('div');
            emptyCart.className = 'empty-cart';
            emptyCart.innerHTML = `
                <p>Your cart is empty</p>
                <a href="products.html" class="btn">Continue Shopping</a>
            `;
            cartItemsContainer.appendChild(emptyCart);
            return;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-id', item.id);
            cartItem.innerHTML = `
                <div class="cart-item-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="product-info">
                        <h4>${item.name}</h4>
                    </div>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="qty-input">
                    <button class="qty-btn plus">+</button>
                </div>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-remove">
                    <button class="remove-btn"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add cart actions if there are items
        if (cart.length > 0) {
            const cartActions = document.createElement('div');
            cartActions.className = 'cart-actions';
            cartActions.innerHTML = `
                <button class="btn continue-shopping"><i class="fas fa-arrow-left"></i> Continue Shopping</button>
                <button class="btn update-cart">Update Cart</button>
            `;
            cartItemsContainer.appendChild(cartActions);
        }
        
        // Reattach event listeners
        attachCartEventListeners();
    }
    
    function attachCartEventListeners() {
        // Quantity buttons
        const minusBtns = document.querySelectorAll('.cart-item-quantity .minus');
        const plusBtns = document.querySelectorAll('.cart-item-quantity .plus');
        const qtyInputs = document.querySelectorAll('.cart-item-quantity .qty-input');
        
        minusBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.nextElementSibling;
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                    updateCartItem(this);
                }
            });
        });
        
        plusBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.previousElementSibling;
                input.value = parseInt(input.value) + 1;
                updateCartItem(this);
            });
        });
        
        qtyInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (parseInt(this.value) < 1) {
                    this.value = 1;
                }
                updateCartItem(this);
            });
        });
        
        // Remove buttons
        const removeBtns = document.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const productId = parseInt(cartItem.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
        
        // Continue shopping button
        const continueShoppingBtn = document.querySelector('.continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'products.html';
            });
        }
    }
    
    function updateCartItem(element) {
        const cartItem = element.closest('.cart-item');
        const productId = parseInt(cartItem.getAttribute('data-id'));
        const quantity = parseInt(cartItem.querySelector('.qty-input').value);
        
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update the total for this item
            const totalElement = cartItem.querySelector('.cart-item-total');
            totalElement.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            
            // Update cart totals
            updateCartTotals();
        }
    }
    
    function updateCartFromInputs() {
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(cartItem => {
            const productId = parseInt(cartItem.getAttribute('data-id'));
            const quantity = parseInt(cartItem.querySelector('.qty-input').value);
            
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
            }
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotals();
        showNotification('Cart updated successfully!');
    }
    
    function updateCartTotals() {
        const subtotalElement = document.querySelector('.summary-row span:nth-child(2)');
        const shippingElement = document.querySelectorAll('.summary-row')[1].querySelector('span:nth-child(2)');
        const taxElement = document.querySelectorAll('.summary-row')[2].querySelector('span:nth-child(2)');
        const totalElement = document.querySelector('.grand-total span:nth-child(2)');
        
        if (!subtotalElement) return;
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = 5.99; // Fixed shipping for simplicity
        const tax = subtotal * 0.07; // 7% tax
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    }
    
    function applyCoupon(code) {
        // Simple coupon logic - in a real app, this would be more complex
        if (code.toUpperCase() === 'BEAUTY10') {
            showNotification('Coupon applied: 10% off your order!');
            // Here you would implement the discount logic
        } else if (code) {
            showNotification('Invalid coupon code');
        }
    }
});