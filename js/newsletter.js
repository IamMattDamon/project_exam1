const form = document.querySelector("#subscriptionForm");

const email = document.querySelector("#emailAddress");
const emailError = document.querySelector("#emailError");
let emailHasError = false;

const subscribedMessage = document.querySelector("#subscribedMessage");

form.addEventListener("submit", validateForm);

function validateForm() {
    event.preventDefault(); 

    // test email
    const emailValue = email.value;

    if (validateEmail(emailValue)) {
        emailSuccess.style.display = "block";
        emailHasError = false;
    } else {
        emailError.style.display = "block";
        emailHasError = true;
    }

    // decide whether to display the submitted message
    if (emailHasError === true) {
        subscribedMessage.style.display = "none";
    } else {
        subscribedMessage.style.display = "block";
    }
}

function validateLength(value, lengthToCheck) {
    const trimmedValue = value.trim();

    if (trimmedValue.length >= lengthToCheck) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(emailValue) {
    const regEx = /\S+@\S+\.\S+/;

    if (regEx.test(emailValue)) {
        return true;
    } else {
        return false;
    }
}


