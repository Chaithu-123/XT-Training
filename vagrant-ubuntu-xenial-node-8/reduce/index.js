export const renderSubmitData = (storedata) => {

    const container = document.getElementById("detailsInfo");
    container.innerHTML = "";
    let datahtmlStr = "";
    let template = null;
    let delButton = null;
    storedata.forEach(data => {
        template = null;
        delButton = null;
        datahtmlStr = `<div id="${data.id}">
        <label for="text${data.id}"><input type="checkbox" id="text${data.id}" />${data.Text}</label>
        <button id="d${data.id}" class="delBtn">Delete</button>
        </div>`;
        template = document.createElement("template")
        template.innerHTML = datahtmlStr;
        container.appendChild(template.content.firstElementChild);

    })

    document.getElementById("txtbox").value = "";

}
const delItem = (e) => {
    store.dispatch({
        type: "DELETE_ITEM",
        payload: textVal
    })
    let curElement = e.currentTarget;
    let parentDiv = curElement.parentElement;
    parentDiv.remove();
}