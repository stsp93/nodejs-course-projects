module.exports = function(temp, product) {
    let output = temp.split('{%PRODUCTNAME%}').join(product.productName);
    output = output.split('{%IMAGE%}').join(product.image);
    output = output.split('{%PRICE%}').join(product.price);
    output = output.split('{%ORIGIN%}').join(product.from);
    output = output.split('{%NUTRIENTS%}').join(product.nutrients);
    output = output.split('{%QUANTITY%}').join(product.quantity);
    output = output.split('{%DESCRIPTION%}').join(product.description);
    output = output.split('{%ID%}').join(product.id);

    console.log(product.organic);
    if(!product.organic){
        output = output.split('{%NOT_ORGANIC%}').join('not-organic');
    }
    return output;
}