const extensionID = "jfjnpopngnadflbkgfclacpkbchaloec";
const originalText = [...document.getElementsByTagName("p")].map(
  (a) => a.innerHTML
);
let text = [...document.getElementsByTagName("p")];

let matches = [];

function blurSomeWords(blur_word) {
  console.log("i will do stuff");
  console.log(!!blur_word);

  text.forEach((p, index) => {
    text[index].innerHTML = originalText[index];
  });

  if (blur_word) {
    text.forEach((t, ind) => {
      matches.push([]);
      let words = t.textContent.split(" ");

      words.forEach((word, index) => {
        if (word.toLowerCase() === blur_word) {
          matches[matches.length - 1].push(index);
        }
      });
      let re = new RegExp(` ${blur_word} `, "ig");
      if (matches[matches.length - 1].length > 0) {
        text[ind].innerHTML = t.innerHTML.replace(
          re,
          `<span style="filter: blur(3px);">${blur_word}</span>`
        );
      }
    });
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  blurSomeWords(request.blurWord, text);
});
