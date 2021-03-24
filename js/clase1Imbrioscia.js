// BASIC EXAMPLES
//     var   textoA = "CODER";
//     let   textoB = "HOUSE";
//     const BLANCO = " ";

//     var number1 = 3;
//     var number2 = 2;
//     //Concatenar textoA y textoB ("CODER" + "HOUSE" = "CODERHOUSE")
//     let resultadoA = textoA + textoB;
//     //Concatenar textoB y 1 ("HOUSE" + 1 = "HOUSE1")
//     let resultadoB = textoB + 1;
//     //Concatenar textoA, BLANCO y textoB ("CODER" + " " + "HOUSE" = "CODER HOUSE")
//     let resultadoC = textoA + BLANCO + textoB;

//     let sum = number1 + number2;
//     let subs= number1 - number2;


// console.log(resultadoC);
// console.log("sum=",sum, "substraction=",subs);
// ***************************************************************************************

// PROMPT NAME REQUEST
// let firstName = prompt("ingrese su primer nombre");
// let lastName = prompt("ingrese su apellido");

// console.log(firstName);
// // console.log("Su nombre completo es:", firstName,lastName);

// fullName = firstName + " " + lastName;

// alert("su nombre completo es: " + fullName);
// ***************************************************************************************

// DESAFIO  COMPLEMENTARIO SIMPLE ALGORITHM

// string case
function stringFunction(){
    let firstName = prompt("ingrese su primer nombre","su nombre");
    let lastName = prompt("ingrese su apellido","su apellido");

    fullName = firstName + " " + lastName;

    alert("su nombre completo es: " + fullName);

    document.getElementById("algoritmoSimpleString").innerHTML =
    "Hola " + fullName + ", en que podemos ayudarte?";
}

// Number case
function numFunction(){
    let number1 = parseFloat(prompt("ingrese su primer numero","num1")); //puede ser int pero lo dejo abiero para no limitar por ahora
    let number2 = parseFloat(prompt("ingrese su segundo numero","num2"));

    sum= number1 + number2;

    alert("la suma de los numeros es: " + sum);

    document.getElementById("algoritmoSimpleSum").innerHTML =
        "La suma de los numeros ingresado es: " + sum;
}

// ***************************************************************************************

// DESAFIO ENTREGABLE CHECKEO DE NUMERO O FRASES PALINDROME

// String palindorme checker. 
//Permite el analisis de una palabra simple o una frase completa. Utilice funciones built in dado que todavia no vimos los loops (que a su vez son menos eficientes)
function stringPalindromeFunction(){
    let inputData = prompt("ingrese la frase a analizar");
    var clearTool = /[^A-Za-z0-9]/g;                        //busca todos los caracteres especiales
    var clearedInput = inputData.toLowerCase().replace(clearTool,''); //pasa todo a minuscula, quita caracteres especiales y espacios.
    var reverseInput =  clearedInput.split('').reverse('').join(''); //separa la frase char x char, revierte el orden y lo vuelve a juntar
    console.log(clearedInput);
    if (clearedInput == reverseInput){
        alert("La frase es palindroma!");
        document.getElementById("palindromeString").innerHTML =
        inputData +" = "+ reverseInput + ", claramente son palindromos";
    }else{
        alert("La frase no es palindroma!");
        document.getElementById("palindromeString").innerHTML =
        inputData +" != "+ reverseInput + ", ni cerca son iguales";
    }
}

// Number palindorme checker. 
//Permite el analisis de un valor numerico usando una funcion recursiva.

class reverseNum {
    static value = 0;
    static setValue (val) {
        this.value = val;
    }
    static getValue () {
        return this.value;
    }
}

function palindromeChecker (inputData) {

    if (parseInt(inputData)!=0)
    {
        var remainder;
        remainder = inputData%10;               // calcula el resto
        reverseNum.setValue((reverseNum.getValue()*10 + remainder)); // reacomoda los valores para esta pasada en aprticular
        palindromeChecker(parseInt(inputData/10));        // llamada recursiva a la funcion
    }
    return reverseNum.getValue();
}

function numPalindromeFunction(){
    let inputData = parseFloat(prompt("ingrese el numero a analizar"));
    var reverseInput;
    if (Number.isInteger(inputData)){               //verifica si es entero, sino sale del analisis

        if(inputData!=0 && parseInt(inputData/10)!=0) {    // se asegura q no sea 0, condicion absurda

            reverseInput =  palindromeChecker(inputData);

            if (inputData == reverseInput){
                alert("El numero es capicua");
                document.getElementById("palindromeNum").innerHTML =
                inputData +" = "+ reverseInput + ", claramente son capicuas";
            }else{
                alert("el numero no es capicua");
                document.getElementById("palindromeNum").innerHTML =
                inputData +" != "+ reverseInput + ", ni cerca son iguales";
            }
            reverseNum.setValue(0);
        }
        else {
            if (inputData==0) {alert("cero no vale!");}
            else {alert("un solo dígito no vale!");}
        }
    } else{alert(inputData + " es un numero no entero");}
}
