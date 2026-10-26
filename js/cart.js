// SPEC CART / MULTI-ITEM INQUIRY SYSTEM
function addToCart(itemId) {
  const item = CATALOGUE_DATA.find((i) => i.id === itemId);
  if (!item) return;

  if (!cartItems.some((i) => i.id === itemId)) {
    cartItems.push(item);
    updateCartBadge();
    alert(`Added "${item.name}" to your Spec Inquiry Cart.`);
  } else {
    alert(`"${item.name}" is already in your Spec Cart.`);
  }
}

// remove item from cart
function removeFromCart(itemId) {
  cartItems = cartItems.filter((i) => i.id !== itemId);
  updateCartBadge();
  renderCartItems();
}

// update cart badge
function updateCartBadge() {
  document.getElementById("cartBadge").innerText = cartItems.length;
  document.getElementById("cartCountBtn").innerText = cartItems.length;
}

// open cart modal
function openCartModal() {
  renderCartItems();
  document.getElementById("cartModal").classList.remove("hidden");
}

// close cart modal
function closeCartModal() {
  document.getElementById("cartModal").classList.add("hidden");
}

// render cart items in modal
function renderCartItems() {
  const container = document.getElementById("cartItemsContainer");
  if (cartItems.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Your Spec Cart is empty. Add items from the catalogue to request bulk pricing.</p>`;
    return;
  }

  container.innerHTML = cartItems
    .map(
      (item) => `
                <div class="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                    <div>
                        <span class="font-bold text-navy-900">${item.name}</span>
                        <span class="text-slate-400 text-[10px] block">Code: ${item.id} | MOQ: ${item.moq}</span>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 text-sm font-bold px-2">&times;</button>
                </div>
            `,
    )
    .join("");
}

//handle cart submission
function handleCartSubmit(e) {
  e.preventDefault();
  if (cartItems.length === 0) {
    showToast(
      "Cart Empty",
      "Please add at least one item to your cart before submitting.",
      "error",
    );
    return;
  }
  const email = document.getElementById("cartEmail").value;
  const port = document.getElementById("cartPort").value;

  closeCartModal();
  showToast(
    "RFQ Submitted",
    `Combined RFQ successfully submitted for ${cartItems.length} items to ${email}!`,
    "success",
  );
  cartItems = [];
  updateCartBadge();
}


