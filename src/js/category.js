
document.querySelectorAll("button[data-category]").forEach((button) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    fetch(
      `https://fakestoreapi.com/products/category/${encodeURIComponent(
        category
      )}`
    )
      .then((res) => res.json())
      .then((products) => {
        const container = document.getElementById("products");
        container.innerHTML = ""; // Kosongkan dulu
        products.forEach((product) => {
          const div = document.createElement("div");
          div.className =
            "border mt-6 bg-white p-4 shadow rounded text-center w-[200px]";
          div.innerHTML = `
            <img src="${product.image}" class="w-full h-40 object-contain mb-2" />
            <h3 class="text-sm font-semibold">${product.title}</h3>
            <p class="text-blue-500 font-bold mb-2">$${product.price}</p>
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Add to Cart</button>
          `;

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

          container.appendChild(div);
        });
      });
  });
});
