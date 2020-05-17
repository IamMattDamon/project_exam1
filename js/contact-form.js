const form = document.querySelector("#contactForm");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
let nameHasError = false;

const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
let lastNameHasError = false;

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
let messageHasError = false;

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
let emailHasError = false;

const submitMessage = document.querySelector("#submitMessage");

form.addEventListener("submit", validateForm);

function validateForm() {
    event.preventDefault(); 

    // test name
    const nameValue = name.value;

    if (validateLength(nameValue, 1) === true) {
        nameSuccess.style.display = "block";
        nameHasError = false;
    } else {
        nameError.style.display = "block";
        nameHasError = true;
    } 

    // test last name
    const lastNameValue = lastName.value;

    if (validateLength(lastNameValue, 3) === true) {
        lastNameSuccess.style.display = "block";
        lastNameHasError = false;
    } else {
        lastNameError.style.display = "block";
        lastNameHasError = true;
    }

    // test message
    const messageValue = message.value;

    if (validateLength(messageValue, 6) === true) {
        messageSuccess.style.display = "block";
        messageHasError = false;
    } else {
        messageError.style.display = "block";
        messageHasError = true;
    }

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
    if (nameHasError === true || lastNameHasError === true || messageHasError === true || emailHasError === true) {
        submitMessage.style.display = "none";
    } else {
        submitMessage.style.display = "block";
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


