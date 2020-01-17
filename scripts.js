let Sort = (function() {
  const dataTable = document.querySelector(".data-table");
  const sorters = dataTable.querySelectorAll("[data-sort]");
  const defaultSort = document.querySelector("[data-defaultsort]");
  const DEF_ASC =
    dataTable.dataset.defaultorder.toLowerCase() === "asc" ? true : false;

  var lastClicked = {};
  var isAscending = DEF_ASC;

  function sortTable() {
    if (this !== lastClicked) {
      lastClicked = this;
      isAscending = DEF_ASC;
      cleanSorters();
    } else {
      isAscending = !isAscending;
    }
    showArrow(this, isAscending);
    arrangeRows(this, isAscending);
  }

  function showArrow(el, asc) {
    const arrow = document.createElement("i");
    arrow.classList.add("order");
    arrow.innerHTML = asc ? "&#8595;" : "&#8593;";
    if (el.querySelector(".order")) {
      el.removeChild(el.querySelector(".order"));
    }
    el.append(arrow);
    el.style.fontWeight = "bold";
  }

  function cleanSorters() {
    sorters.forEach(sorter => {
      if (sorter.querySelector(".order")) {
        sorter.removeChild(sorter.querySelector(".order"));
        sorter.style.fontWeight = "normal";
      }
    });
  }

  function arrangeRows(el, asc) {
    const arrangeBy = el.cellIndex;
    const table = document.querySelector(".data-content");
    const sortedRows = Array.from(table.rows).sort((a, b) => {
      if (asc === true) {
        return a.cells[arrangeBy].innerText.toLowerCase() >
          b.cells[arrangeBy].innerText.toLowerCase()
          ? 1
          : -1;
      } else {
        return a.cells[arrangeBy].innerText.toLowerCase() >
          b.cells[arrangeBy].innerText.toLowerCase()
          ? -1
          : 1;
      }
    });
    table.innerHTML = "";
    sortedRows.forEach(tr => table.appendChild(tr));
  }

  sorters.forEach(sorter => sorter.addEventListener("click", sortTable));
  defaultSort.click();
})();
