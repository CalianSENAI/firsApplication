const url = "http://localhost:5500/api"

function submit(idLogin,idPassword){
    if (idLogin.value == "" || idPassword.value == "") {
        alert("Todos os campos devem ser preenchidos!")
        return document.getElementById("idPassword").focus()
    }

    //Loader do submit
    let divLoader = document.getElementById("loader")
    divLoader.style.display = "flex"
    divLoader.style.justifyContent = "center"

    const login = idLogin.value
    const password = idPassword.value
    //validar se ja tem este email cadastrado
    let validaEmail = validarLogin(login, password)
    validaEmail.then(resp => {
        let divSuccess = document.getElementById("successAlert")
        let divError = document.getElementById("errorAlert")
        console.log(resp)
        if(resp === true){
            console.log("Entrou if")
            divError.style.display = "none"
            //fadein(divSuccess)
        } else{
            console.log("Entrou else")
            divError.style.display = "flex"
            fadein(divError)
            divLoader.style.display = "none"
            return document.getElementById("idLogin").focus()
        } divLoader.style.display = "none"
    })
}

async function validarLogin(login, password){
    console.log("Entrou validaUser")
    try{
        const resp = await axios.get(`http://localhost:5500/api/login/${login}/${password}`)
        return resp.data
    } catch(e){
        console.error(e)
        return e
    }
}

// Fade in div success
function fadein(div){
    var op = 0.1;  // initial opacity
    div.style.display = 'flex';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        div.style.opacity = op;
        div.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
//Fade out div
function fadeout(div) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            div.style.display = 'none';
        }
        div.style.opacity = op;
        div.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
