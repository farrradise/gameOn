// DOM Elements
let birthDate = document.getElementById('birthdate'); 
let cities = document.querySelectorAll('[name="location"]');
let email = document.getElementById('email'); 
let firstName = document.getElementById('first'); 
let lastName = document.getElementById('last'); 
let legal = document.getElementById('checkbox1');
let numberOfParticipation = document.getElementById('quantity'); 
let submitBtn = document.querySelector(".btn-submit");
let successMessage = '<div class="success"> <p> Merci ! <br> Votre réservation a été reçue.</p> <div class="btn-submit">Fermer</div></div>'



// Add Event on click on form submission
submitBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    displaySubmissionMessage();
});




// Listen to all changes in form inputs
document.addEventListener('input', (e)=> {
    
    let result;

    if (e.target.id == "first" || e.target.id == "last"  ) {
        result = checkName(e.target.value);
    } else if (e.target.id == "email") {
        result = checkEmail(e.target.value);
    } else if (e.target.id == "birthdate") {
        result = checkMajority(e.target.value);
    } else if (e.target.id == "quantity") {
        result = checkGamesNb(e.target.value);
    } else if (e.target.name == "location") {
        result = checkCity(cities);
    } else if (e.target.id == "checkbox1") {
        result = e.target.checked;
    }


    // console.log("l'input renvoie la valeur ", result);
   
    // display error message if necessary
    displayErrorMessage(result, e.target);

    // check whole form in order to know whether displaying submit button or not
    checkForm();
});









function allowSubmitBtn(autorisation) {

    if (autorisation) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function checkForm() {
    // e.preventDefault();
    
    if (checkName(firstName.value) && 
    checkName(lastName.value) && 
    checkEmail(email.value) && 
    checkMajority(birthDate.value) && 
    checkGamesNb(numberOfParticipation.value) && 
    checkCity(cities) &&
    legal.checked) {
        allowSubmitBtn(true); 

    } else {
        allowSubmitBtn(false); 
    }
   

}

function checkMajority(birthDate) {
    
    const today = new Date();
    birthDate = new Date(birthDate);

    let majorityDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    
    if (majorityDate < today) {
        return true;
    } else {
        return false;
    }

}

function checkCity(cities) {

    let isChecked = 0;
    
    cities.forEach(function (ville) {
        if (ville.checked) {
            isChecked++;
        } 
    });
    
    return isChecked > 0 ? true : false;
}

function checkEmail(email) {
    const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

    if (email && regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function checkGamesNb(quantity) {
    if (!isNaN(parseInt(quantity, 10))) {
        return true;
    } else {
        return false;
    }

}

function checkName(name) {
    const regex = new RegExp('[a-zA-Z]{2,}');
    if (name && regex.test(name) ) {
        return true;
    } else {
        return false;
    }
}

function displayErrorMessage(validation, element) {
    if (validation) {
        element.closest('.formData').setAttribute("data-error-visible", false);
    } else {
        element.closest('.formData').setAttribute("data-error-visible", true);
    }
}

function displaySubmissionMessage() {
    document.querySelector('.modal-body').innerHTML = successMessage;

    // behavior to allow closing modal on click on "fermer" button (trigger X button)
    document.querySelector('.modal-body .success .btn-submit').addEventListener('click', (e)=> {
        closeBtn.click()
    });
}






