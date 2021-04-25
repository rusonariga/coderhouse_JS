class Producto {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name = name;
        this.price = price;
        this.stock = stock;
    }

    getStock() {
        return this.stock;
    }
}

var Productos = [
                new Producto(1, "Producto 1", 124.90, 10),
                new Producto(2, "Producto 2", 33.90, 10),
                new Producto(3, "Producto 3", 70.00, 10),
            ];

var cartProducts = [0, 0, 0];

function workInProgress() {
    message = "El botón seleccionado no funciona. Estamos trabajando para mejorar el sitio. Gracias por su paciencia."
    alert(message);
}

function addToCart(prodNumber) {
    let amountToAdd;

    switch(prodNumber) {
        case "1":
            amountToAdd = parseInt(document.getElementById("prod1Input").value);

            if (cartProducts[0] == 0) {
                cartNewRow(1, amountToAdd);
                cartProducts[0] += amountToAdd;
            }
            else {
                cartProducts[0] += amountToAdd;
                setCartAmount("1", cartProducts[0]);
            }
        break;

        case "2":
            amountToAdd = parseInt(document.getElementById("prod2Input").value);

            if (cartProducts[1] == 0) {
                cartNewRow(2, amountToAdd);
                cartProducts[1] += amountToAdd;
            }
            else {
                cartProducts[1] += amountToAdd;
                setCartAmount("2", cartProducts[1]);
            }
        break;

        case "3":
            amountToAdd = parseInt(document.getElementById("prod3Input").value);

            if (cartProducts[2] == 0) {
                cartNewRow(3, amountToAdd);
                cartProducts[2] += amountToAdd;
            }
            else {
                cartProducts[2] += amountToAdd;
                setCartAmount("3", cartProducts[2]);
            }
        break;

        default:
        break;
    }
}

function cartNewRow (prodNumber, amount) {

    let cartTable = document.getElementById("cartBody");
    let prodString = "Producto " + prodNumber;
    let prodIndex = prodNumber - 1;

    cartProducts[prodIndex] += amount;
    
    let newRow = cartTable.insertRow();
    
    prodCell = newRow.insertCell();
    amoCell = newRow.insertCell();
    btnCell = newRow.insertCell();

    prodCell.className += "text-left";
    amoCell.className += "text-center";
    btnCell.className += "text-right";

    prodCell.appendChild(document.createTextNode(prodString));
    amoCell.appendChild(document.createTextNode(cartProducts[prodIndex]));
    
    let deleteBtn = document.createElement("button");
    let icon = document.createElement("i");
    icon.className = "fa fa-trash";
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.onclick = workInProgress;
    deleteBtn.appendChild(icon);
    btnCell.appendChild(deleteBtn);

}

function setCartAmount (prodNumber, amount) {
    let cartTable = document.getElementById("cartBody");
    let n = cartTable.rows.length;
    let prodString = "Producto " + prodNumber;

    for (let r = 0; r < n; r++) {
        if (cartTable.rows[r].cells[0].innerHTML == prodString) {
            cartTable.rows[r].cells[1].innerHTML = amount;
        }
    }
}