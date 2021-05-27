class Producto {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    getStock() {
        return this.stock;
    }
}

var Productos = [
                new Producto(1, "Producto 1", 124.90, 0),
                new Producto(2, "Producto 2", 33.90, 15),
                new Producto(3, "Producto 3", 70.00, 17),
                new Producto(4, "Papas", 7988, 200)
            ];

var cartProducts = [];

$(document).ready( ()=> {
    for(producto of Productos){
        prodNewRow(producto);
        cartNewRow(producto);
        cartProducts.push(0);
        // if (producto.stock!=0) {
        //     $("#prod"+producto.id+"Stock").text("En stock");
        //     $("#prod"+producto.id+"AddButton").prop("disabled",false);
        //     $("#prod"+producto.id+"Input").prop("max",producto.stock).prop("disabled",false);
        // }
        // else $("#prod"+producto.id+"Stock").text("Sin stock");

        // $("#prod"+producto.id+"Price").text(pesoFormat(producto.price));
    }
    $("#prodTableBody td").addClass("align-middle");
});

function prodNewRow(producto){
    if (producto.stock==0) {
        stockCheck="Sin stock";
        prodEnable="disabled";}
    else {
        stockCheck="En stock";
        prodEnable="";}
    prodRowHTML =
    `<tr>
        <td> <img src="https://dummyimage.com/50x50/55595c/fff"/> </td>
        <td> ${producto.name} </td>
        <td id="prod${producto.id}Stock">${stockCheck}</td>
        <td class="text-center"><input id="prod${producto.id}Input" ${prodEnable} type="number" step="1" max="${producto.stock}" min="1" value="1" title="Qty" class="qty" size="4"></td>
        <td class="text-right" id="prod${producto.id}Price">${pesoFormat(producto.price)}</td>
        <td><button class="btn btn-sm btn-success" id="prod${producto.id}AddButton" onclick="addToCart(${producto.id})" ${prodEnable}><i class="fa fa-plus"></i></button></td>
    </tr>`;

    $("#prodTableBody").append(prodRowHTML);
}

function workInProgress() {
    message = "El botón seleccionado no funciona. Estamos trabajando para mejorar el sitio. Gracias por su paciencia."
    alert(message);
}

function addToCart(prodNumber) {
    let prodIndex=prodNumber-1;
    let amountToAdd=parseInt($("#prod"+prodNumber+"Input").val());
    if (amountToAdd+cartProducts[prodIndex]>Productos[prodIndex].stock)
    {
        alert('Lo sentimos, sólo tenemos disponibles '+Productos[prodIndex].stock+' unidades de este producto. Por favor, seleccione otra cantidad');
        return;
    }
    cartProducts[prodIndex]+=amountToAdd;
    setCart();

    // if (cartProducts[prodIndex] == 0) {
    //     cartNewRow(prodNumber, amountToAdd);
    // }
    // else {
    //     cartProducts[prodIndex] += amountToAdd;
    //     setCartAmount(prodNumber, cartProducts[prodIndex]);
    // }
    setTotals();

    // switch(prodNumber) {
    //     case "1":
    //         if (amountToAdd+cartProducts[0]>Productos[0].stock)
    //         {
    //             alert('Lo sentimos, sólo tenemos disponibles '+Productos[0].stock+' unidades de este producto. Por favor, seleccione otra cantidad');
    //             break;
    //         }

    //         if (cartProducts[0] == 0) {
    //             cartNewRow(1, amountToAdd);
    //         }
    //         else {
    //             cartProducts[0] += amountToAdd;
    //             setCartAmount("1", cartProducts[0]);
    //         }
    //     break;

    //     case "2":
    //         if (amountToAdd+cartProducts[1]>Productos[1].stock)
    //         {
    //             alert('Lo sentimos, sólo tenemos disponibles '+Productos[1].stock+' unidades de este producto. Por favor, seleccione otra cantidad');
    //             break;
    //         }

    //         if (cartProducts[1] == 0) {
    //             cartNewRow(2, amountToAdd);
    //         }
    //         else {
    //             cartProducts[1] += amountToAdd;
    //             setCartAmount("2", cartProducts[1]);
    //         }
    //     break;

    //     case "3":
    //         if (amountToAdd+cartProducts[2]>Productos[2].stock)
    //         {
    //             alert('Lo sentimos, sólo tenemos disponibles '+Productos[2].stock+' unidades de este producto. Por favor, seleccione otra cantidad');
    //             break;
    //         }
    //         if (cartProducts[2] == 0) {
    //             cartNewRow(3, amountToAdd);
    //         }
    //         else {
    //             cartProducts[2] += amountToAdd;
    //             setCartAmount("3", cartProducts[2]);
    //         }
    //     break;

    //     default:
    //     break;
    // }
}

