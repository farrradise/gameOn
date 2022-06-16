// DOM Elements
let birthDate = document.getElementById('birthdate'); 
let cities = document.querySelectorAll('[name="location"]');
let email = document.getElementById('email'); 
let firstName = document.getElementById('first'); 
let lastName = document.getElementById('last'); 
let legal = document.getElementById('checkbox1');
let promotion = document.getElementById('checkbox2');
let numberOfParticipation = document.getElementById('quantity'); 
let submitBtn = document.querySelector(".btn-submit");
let successMessage = '<div class="success"> <p> Merci ! <br> Votre réservation a été reçue.</p> <div class="btn-submit">Fermer</div></div>'




// Listen to all changes in form inputs
firstName.addEventListener('input', (e) => {
    let result = checkName(e.target.value);
    toggleErrorMessage(result, e.target);
    checkForm();
});

lastName.addEventListener('input', (e) => {
    let result = checkName(e.target.value);
    toggleErrorMessage(result, e.target);
    checkForm();
});

email.addEventListener('input', (e) => {
    let result = checkEmail(e.target.value);
    toggleErrorMessage(result, e.target);
    checkForm();
});

cities.forEach((city) => city.addEventListener("input", (e) => {
    let result = checkCity(cities);  
    toggleErrorMessage(result, e.target);
    checkForm();
}));

birthDate.addEventListener('blur', (e) => {
    let result = checkMajority(e.target.value);
    toggleErrorMessage(result, e.target);
    checkForm();
});

legal.addEventListener('input', (e)=> {
    let result = e.target.checked;
    toggleErrorMessage(result, e.target);
    checkForm();

});

numberOfParticipation.addEventListener('blur', (e) => {
    let result = checkGamesNb(e.target.value);
    toggleErrorMessage(result, e.target);
    checkForm();
});


// Add Event on click on form submission
submitBtn.addEventListener('click', (e)=> {
    e.preventDefault();

    if (checkCity(cities)) {
        displaySubmissionMessage();
        console.log('Bravo vous êtes enregistré.e, voici un récapitulatif de vos infos : ');
        console.log('Nom :', lastName.value);
        console.log('Prénom :', firstName.value);
        console.log('Email :', email.value);
        console.log('Date de naissance :', birthDate.value);
        console.log('Vous avez déjà participé à', numberOfParticipation.value,'tournois GameOn');

        if (promotion.checked) {
            console.log("Vous souhaitez être averti.e des prochains évènements");
        } else {
            console.log("Vous ne souhaitez pas être averti.e des prochains évènements");
        }

        cities.forEach(function (ville) {
            if (ville.checked) {
                return console.log("Vous avez choisi de participer au tournoi de", ville.value);
            }
        });

    } else {
        toggleErrorMessage(false, cities[0]);
    }
});








function allowSubmitBtn(autorisation) {

    if (autorisation) {
        submitBtn.disabled = false;

    } else {
        submitBtn.disabled = true;
    }
}

// check all input from form except cities in order to display submit button
function checkForm() {
    // e.preventDefault();


    if (checkName(firstName.value) && 
    checkName(lastName.value) && 
    checkEmail(email.value) && 
    checkMajority(birthDate.value) && 
    checkGamesNb(numberOfParticipation.value) && 
    legal.checked) {
        allowSubmitBtn(true); 
    } else {
        allowSubmitBtn(false); 
    }
   

}


function checkMajority(birthDate) {
    
    if (!birthDate) {
        return false;
    } 

    const today = new Date();
    birthDate = new Date(birthDate);
    let majorityDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    
    if (majorityDate > today) {
        return false;
    }

    return true;

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
    // const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/);
    if (!email || !regex.test(email)) {
        return false;
    }

    return true;
}

function checkGamesNb(quantity) {

    if (!quantity) {
        return false;
    }
    
    quantity = Number(quantity);
    
    if ( quantity < 0) {
        return false;
    } 

    return true;
}

function checkName(name) {
    const regex = new RegExp('[a-zA-Z]{2,}');
    if (!name || !regex.test(name) ) {
        return false;
    } 
    
    return true;
}

function displaySubmissionMessage() {
    document.querySelector('.modal-body').innerHTML = successMessage;

    // behavior to allow closing modal on click on "fermer" button (trigger X button)
    document.querySelector('.modal-body .success .btn-submit').addEventListener('click', (e)=> {
        closeBtn.click()
    });
}

function toggleErrorMessage(validation, element) {
    if (validation) {
        element.closest('.formData').setAttribute("data-error-visible", false);
    } else {
        element.closest('.formData').setAttribute("data-error-visible", true);
    }
}








