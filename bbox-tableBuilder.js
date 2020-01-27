table = document.querySelector(".main-table");

table
  .plotTable(response.data.titles, response.data.content)
  .then(() => {
    const rows = [];
    //hacemos un ajax y su respuesta va a ser info que regrese para nosotros armar unos rows nuevos :B
    rows.push(document.createElement("tr"));
    rows.push(document.createElement("tr"));
    rows.push(document.createElement("tr"));
    rows.foreach(row => {
      table.querySelector("thead:nth-child(0)").append(row);
    });
  })
  .then(() => table.showTable());

const NUMERIC_TYPES = ["percentage", "integer", "float"];

const plotTable = (
  titles = "titles",
  data = "data",
  clearFromRow = 1,
  defaultOrder = "ASC"
) => {
  return new Promise((resolve, reject) => {
    const tbody = document.createElement("tbody");
    /*Si algo sale mal
      if(){
        reject(Error("no se pudo"))
      }*/
    //Creamos los headers a pertir de la variable titles
    //Creamos el body a partir de la variable data
    const tableContent = titles
      .foreach(title => {
        appendTitle(tbody, title);
      })
      .then(
        data.foreach(row => {
          titles.foreach(title => {
            //imprimir row[title]
            appendCell(tbody, { ...row[title], ...title });
          });
        })
      );
    resolve(tbody);
  });
};

const appendCell = (table, content) => {
  //Content va a ser el contenido y su formato esperado
  td = document.createElement("td");
  td.alignment = content.alignment || "right";
  if (content.type in NUMERIC_TYPES) {
    content.value.number_format();
  }
  if (content.groupedWithNext) {
    td.classList.add("no-right-margin");
  }
};

const appendTitle = (table, title) => {};
