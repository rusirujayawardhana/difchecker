document.getElementById("compare-button").addEventListener("click", function () {
  const originalText = document.getElementById("original-text").innerText;
  const changedText = document.getElementById("changed-text").innerText;

  if (!originalText || !changedText) {
    alert("Please enter text in both fields.");
    return;
  }

  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(originalText, changedText);
  dmp.diff_cleanupSemantic(diffs);

  const formattedOriginal = formatDiff(diffs, "original");
  const formattedChanged = formatDiff(diffs, "changed");

  document.getElementById("original-text").innerHTML = formattedOriginal;
  document.getElementById("changed-text").innerHTML = formattedChanged;
});

function formatDiff(diffs, type) {
  return diffs
    .map((diff) => {
      const operation = diff[0];
      const text = diff[1];

      if (operation === 0) {
        return text; // No change
      } else if (operation === -1 && type === "original") {
        return `<span class="diff-delete">${text}</span>`;
      } else if (operation === 1 && type === "changed") {
        return `<span class="diff-insert">${text}</span>`;
      }
      return "";
    })
    .join("");
}
