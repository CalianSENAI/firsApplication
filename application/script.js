const url = "http://localhost:5500/api"

function submit(idLogin,idName,idEmail,idPassword){
    if (idLogin.value == "" || idName.value == "" || idEmail.value == "" || idPassword.value == "") {
        alert("Todos os campos devem ser preenchidos!")
        return document.getElementById("idPassword").focus()
    }

    //Loader do submit
    let divLoader = document.getElementById("loader")
    divLoader.style.display = "flex"
    divLoader.style.justifyContent = "center"

    const email = idEmail.value
    //validar se ja tem este email cadastrado
    let validaEmail = validarUser(email)
    validaEmail.then(resp => {
        let divSuccess = document.getElementById("successAlert")
        let divError = document.getElementById("errorAlert")
        console.log(resp)
        if(resp === true){
            console.log("Entrou if")
            divSuccess.style.display = "none"
            fadein(divError)
            return document.getElementById("idEmail").focus()
        } else{
            console.log("Entrou else")
            let validaPost = postUser(idLogin.value,idName.value,idEmail.value,idPassword.value)
            validaPost.then(resp => {
                console.log(resp)
            })
            divError.style.display = "none"
            fadein(divSuccess)
        }
        divLoader.style.display = "none"
    })
   /*
    let emailValidate = validateEmail(email)
    async function validateEmail(email){
        let retorno = await validarUser(email)
        return retorno
    }
    console.log(emailValidate)
    /*
    .then(resp => {
        console.log(resp)
    })
    */
    //console.log(emailValidade)
    //successAler()
}

function chamar(){
    console.log("Passou")
}
/*
function validarUser(email){
    let status = false
    axios.get(`http://localhost:5500/api/validate/${email}`)
    .then(resp => {
        if(resp.data == true){
            status = true
            console.log(status)
        }
    })
    .catch(e => console.log(e))
    return status
}
*/
/*
async function validarUser(email){
    console.log(email)
    let resp = await axios.get(`http://localhost:5500/api/validate/${email}`)
    console.log(resp.data)
    return resp.data
} 
*/
/*
function validarUser(email){
    return axios.get(`http://localhost:5500/api/validate/${email}`)
}
*/

async function validarUser(email){
    console.log("Entrou validaUser")
    try{
        const resp = await axios.get(`http://localhost:5500/api/validate/${email}`)
        return resp.data
    } catch(e){
        console.error(e)
        return e
    }
}

async function postUser(idLogin,idName,idEmail,idPassword){
    console.log("Entrou postUser")
    const user = {
        name: idName,
        email: idEmail,
        password: idPassword,
        login: idLogin
    }
    try{
        const resp = await axios.post(url,user)
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


/*
function validarUser(email){
    return axios.get(`http://localhost:5500/api/validate/${email}`)
}
const validarEmail = async (email) => {
    try{
        const resp = await axios.get(`http://localhost:5500/api/validate/${email}`)
    }
    catch(e){
        console.error(e)
    }
}
*/