// function cartNewRow (prodNumber, amount) {

//     let cartTable = $("#cartBody")[0];
//     let prodIndex = prodNumber - 1;
//     let prodString = Productos[prodIndex].name;

//     cartProducts[prodIndex] += amount;
    
//     let newRow = cartTable.insertRow();
    
//     prodCell = newRow.insertCell();
//     amoCell = newRow.insertCell();
//     btnCell = newRow.insertCell();

//     prodCell.className += "text-left";
//     amoCell.className += "text-center";
//     btnCell.className += "text-right";

//     prodCell.appendChild(document.createTextNode(prodString));
//     amoCell.appendChild(document.createTextNode(cartProducts[prodIndex]));
    
//     let deleteBtn = document.createElement("button");
//     let icon = document.createElement("i");
//     icon.className = "fa fa-trash";
//     deleteBtn.className = "btn btn-sm btn-danger";
//     deleteBtn.onclick = cartRemoveRow;
//     deleteBtn.appendChild(icon);
//     btnCell.appendChild(deleteBtn);

// }

function cartNewRow(producto) {
    cartRowHTML =
    `<tr>
        <td class="text-left">${producto.name}</td>
        <td class="text-center" id="prod${producto.id}Qty">0</td>
        <td class="text-right"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${producto.id})"><i class="fa fa-trash"></i></button></td>
    </tr>`;

    $("#cartBody").append(cartRowHTML).children().hide();
}

function setCart() {
    for (producto of Productos)
    {
        $("#prod"+producto.id+"Qty").text(cartProducts[producto.id-1]);
        if (cartProducts[producto.id-1]==0) {
            $("#cartBody").find('tr').eq(producto.id-1).hide();
        }
        else $("#cartBody").find('tr').eq(producto.id-1).show();
    }
}

// function setCartAmount (prodNumber, amount) {
//     let cartTable = document.getElementById("cartBody");
//     let n = cartTable.rows.length;
//     let prodString = "Producto " + prodNumber;

//     for (let r = 0; r < n; r++) {
//         if (cartTable.rows[r].cells[0].innerHTML == prodString) {
//             cartTable.rows[r].cells[1].innerHTML = amount;
//         }
//     }
// }

function removeFromCart(prodNumber) {
    // let prodNumber = parseInt($(this).closest('tr').children().first().text().slice(9));
    cartProducts[prodNumber-1]=0;
    // $(this).closest('tr').remove();
    setCart();
    setTotals();
}

function setTotals() {
    let subtotal=0, shipCost, total;
    for (let i=0;i<Productos.length;i++){
        subtotal+=cartProducts[i]*Productos[i].price;
    }
    if (subtotal==0)
    {
        $("#subtotal, #shipCost, #total").text("$--")
        return;
    }
    shipCost=Math.max(subtotal*0.1,125);
    total=shipCost+subtotal;
    $("#subtotal").text(pesoFormat(subtotal));
    $("#shipCost").text(pesoFormat(shipCost));
    $("#total").text(pesoFormat(total));


}

pesoFormat = (number) => {
    let numberPesos= new Intl.NumberFormat("es-419",{style:"currency",currency:"ARS",currencyDisplay:"narrowSymbol",minimumFractionDigits:"2"}).format(number);
    return numberPesos;}