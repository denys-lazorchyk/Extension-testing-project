const blur_me = document.getElementById("blur_me");
const blur_me_word = document.getElementById("blur_text");
const done = document.getElementById("done");

function clearDone() {
  setTimeout(() => {
    done.textContent = "";
  }, 5000);
}

blur_me.addEventListener("click", (e) => {
  e.preventDefault();

  if (blur_me_word.value) {
    let message = `${blur_me_word.value}`;

    done.textContent = "DONE!!!";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { blurWord: message });
    });
  } else {
    done.textContent = "Empty?";
    clearDone();
  }

  blur_me_word.value = "";
  blur_me_word.blur();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  clearDone();
});
