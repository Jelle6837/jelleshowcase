// const form = document.querySelector("form");
// const email = document.getElementById("email");
// const emailError = document.querySelector("#email + span.error");
// const onderwerp = document.getElementById("onderwerp");
// const bericht = document.getElementById("bericht");


// form.addEventListener("submit", async (event) => {
//     // Then we prevent the form from being sent by canceling the event
//     event.preventDefault();
    
//     // if the email field is valid, we let the form submit
//     if (!email.validity.valid) {
//         // If it isn't, we display an appropriate error message
//         showError();
//         return;
//     }

//     let response = await fetch('http://localhost:3000/form', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({email: email.value,
//                               onderwerp: onderwerp.value,
//                               bericht: bericht.value})
//     });

//     let data = await response.json();
//     alert(JSON.stringify(data))

// });

