// DOM Elements
let birthDate = document.getElementById('birthdate'); 
let cities = document.querySelectorAll('[name="location"]');
let email = document.getElementById('email'); 
let firstName = document.getElementById('first'); 
let lastName = document.getElementById('last'); 
let legal = document.getElementById('checkbox1');
let numberOfParticipation = document.getElementById('quantity'); 
let submitBtn = document.querySelector(".btn-submit");



// Ajout évenement au click sur le bouton submit du modal
// submitBtn.addEventListener('click', checkForm);
submitBtn.addEventListener('click', (e)=> {
    alert('ça clique');
});

// Ecoute des changements sur les inputs en temps réel et vérification des données entrées
firstName.addEventListener('input', (e) => {
    let result = checkName(e.target.value);
    
    // console.log("c'est le résultat : ",result);
    return result;
});

lastName.addEventListener('input', (e) => {
    let result = checkName(e.target.value);
    displayErrorMessage(result, e.target);
});

email.addEventListener('input', (e) => {
    let result = checkEmail(e.target.value);
    displayErrorMessage(result, e.target);
});

cities.forEach((city) => city.addEventListener("input", (e) => {
    let result = checkCity(cities);  
    displayErrorMessage(result, e.target);
}));

birthDate.addEventListener('input', (e) => {
    let result = checkMajority(e.target.value);
    displayErrorMessage(result, e.target);
});

legal.addEventListener('input', (e)=> {
    let result = e.target.checked;
    displayErrorMessage(result, e.target);
    checkForm();
});

numberOfParticipation.addEventListener('input', (e) => {
    let result = checkGamesNb(e.target.value);
    displayErrorMessage(result, e.target);
});








// checkAllInputs();

function allowSubmitBtn(autorisation) {

    if (autorisation) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// On revérifie l'ensemble des données renseignées
function checkForm() {
    // e.preventDefault();

    // const elementsToCheck = [firstName.value, lastName.value, email.value, birthDate.value, numberOfParticipation.value ];
console.log(checkName(firstName.value));
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

        // if (!checkName(firstName.value)){
            // displayErrorMessage(false, firstName);
        // }
 
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
        // console.log('this is gooute');
        element.closest('.formData').setAttribute("data-error-visible", false);
        // checkAllInputs();
        // event.target.
    } else {
        element.closest('.formData').setAttribute("data-error-visible", true);
        // console.log('this is NOT gooute');
        // event.target.closest('.formData').setAttribute("data-error-visible", true);
    }
}






