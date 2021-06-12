const urlProducts = "https://my-json-server.typicode.com/rusonariga/coderhouse_JS/Products";
const urlPromos = "https://my-json-server.typicode.com/rusonariga/coderhouse_JS/Promos";
var Products=[], subtotal=0, Promos=[], shipCost=0, promoValue=0, total=0;

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = $('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        else {
          event.preventDefault();
          $.get(urlProducts)
          .done((serverData)=>{
              
              let serverDataIndex=0;
              for (product of Products) {
                  serverDataIndex=serverData.findIndex((dataProduct)=> {return dataProduct.id===product.id});
                  if (serverDataIndex==-1) {
                      alert(`El producto ${product.name} que intentaba comprar ha sido eliminado del catálogo. Le llevaremos de vuelta a la sección de compras`);
                      break;
                  }
                  else if (product.amountToBuy>serverData[serverDataIndex].stock) {
                      alert(`Lo sentimos, quedan ${product.stock} unidades disponibles de ${product.name}. Le llevaremos de vuelta a la sección de compras`);
                      serverDataIndex=-1;
                      break;
        
                  }
              }
              if (serverDataIndex==-1) window.setTimeout(function(){window.location.href="imbrioscia_cart.html"}, 3000);
              else {
                alert("Su compra se realizó con éxito. ¿Desea seguir comprando? Le llevaremos de vuelta a la sección de compras");
                window.setTimeout(function(){window.location.href="imbrioscia_cart.html"}, 1000);
              }
          });
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())

$(document).ready( ()=> {
  Products=JSON.parse(sessionStorage.getItem("prodPurchase"));
  if (Products==null) {
    alert("No recibimos información de su compra. Le redirigiremos a la ventana de selección de productos");
    window.setTimeout(function(){window.location.href="imbrioscia_cart.html"}, 3000);
  }
  else {
    $("#prodQty").text(Products.length);
    for(product of Products){
      listNewRow(product);
      subtotal+=product.amountToBuy*product.price;
    }
    subtotalRow();
    shipmentRow();
    $.get(urlPromos).done(function(respuesta) {
      Promos=respuesta;
      $("#promoInput").show();
      promoRow();
    })
    .always(()=>{totalRow();});
    

    
  }



})

listNewRow = (product) => {
  let listRowHTML =
  `<li class="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      <h6 class="my-0" id="prod${product.id}Name">${product.name}</h6>
      <small class="text-muted" id="prod${product.id}AmountToBuy">${product.amountToBuy} unidades</small>
    </div>
    <span class="text-muted" id="prod${product.id}TotalPrice">${pesoFormat(product.price*product.amountToBuy)}</span>
  </li>`;
  // `<tr id="prod${product.id}CartRow">
  //     <td class="text-left">${product.name}</td>
  //     <td class="text-center" id="prod${product.id}AmountToBuy">0</td>
  //     <td class="text-right"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${product.id})"><i class="fa fa-trash"></i></button></td>
  // </tr>`;

  $("#cartProdList").append(listRowHTML);
}

subtotalRow = () => {
  subtotalRowHTML=
    `<li class="list-group-item d-flex justify-content-between">
        <span>Subtotal</span>
        <strong id="subtotal">${pesoFormat(subtotal)}</strong>
    </li>`;
    $("#cartProdList").append(subtotalRowHTML);

}

shipmentRow = () => {
  shipCost=Math.max(subtotal*0.1,125);
  shipmentRowHTML=
    `<li class="list-group-item d-flex justify-content-between">
        <span>Costo de envío</span>
        <span id="shipment">${pesoFormat(shipCost)}</span>
    </li>`;
    $("#cartProdList").append(shipmentRowHTML);

}

promoRow = () => {
  promoRowHTML=
    `<li class="list-group-item d-flex justify-content-between bg-light">
        <div class="text-success">
          <h6 class="my-0" id="promoCode">Código de promo</h6>
          <small id="promoDesciption">Introduzca un código de promoción</small>
        </div>
        <span class="text-success" id="promo">$--</span>
      </li>`;
    $("#cartProdList").append(promoRowHTML);

}

totalRow = () => {
  total=shipCost+subtotal;
  totalRowHTML=
    `<li class="list-group-item d-flex justify-content-between light-gray bg-success">
        <strong>Total</strong>
        <strong id="total">${pesoFormat(total)}</strong>
    </li>`;
    $("#cartProdList").append(totalRowHTML);

}

pesoFormat = (number) => {
  let numberPesos= new Intl.NumberFormat("es-419",{style:"currency",currency:"ARS",currencyDisplay:"narrowSymbol",minimumFractionDigits:"2"}).format(number);
  return numberPesos;
}

promoButton = (e) => {
  e.preventDefault();
  let promoEntered=$("#promoText").val();
  let promoIndex=Promos.findIndex((promo)=> {return promo.code===promoEntered});
  if (promoIndex==-1) {
    alert("Código de promoción inválido");
    $("#promoText").val("");
    return;
  }
  
  switch (Promos[promoIndex].type) {
    case "discount value":
      promoValue=Promos[promoIndex].value;
      if (subtotal<=2*promoValue) {
        alert("Promoción no aplicable a esta compra. La compra debe ser de un valor mínimo de "+pesoFormat(2*promoValue));
      }
      else {
        total=subtotal+shipCost-promoValue;
        $("#total").text(pesoFormat(total));
        $("#promo").text(pesoFormat(-promoValue));
        $("#promoCode").text(promoEntered);
        $("#promoDesciption").text("Descuento");
      }
      $("#promoText").val("");
      break;
    
    case "discount percentage":
      promoValue=Promos[promoIndex].value*subtotal/100;
      total=subtotal+shipCost-promoValue;
      $("#total").text(pesoFormat(total));
      $("#promo").text(pesoFormat(-promoValue));
      $("#promoCode").text(promoEntered);
      $("#promoDesciption").text("Descuento del "+Promos[promoIndex].value+"% sobre subtotal");
      $("#promoText").val("");
      break;

    case "free shipment":
      promoValue=shipCost;
      total=subtotal+shipCost-promoValue;
      $("#total").text(pesoFormat(total));
      $("#promo").text(pesoFormat(-promoValue));
      $("#promoCode").text(promoEntered);
      $("#promoDesciption").text("Envío gratis");
      $("#promoText").val("");
      break;
    case "shipment percentage":
      promoValue=shipCost*Promos[promoIndex].value/100;
      total=subtotal+shipCost-promoValue;
      $("#total").text(pesoFormat(total));
      $("#promo").text(pesoFormat(-promoValue));
      $("#promoCode").text(promoEntered);
      $("#promoDesciption").text("Descuento del "+Promos[promoIndex].value+"% sobre el envío");
      $("#promoText").val("");
      break;
    }
  $("#promoText").val("");
}

buyButton = (e) => {
  e.preventDefault();
  
}