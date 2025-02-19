const kc = createWrapper();

const button = createButton();
const hide = createHide();

kc.appendChild(hide);
kc.appendChild(button);

document.body.appendChild(kc);

function createWrapper() {
  const kc = document.createElement("div");
  addStyles(kc, {
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
    justifyContent: "center",
    color: "white",
    backgroundColor: "#ef4056",
    fontWeight: "bold",
    borderRadius: "0.5rem",
    margin: "auto",
    top: "8px",
    left: "-85px",
    position: "fixed",
    zIndex: "999999999",
    border: "none",
    overflow: "hidden",
    transition: "left 500ms",
  });

  window.addEventListener("load", () => {
    kc.style.left = "23px";
  });

  return kc;
}

function createButton() {
  const button = document.createElement("button");
  button.textContent = "کجاچنده";
  addStyles(button, {
    color: "white",
    padding: "8px 0px 8px 8px",
  });

  button.addEventListener("click", () => {
    const productNameElement = document.querySelector("h1");
    const productPriceElement =
      document.querySelector(".text-h4-compact[data-testid='price-final']") ||
      document.querySelector(
        ".text-neutral-800[data-testid='price-no-discount']"
      );

    if (!productNameElement) {
      alert("لطفا تا نمایش نام محصول روی صفحه صبر کنید.");
      return;
    }

    chrome.runtime.sendMessage({
      action: "open_popup",
      product: {
        name: productNameElement.textContent,
        price: fixNumber(productPriceElement?.textContent.replaceAll(",", "")),
        origin: window.location.hostname,
      },
    });
  });

  return button;
}

function createHide() {
  const hide = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hide.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  hide.setAttribute("fill", "none");
  hide.setAttribute("viewBox", "0 0 24 24");
  hide.setAttribute("stroke", "currentColor");
  hide.setAttribute("width", "24");
  hide.setAttribute("height", "24");
  addStyles(hide, {
    backgroundColor: "#de354a",
    height: "35px",
    cursor: "pointer",
    transition: "transform 300ms",
  });

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("d", "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18");

  // add hide event
  hide.addEventListener("click", () => {
    hide.classList.toggle("hide");

    if (hide.classList.contains("hide")) {
      kc.style.left = "-63px";
      hide.style.transform = "rotateY(180deg)";
    } else {
      kc.style.left = "23px";
      hide.style.transform = "rotateY(0deg)";
    }
  });

  hide.appendChild(path);

  return hide;
}

// Utils
function fixNumber(str) {
  let persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  let arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];

  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}

/**
 * Adds CSS styles to a given HTML or SVG element.
 *
 * @param {HTMLElement | SVGElement} element - The element to which styles will be applied.
 * @param {Record<string, string | number>} styles - An object containing CSS properties and values.
 */
function addStyles(element, styles) {
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key];
  });
}
