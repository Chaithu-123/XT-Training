import { createStore } from "./node_modules/redux"
import { renderSubmitData } from "./index"


const stateList = [];


function ToDoReducer(state = {}, action) {
    switch (action.type) {
        case "SUBMIT_TEXT":
            const s = {
                items: [...state.items, {
                    "id": state.items.length + 1,
                    "Text": action.payload
                }]
            };
            stateList.push(s);
            return s;
        case "DELETE_ITEM":
            state.items.splice(action.payload, 1)
        default:
            return state;
    }
}


const store = createStore(ToDoReducer, {
    items: []
})

store.subscribe(() => {
    const stateData = store.getState().items;
    console.log(stateData);
    const delid = renderSubmitData(stateData);
    console.log("avs")
    const delButtons = document.getElementsByClassName("delBtn");
    console.log("avs")
    if (delButtons.length > 0) {
        delButtons.forEach(item => {
            item.addEventListener("click", function(e) {
                const curEleId = e.currentTarget.id
                const itemIndex = stateData.findIndex((item) => {
                    return delid == curEleId.substr(1)
                });
                store.dispatch({
                    type: "SUBMIT_TEXT",
                    payload: itemIndex
                })

            });
        })

    }

});

let textVal = "";
const submitBtn = document.getElementById("btnsubmit");

submitBtn.addEventListener("click", function() {
    textVal = document.getElementById("txtbox").value;
    document.getElementById("txtbox").value;
    store.dispatch({
        type: "SUBMIT_TEXT",
        payload: textVal
    })

})