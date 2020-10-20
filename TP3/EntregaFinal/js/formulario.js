const boton_home = document.querySelector(".js-home");
const boton_calendario = document.querySelector(".js-calendario");
const boton_enviar = document.querySelector(".js-boton-enviar");

boton_home.addEventListener("click", function() {
    location.href = "index.html";
});

boton_calendario.addEventListener("click", function() {
    location.href = "calendario.html";
});

boton_enviar.addEventListener("click", function(event) {
    let email = document.querySelector(".js-email");
    let mensaje = document.querySelector(".js-mensaje");
    event.preventDefault();
    if (isFormValido(email, mensaje)) {
        animar(boton_enviar);
    } else {
        if (!validateEmail(email)) {
            email.classList.add("error-name");
            setTimeout(() => {
                email.classList.remove("error-name")
            }, 1000);
        }
        if (mensaje.value.trim() === "") {
            mensaje.classList.add("error-name");
            setTimeout(() => {
                mensaje.classList.remove("error-name")
            }, 1000);
        } 
    }
    // if ( ! boton_enviar.classList.contains("boton-animation") )
    //     boton_enviar.classList.add("boton-animation");
    // else
    //     boton_enviar.classList.remove("boton-animation");
});

function validateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value))
  {
    return (true)
  }
    return (false)
}

function isFormValido(email, mensaje) {
    return (validateEmail(email) && mensaje.value.trim() !== "");
}

function animar(boton) {
    boton.classList.add("form-aceptado")
    setTimeout(() => {
        boton.style.display = "none";
        let enviado = document.querySelector(".enviado");
        enviado.classList.remove("hide")
    }, 900);
}