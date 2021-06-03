console.log('welcome to Magic Note');

showNotes();
//If user add a node add it to the localStorage 
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notesTtl = localStorage.getItem('title');
    if (notesTtl == null) {
        notesTtlObj = [];
    }
    else {
        notesTtlObj = JSON.parse(notesTtl)
    }
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    
    if(addTitle.value == ''){
        alert('Please write a Title to add a note!!')
    }
    else if(addTxt.value == ''){
        alert('Please write a Description to add a note!!')
    }
    else{
        notesTtlObj.push(addTitle.value);
        notesObj.push(addTxt.value);
        localStorage.setItem('title', JSON.stringify(notesTtlObj));
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTxt.value = '';
        addTitle.value = '';
        showNotes();
    }
    
})

//Function to show elements from localStorage
function showNotes() {
    let title = localStorage.getItem('title');
    let notes = localStorage.getItem('notes');
    if (title == null) {
        notesTtlObj = [];
    }
    else {
        notesTtlObj = JSON.parse(title);
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${notesTtlObj[index]}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
                <button id="${index + important}" onclick="important(this.id)" class="btn btn-info">Important</button>
            </div>
        </div>
        `;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! use 'Add note' above to add notes.`
        // notesElm.className = 'alert alert-warning';
    }
}

//function to delete a note
function deleteNote(index){
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    if (title == null) {
        notesTtlObj = [];
    }
    else {
        notesTtlObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    notesTtlObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('title', JSON.stringify(notesTtlObj));
    showNotes();
}
//function to add important in a node
function important(index){
    
    let impBtn = document.getElementById(index);
    let div = impBtn.parentNode;
    let div2 = div.parentNode;
    div2.setAttribute("id", "impDiv");
    document.getElementById('impDiv').style.backgroundColor = '#0dcaf0';
    console.log(div2);
    impBtn.style.display = 'none';
    
} 

//function to search a note
let search = document.getElementById("searchNote");
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();
    let nodeCards = document.getElementsByClassName('noteCard');
    Array.from(nodeCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
            // let warning = document.getElementById('warning');
            // warning.style.display = 'block';
        }
    })
})