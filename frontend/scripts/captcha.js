// Het formulier met de knop
const form = document.querySelector('#submit');

// Koppel er een event listener aan
form.addEventListener('submit', onSubmit)

function onSubmit(e) {
    // Voorkom dat het formulier verstuurd wordt
    e.preventDefault();

    grecaptcha.ready(function () {
        // Vul hier de site sleutel in (de public key)
        grecaptcha.execute('6LcdT3UpAAAAABwFg-pKWtdoECMfgnfJYIVcC5RC', { action: 'submit' }).then(async function (token) {
            try {
                // Verstuur het eerst naar jouw eigen server.
                // Voor dit voorbeeld is een nodejs server bijgevoegd (Zie map server).
                // Je kunt dit voor je showcase ook aanpassen door je eigen server project (bijv. ASP.NET) te gebruiken.
                const response = await fetch('http://localhost:3000/captcha', {
                    method: "POST",
                    body: JSON.stringify({
                        response: token
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                // handel het resultaat af en bepaal of je te maken hebt met een mens of een bot.
                // lees hier meer over de response vanuit Google: https://developers.google.com/recaptcha/docs/v3#site_verify_response
                const result = await response.json();
                console.log(result)
                let humanFactor;
                let isHuman;
                // je bepaalt zelf wat je doet met de score, 0.5 is slechts een voorbeeldwaarde
                if (result.score > 0.5) {
                    humanFactor = 'Het lijkt erop dat je een mens bent, je score is: ' + result.score;
                    isHuman = true;
                }
                else {
                    humanFactor = 'Het lijkt erop dat je geen mens bent, je score is: ' + result.score;
                    isHuman = false;
                }
                console.log(humanFactor);
                // Onderstaande code: pas aan naar je eigen smaak
                const sectionPersonalia = document.querySelector('.contact');
                let pResult = document.createElement('p');
                pResult.innerHTML = humanFactor;
                sectionPersonalia.appendChild(pResult);
                
                if (isHuman) {
                    
                    // Wacht 3 seconden en verstuur dan het formulier alsnog
                    setTimeout(() => {
                        // form.submit();
                        SendMail();
                        pResult.innerHTML = 'Het formulier is verzonden!';
                    }, 1000
                    );
                }
            }
            catch (e) {
                console.log('Het verzenden van de captcha is mislukt: ' + e.message)
            }
        });
    });
}

async function SendMail(){
    if (!email.validity.valid) {
        // If it isn't, we display an appropriate error message
        showError();
        return;
    }

    let response = await fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email.value,
                              onderwerp: onderwerp.value,
                              bericht: bericht.value})
    });

    let data = await response.json();
    alert(JSON.stringify(data))
    clearPage();    
}

function clearPage(){
    var inputFields = document.querySelectorAll('input');
    var textFields = document.querySelectorAll('textarea');

    inputFields.forEach(input => { if(input.type=="text" || input.type=="email") input.value=""});
    textFields.forEach(input => { input.value=""});


}