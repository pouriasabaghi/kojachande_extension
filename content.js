const button = document.createElement("button");
button.textContent = "کجا چنده";
button.style = ` 
  width: 100px;
  color: white;
  background-color: #ef4056;
  font-weight:bold;
  padding: 10px;
  border-radius: 0.5rem;
  margin: auto;
  top: 8px;
  left: -85px;
  position: fixed;
  z-index: 999999999;
  border: none;
  transition:left 500ms;
  `;

window.addEventListener("load", () => {
  button.style.left = "23px";
});

button.addEventListener("click", () => {
  const productNameElement = document.querySelector("h1");
  const productPriceElement = document.querySelector(".text-h4-compact[data-testid='price-final']") || document.querySelector(".text-neutral-800[data-testid='price-no-discount']");

  if (!productNameElement) {
    alert("لطفا تا نمایش نام محصول روی صفحه صبر کنید.");
    return;
  }

  chrome.runtime.sendMessage({
    action: "open_popup",
    product: {
      name: productNameElement.textContent,
      price:fixNumber(productPriceElement?.textContent.replaceAll(",", "")),
      origin:window.location.hostname,
    },
  });
});

document.body.appendChild(button);


function fixNumber(str) {
  let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
  let arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

  if (typeof str === 'string') {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}
