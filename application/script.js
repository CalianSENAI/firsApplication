function submit(idLogin,idName,idEmail,idPassword){
    if (idLogin.value == "" || idName.value == "" || idEmail.value == "" || idPassword.value == "") {
        console.log("voltou")
        return document.getElementById("idPassword").focus()
    }
    chamar()
    successAler()
}

function chamar(){
    console.log("Passou")
}