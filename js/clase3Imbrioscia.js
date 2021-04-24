class perfilComprador {
    constructor(name, surname, birthYear) {
        this.name=name;
        this.surname=surname;
        this.birthYear=birthYear;
        this.isBuyer=false;
    }
    fullName(){
        return(this.name+" "+this.surname);
    }
    age(){
        let date = new Date();
        return date.getFullYear() - this.birthYear;
    }
}

var perfilActual=new perfilComprador("","",0);

function payFunction() {
    if (perfilActual.name=="")
        {alert("Debe registrarse para realizar una compra")
        do {perfilActual.name = prompt("Ingrese su nombre")}
        while(perfilActual.name=="");
        do {perfilActual.surname = prompt("Ingrese su apellido")}
        while(perfilActual.surname=="");
        alert("Bienvenido "+perfilActual.fullName());
        do {perfilActual.birthYear = prompt("Ingrese su año de nacimiento")}
        while(perfilActual.birthYear=="");
    }
    if(perfilActual.age()<18)
        {alert("Debe tener al menos 18 años para realizar una compra");
        return}
    else
    {alert(perfilActual.fullName()+", gracias por su compra")}
}

function workInProgress() {
    message = "El botón seleccionado no funciona. Estamos trabajando para mejorar el sitio. Gracias por su paciencia."
    alert(message);
}

function checkProfile() {
    if (perfilActual.name==""){
        alert("No existe un perfil abierto");
    }
    else{
        message=
        alert("El perfil actual es "+perfilActual.fullName());
    }
}