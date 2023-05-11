/* Adapted from: https://jqueryui.com/sortable/ */

$(document).ready(function () {
    $("#grid-container").sortable({
      handle: ".grid-header",
      items: ".grid-item",
      placeholder: "grid-placeholder",
      start: function (event, ui) {
        ui.placeholder.height(ui.item.height());
        ui.placeholder.width(ui.item.width());
      },
    });
  
    $("#grid-container").disableSelection();
  });
  

  