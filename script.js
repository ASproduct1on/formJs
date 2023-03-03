"use strict";

let form = document.querySelector(".js-form"),
  formInputs = document.querySelectorAll(".js-input"),
  inputName = document.querySelector(".js-input-name"),
  inputSername = document.querySelector(".js-input-sername"),
  inputPhone = document.querySelector(".js-input-phone"),
  inputEmail = document.querySelector(".js-input-email"),
  regBtn = document.querySelector(".reg-btn"),
  users = document.querySelector(".list");

let userObj = {
  firstName: "",
  lastName: "",
  number: "",
  email: "",
};

let userArr = JSON.parse(localStorage.getItem("your tasks")) || [];

const validation = function (form) {
  let result = true;

  formInputs.forEach((input) => {
    if (input === inputEmail) {
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      if (EMAIL_REGEXP.test(inputEmail.value)) {
        input.classList.remove("error");
        userObj.email = inputEmail.value;
      } else {
        inputEmail.classList.add("error");
        return (result = false);
      }
    }
    if (input.value === inputPhone.value) {
      const PHONE_REGEXP =
        /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm;
      if (PHONE_REGEXP.test(inputPhone.value)) {
        input.classList.remove("error");
        userObj.number = inputPhone.value;
      } else {
        inputPhone.classList.add("error");
        return (result = false);
      }
    }

    if (input.value === "") {
      input.classList.add("error");
      return (result = false);
    } else {
      input.classList.remove("error");
      userObj.firstName = inputName.value;
      userObj.lastName = inputSername.value;
    }
  });

  return result;
};

regBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (validation() === true) {
    userArr.push(userObj);
    render();
  } else {
    alert("nie rabotaet");
  }
});

function render() {
  users.textContent = "";
  userArr.forEach((item, index) => {
    const el = document.createElement("el");
    el.classList.add("user-element");

    users.append(el);
    for (let key in item) {
      const li = document.createElement("li");
      li.classList.add("user-item");
      li.innerHTML = key + ": " + item[key];
      el.append(li);
      console.log(li.innerHTML);
    }
  });
}
