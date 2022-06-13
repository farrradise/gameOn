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

// Ajout évenement au click sur le bouton submit du modal
submitBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    displaySubmissionMessage();
});

// Ecoute des changements sur les inputs en temps réel et vérification des données entrées
firstName.addEventListener('input', (e) => {
    let result = checkName(e.target.value);
    displayErrorMessage(result, e.target);
    checkForm();
});

lastName.addEventListener('input', (e) => {
    let result = checkName(e.target.value);
    displayErrorMessage(result, e.target);
    checkForm();
});

email.addEventListener('input', (e) => {
    let result = checkEmail(e.target.value);
    displayErrorMessage(result, e.target);
    checkForm();
});

cities.forEach((city) => city.addEventListener("input", (e) => {
    let result = checkCity(cities);  
    displayErrorMessage(result, e.target);
    checkForm();
}));

birthDate.addEventListener('input', (e) => {
    let result = checkMajority(e.target.value);
    displayErrorMessage(result, e.target);
    checkForm();
});

legal.addEventListener('input', (e)=> {
    let result = e.target.checked;
    displayErrorMessage(result, e.target);
    checkForm();

});

numberOfParticipation.addEventListener('input', (e) => {
    let result = checkGamesNb(e.target.value);
    displayErrorMessage(result, e.target);
    checkForm();
});


// refactorisation 
document.addEventListener('input', (e)=> {
// trouver le type de fonction à lancer 

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
        // console.log('retourne info pas encore majeur');
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
    
    console.log(isChecked);
    // if (isChecked > 0) { return true } else { return false;}
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

    // comportement du bouton fermer identique à la X du modal
    document.querySelector('.modal-body .success .btn-submit').addEventListener('click', (e)=> {
        closeBtn.click()
    });
}






