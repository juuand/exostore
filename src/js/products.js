const productContainer = document.getElementById("products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    products.forEach((product) => {
      const div = document.createElement("div");
      div.className =
        "mt-6 border bg-white rounded shadow p-4 w-[200px] flex flex-col items-center";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-[200px] object-contain mb-2">
        <h3 class="font-semibold text-center text-sm">${product.title}</h3>
        <p class="text-blue-500 font-bold mt-1 mb-2">$${product.price}</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Add to Cart</button>
      `;

      // tombol
      const button = div.querySelector("button");
      button.addEventListener("click", () => {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        // 🎉 Notifikasi manis pakai SweetAlert
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `${product.title} ditambahkan ke keranjang.`,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });
      });

      productContainer.appendChild(div);
    });
  });
