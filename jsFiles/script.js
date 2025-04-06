// Input values
const $studentID = $('#student-id');
const $studentName = $('#student-name');
const $studentContactNo = $('#student-contact-no');
const $studentAddress = $('#student-address');
// Submit button
const $submitButton = $('#submit-btn');

let $rowArray = [];

function dashboardConstructor(id, name, contactNo, address, editIcon, deleteIcon){
    this.id = id;
    this.name = name;
    this.contactNo = contactNo;
    this.address = address;
    this.editIcon = editIcon;
    this.deleteIcon = deleteIcon;
}

function addRow(){
    const studentIDVal = $studentID.val();
    const studentNameVal = $studentName.val();
    const studentContactNoVal = $studentContactNo.val();
    const studentAddressVal = $studentAddress.val();
    //Add edit and delete image icon
    let editIcon = $('<img>', {
        src: '/images/edit.svg'
    })
    let deleteIcon = $('<img>', {
        src: '/images/delete.svg'
    })

    let dashboardValues = new dashboardConstructor(
        studentIDVal,
        studentNameVal,
        studentContactNoVal,
        studentAddressVal,
        editIcon,
        deleteIcon
    );
    $rowArray.push(dashboardValues);
    display();
}

function display(){
    let tableBody = $('tbody');
    tableBody.empty();

    $($rowArray).each(function(index, student){
        let rowsContainer = document.createElement('tr');

        // Cell for student ID
        let studentIDCell = document.createElement('td');
        studentIDCell.textContent = student.id;

        // Cell for student full name
        let studentNameCell = document.createElement('td');
        studentNameCell.textContent = student.name;

        // Cell for student contact no.
        let studentContactCell = document.createElement('td');
        studentContactCell.textContent = student.contactNo;

        // Cell for student address
        let studentAddressCell = document.createElement('td');
        studentAddressCell.textContent = student.address;

        let editButton = $('<button>', {class: 'btn btn-primary edit-btn'}).append(student.editIcon.clone());

        let deleteButton = $('<button>', {class: 'btn btn-primary delete-btn'}).append(student.deleteIcon.clone());
        
        let editCell = $('<td>').append(editButton);

        let deleteCell = $('<td>').append(deleteButton);

        rowsContainer.append(
            studentIDCell,
            studentNameCell,
            studentContactCell,
            studentAddressCell,
            editCell[0],
            deleteCell[0]);

        tableBody.append(rowsContainer);  

        // For delete purposes
        deleteButton.on('click', () => {
            if(confirm('Are you sure you want to delete it?')){
                $rowArray.splice(index, 1);
                display();
            }
        })
    });    
}

$submitButton.on('click', (event) => {
    event.preventDefault();

    const studentIDVal = $studentID.val();
    const studentNameVal = $studentName.val();
    const studentContactNoVal = $studentContactNo.val();
    const studentAddressVal = $studentAddress.val();

    if (!studentIDVal || !studentNameVal || !studentContactNoVal || !studentAddressVal) {
        alert("Please fill out all fields.");
        return;
    }

    if (editIndex === -1) {
        // Add new student
        addRow();
    } else {
        // Update existing student
        $rowArray[editIndex].id = studentIDVal;
        $rowArray[editIndex].name = studentNameVal;
        $rowArray[editIndex].contactNo = studentContactNoVal;
        $rowArray[editIndex].address = studentAddressVal;

        editIndex = -1;
        $submitButton.text('Submit');
        display();
    }

    // Clear the form
    $studentID.val('');
    $studentName.val('');
    $studentContactNo.val('');
    $studentAddress.val('');
    display();
});
