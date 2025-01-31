chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "get_prices") {
    const { name, price } = request.product;

    const main = document.body.querySelector("main");
    const fetchData = async () => {
      try {
        main.innerHTML = loading();
        const response = await fetch("http://localhost:8000/api/v1/prices", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_name: name, product_price: price }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        main.innerHTML = loading(false);

        data.forEach((item) => {
          if (!item.error) {
            const list = `<ul class="product--list">${item
              .map((item) => productItem(item))
              .join("")}</ul>`;
            main.innerHTML += list;
            
            // handle image error
            document
              .querySelectorAll("img")
              .forEach((img) =>
                img.addEventListener("error", handleImageError)
              );

          } else {
            main.innerHTML += `<span class="error">${item.error}</span>`;
          }
        });
      } catch (error) {
        main.innerHTML = `<span class="error">${error.message}</span>`;
        console.error(error);
      }
    };

    fetchData();
  }
});

function productItem(product) {
  return `
    <li class="product--item">
      <img class="product--image" src="${product.image}"  onerror="handleImageError(event);"  />
      <div class="product--item-text">
        <a class="product--link" href="${product.link}" target="_blank">
          <span>${product.product}</span>
        </a>
        <div>
          <span class="badge badge--danger">در ${product.shop_name}</span> &nbsp;
          <span data-compare="${product.price_compare}" class="product--price">${product.price}</span> 
        </div>
      </div>
    </li>
          `;
}

function loading(status = true) {
  if (status)
    return `<img style="display:block;margin:auto;" width="100px" height="100px" src="./loading.svg" />`;

  return "";
}

function handleImageError(event) {
  event.target.src = "./logo.svg";
}
