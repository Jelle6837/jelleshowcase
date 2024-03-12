fetch("navigation.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("navigation").innerHTML = data;
    });