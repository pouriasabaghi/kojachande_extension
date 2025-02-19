chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "open_popup") {
    const openPopup = async () => {
      try {
        await chrome.action.openPopup();
      } catch (error) {
        console.error(error,"Popup is already open");
      }

      chrome.runtime.sendMessage({
        action: "get_prices",
        product: request.product,
      });
    };

    openPopup();
  }
});
