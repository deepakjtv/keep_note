const addButton = document.getElementById("add");
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value)
    })
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));

}
const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    const hmtlData = `
            <div class="operation">
                <button class="edit icon-edit"></button>
                <button class="delete icon-delete"></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"> </div>
            <textarea class="${text ? "hidden" : ""}"></textarea>`;
    note.insertAdjacentHTML("afterbegin", hmtlData);

    const editButton = note.querySelector('.edit');
    const deletButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    deletButton.addEventListener("click", () => {
        note.remove();
        updateLSData();
    })
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        
    })
    // if(textArea.classList.toggel('d')!textArea.classList.toggel('d')){
    //     editButton.innerHTML='save';
    // }
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })
    document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => {
        return addNewNote(note);
    })
}

addButton.addEventListener("click", () => {
    addNewNote();
})