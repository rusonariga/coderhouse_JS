function payFunction() {
    let name = prompt("Ingrese su nombre");
    let text;
    if (name != "")
    {text = name + ", gracias por su compra";}
    else
    {text = "Nombre inválido. Por favor ingrese su nombre para continuar";}
    alert(text);
}

function workInProgress() {
    message = "El botón seleccionado no funciona. Estamos trabajando para mejorar el sitio. Gracias por su paciencia."
    alert(message);
}