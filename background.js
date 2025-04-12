/**
 * Opens the popup and sends product data.
 * @param {{ name: string, price: number, origin: string }} product - The product object containing name, price, and origin.
 */

const openPopup = async (product) => {
  try {
    await chrome.action.openPopup();
  } catch (error) {
    console.error(error, "Popup is already open");
  }

  if (product.name) {
    chrome.runtime.sendMessage({
      action: "get_prices",
      product: product,
    });
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "open_popup") {
    openPopup(request.product);
    return true;
  }
});

// Create context menu
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "get_prices_context_menu",
    title: "کجا چنده",
    contexts: ["selection"],
  });
});

// Event listener for context menu item click
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "get_prices_context_menu" && info.selectionText)
    openPopup({ name: info.selectionText });
});
