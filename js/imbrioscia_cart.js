class Producto {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.amountToBuy=0;
    }
}

var Products = [];


const urlProducts = "https://my-json-server.typicode.com/rusonariga/coderhouse_JS/Products";




$(document).ready( ()=> {
    $.get(urlProducts).done(function(respuesta) {
            Products=respuesta;
            for(product of Products){
                product.amountToBuy=0;
                prodNewRow(product);
                cartNewRow(product);
            }
            $("#prodTableBody td").addClass("align-middle");

    }).fail(()=>{
        alert("Ha ocurrido un error al cargar los productos de nuestro servidor. Sepa disculpar las molestias");
    }).always(()=>{});

});

function prodNewRow(product){
    if (product.stock==0) {
        stockCheck="Sin stock";
        prodEnable="disabled";}
    else {
        stockCheck="En stock";
        prodEnable="";}
    prodRowHTML =
    `<tr id="prod${product.id}Row">
        <td class="d-none d-sm-table-cell"> <img src="https://dummyimage.com/50x50/55595c/fff"/> </td>
        <td> ${product.name} </td>
        <td  class="d-none d-sm-table-cell" id="prod${product.id}Stock">${stockCheck}</td>
        <td class="text-center"><input id="prod${product.id}Input" ${prodEnable} type="number" step="1" max="${product.stock}" min="1" value="1" title="Qty" class="qty" size="3"></td>
        <td class="text-right" id="prod${product.id}Price">${pesoFormat(product.price)}</td>
        <td><button class="btn btn-sm btn-success" id="prod${product.id}AddButton" onclick="addToCart(${product.id})" ${prodEnable}><i class="fa fa-plus"></i></button></td>
    </tr>`;

    $("#prodTableBody").append(prodRowHTML);
}

function workInProgress() {
    message = "El botón seleccionado no funciona. Estamos trabajando para mejorar el sitio. Gracias por su paciencia."
    alert(message);
}

function addToCart(prodID) {
    let prodIndex=Products.findIndex((product)=> {return product.id===prodID});
    let amountToAdd=parseInt($(`#prod${prodID}Input`).val());
    if (amountToAdd+Products[prodIndex].amountToBuy>Products[prodIndex].stock)
    {
        alert('Lo sentimos, sólo tenemos disponibles '+Products[prodIndex].stock+' unidades de este producto. Por favor, seleccione otra cantidad');
        return;
    }
    Products[prodIndex].amountToBuy+=amountToAdd;
    setCart();
    setTotals();

}

function cartNewRow(product) {
    cartRowHTML =
    `<tr id="prod${product.id}CartRow">
        <td class="text-left">${product.name}</td>
        <td class="text-center" id="prod${product.id}AmountToBuy">0</td>
        <td class="text-right"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${product.id})"><i class="fa fa-trash"></i></button></td>
    </tr>`;

    $("#cartBody").append(cartRowHTML).children().hide();
}

function setCart() {
    for (product of Products)
    {
        $("#prod"+product.id+"AmountToBuy").text(product.amountToBuy);
        if (product.amountToBuy==0) {
            $(`#prod${product.id}CartRow`).hide();
        }
        else {
            $(`#prod${product.id}AmountToBuy`).text(product.amountToBuy);
            $(`#prod${product.id}CartRow`).show();
        }
    }
}


function removeFromCart(prodID) {
    let prodIndex=Products.findIndex((product)=> {return product.id===prodID});
    Products[prodIndex].amountToBuy=0;
    setCart();
    setTotals();
}

function setTotals() {
    let subtotal=0, shipCost, total;
    for (product of Products){
        subtotal+=product.amountToBuy*product.price;
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
    return numberPesos;
}

payButton = () => {
    $.get(urlProducts)
    .done((serverData)=>{
        
        let prodPurchase=[], serverDataIndex=0;
        for (product of Products) {
            if (product.amountToBuy==0) continue;
            serverDataIndex=serverData.findIndex((dataProduct)=> {return dataProduct.id===product.id});
            if (serverDataIndex==-1) {
                alert(`El producto ${product.name} que intentaba comprar ha sido eliminado del catálogo. Recargaremos la página para mostrar los productos correctos`);
                break;
            }
            else if (product.amountToBuy>serverData[serverDataIndex].stock) {
                product.stock=serverData[serverDataIndex].stock;
                product.amountToBuy=product.stock;
                if (product.stock==0){
                    $(`#prod${product.id}Stock`).text("Sin stock");
                    $(`#prod${product.id}Input , #prod${product.id}AddButton`).prop("disabled",true);
                }
                alert(`Lo sentimos, quedan ${product.stock} unidades disponibles de ${product.name}`);
                setCart();
                setTotals();
                return;

            }
            else prodPurchase.push(product);
        }
        if (serverDataIndex==-1) window.setTimeout(function(){window.location.reload()}, 3000);
        else {
            if (!prodPurchase.length) {
                alert("Debe seleccionar al menos un producto");
                return
            }
            sessionStorage.setItem("prodPurchase",JSON.stringify(prodPurchase));
            window.location.href="imbrioscia_checkout.html";
        }
    })

}