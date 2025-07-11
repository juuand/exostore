const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");

function renderCart() {
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = `<p class="mt-6 text-gray-600">Keranjang kosong. Silakan kembali berbelanja.</p>`;
    return;
  }

  cartItems.forEach((product, index) => {
    const div = document.createElement("div");
    div.className =
      "border bg-white p-4 rounded shadow w-[200px] flex flex-col items-center mt-6";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-full h-[150px] object-contain mb-2">
      <h3 class="font-semibold text-sm text-center">${product.title}</h3>
      <p class="text-blue-500 font-bold mt-1 mb-2">$${product.price}</p>
      <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Hapus</button>
    `;

    const deleteBtn = div.querySelector("button");
    deleteBtn.addEventListener("click", () => {
      cartItems.splice(index, 1); // Hapus item ke-index
      localStorage.setItem("cart", JSON.stringify(cartItems)); // Simpan ulang
      renderCart(); // Refresh tampilan
    });

    container.appendChild(div);
  });
}

// Jalankan saat halaman cart dibuka
renderCart();
