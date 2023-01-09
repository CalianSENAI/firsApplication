const url = "http://localhost:5500/api"

function submit(idLogin,idName,idEmail,idPassword){
    if (idLogin.value == "" || idName.value == "" || idEmail.value == "" || idPassword.value == "") {
        alert("Todos os campos devem ser preenchidos!")
        return document.getElementById("idPassword").focus()
    }
    const email = idEmail.value
    //validar se ja tem este email cadastrado
    validarUser(email)
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
    try{
        const resp = await axios.get(`http://localhost:5500/api/validate/${email}`)
        console.log(resp.data)
        if(resp.data === true){
            alert(`Email informado já cadastrado!`)
        }
    } catch(e){
        console.error(e)
    }
}