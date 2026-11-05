const favoriteDialog = document.getElementById("hw-favorite-dialog");
const favoriteContent = document.getElementById("hw-favorite-content");

favoriteDialog.addEventListener("click", (event) => {
  const bounds = favoriteDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) favoriteDialog.close();
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const favorite = event.target.closest("button.hw-favorite");
  if (!favorite) return;

  const template = document.getElementById(favorite.dataset.template);
  if (!(template instanceof HTMLTemplateElement)) return;

  MathJax.typesetClear([favoriteContent]);
  favoriteContent.replaceChildren(template.content.cloneNode(true));
  favoriteDialog.showModal();
  MathJax.typesetPromise([favoriteContent]).catch((error) => {
    console.error("MathJax failed to typeset favorite content.", error);
  });
});
