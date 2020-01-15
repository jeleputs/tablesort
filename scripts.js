let Sort = (function() {
  var dataTable = document.querySelector(".data-table");
  var sorters = dataTable.querySelectorAll("[data-sort]");
  var defaultSort = document.querySelector("[data-defaultSort]");

  var lastClicked = {};
  var isAscending = false;

  function sortTable() {
    if (this !== lastClicked) {
      lastClicked = this;
      isAscending = false;
      cleanSorters();
    } else {
      isAscending = !isAscending;
    }
    showArrow(this, isAscending);
    arrangeRows(this, isAscending);
  }

  function showArrow(el, asc) {
    const arrow = document.createElement("i");
    arrow.id = "order";
    arrow.innerHTML = asc ? "up" : "down";
    if (el.querySelector("#order")) {
      el.removeChild(el.querySelector("#order"));
    }
    el.append(arrow);
  }

  function cleanSorters() {
    sorters.forEach(sorter => {
      if (sorter.querySelector("#order")) {
        sorter.removeChild(sorter.querySelector("#order"));
      }
    });
  }

  function arrangeRows(el, asc) {
    const arrangeBy = el.cellIndex;

    var table, rows, switching, i, a, b, shouldSwitch;
    table = document.querySelector(".data-content");
    switching = true;
    /* Make a loop that will continue until
  no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
    first, which contains table headers): */
      for (i = 0; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
      one from current row and one from the next: */
        a = rows[i];
        b = rows[i + 1];
        // Check if the two rows should switch place:
        if (asc === true) {
          if (
            a.cells[arrangeBy].innerText.toLowerCase() >
            b.cells[arrangeBy].innerText.toLowerCase()
          ) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else {
          if (
            a.cells[arrangeBy].innerText.toLowerCase() <=
            b.cells[arrangeBy].innerText.toLowerCase()
          ) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  sorters.forEach(sorter => sorter.addEventListener("click", sortTable));
  defaultSort.click();
})();
