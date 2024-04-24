//dados

let cart = []; //carrinho 

let modalQt = 1 ; 



let modalKey = 0 ; 

const c = (el)=>{
    return document.querySelector(el) //esse coidgo vai evitar de eu usar o document.queryselector(), pois ele ja vai retorna na variavel c . 
}

const cs = (el) => document.querySelectorAll(el) ;


// 1 coisa que devemos fazer é lista as pizzas 
//events 




//functions

// 1 coisa que devemos fazer é mapear o rray 

/* 
o map recebde 2 parametros, que é o item(que seria cada a pizza)

e o index(o numero do array daquele item 0,1,2 ... )
*/

//temos que clona o modelo 

//Listagem das pizzas 

pizzaJson.map((item,index)=>{   //mapear cada item doc aary

    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);/* cHAVE DAQUELA PIZZA expecifica */
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
  
    c('.pizza-area').append(pizzaItem) //adiciona um conteuda ao conteudo que ja existe 

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault() ;

        let key = e.target.closest('.pizza-item').getAttribute('data-key') //vai sair do elemento a, e procura o elemento mais proximo 

        modalQt = 1 ; 

        modalKey = key ; 

        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].price.toFixed(2)}`
        c('.pizzaBig img').src = pizzaJson[key].img

        c('.pizzaInfo--size.selected').classList.remove('selected')

        cs('.pizzaInfo--size').forEach((size,sizeIndex)=> {

            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
            
        });

        c('.pizzaInfo--qt').innerHTML = modalQt ; 


        c(".pizzaWindowArea").style.opacity = 0 ; 
        c(".pizzaWindowArea").style.display = 'flex' ;

        setTimeout(()=>{
            c(".pizzaWindowArea").style.opacity = 1 ; 
        },200);

    })

   

}) ;


//eventos do modal 

function closeModal(){

    c(".pizzaWindowArea").style.opacity = 0 ; 
    setTimeout(()=>{
        c(".pizzaWindowArea").style.display = 'none' ;

    },500)


}

cs('.pizzaInfo--cancelButton , .pizzaInfo--cancelMobileButton').forEach((item)=>{

    item.addEventListener('click', closeModal);
})

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{

    if(modalQt > 1 ){

        modalQt-- ; 
        c('.pizzaInfo--qt').innerHTML = modalQt ;
    }
   
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    
    modalQt++ ; 
    c('.pizzaInfo--qt').innerHTML = modalQt ;
})

cs('.pizzaInfo--size').forEach((size,sizeIndex)=> {

   size.addEventListener('click', (e)=>{

        c('.pizzaInfo--size.selected').classList.remove('selected') ;
        size.classList.add('selected')

   })
    
});

//eventos do carrinho 

// 1, quando  gente clica no butao de adiciona o carrinho, nos vamos ter que reunir as informações para por no carrinho 


c('.pizzaInfo--addButton').addEventListener("click", ()=>{

    // 3 informações obrigatorias para por no carrinho 
    //Qual a pizza ? 

    

    //Qual o tamanho ? 

    let size =  parseInt(c('.pizzaInfo--size.selected').getAttribute("data-key"))
    

    //Quantas pizzas ? 

    let identifier = pizzaJson[modalKey].id+ '@'+size ;
    

    let key = cart.findIndex((item)=>{
        return item.identifier == identifier ; 
    })

    if(key > -1){

        cart[key].qt += modalQt ; 
    }else{

        cart.push({
            identifier ,
            id : pizzaJson[modalKey].id ,
            size, 
            qt: modalQt ,
       }) ;
    }
   
 

   //agr fecha o modal 

   updateCart() ;
   closeModal() ; 



})


function updateCart(){

   

    if(cart.length > 0){

        //mostrar o carrinho 
        c('aside').classList.add("show") ;

        c('.cart').innerHTML = '' ; 

        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == cart[i].id
            })

            let cartItem = c(".cart--item").cloneNode(true)

            let pizzaSizeName ;

            switch(cart[i].size){
                case 0 : 
                    pizzaSizeName = 'P';
                break ;
                case 1 : 
                    pizzaSizeName = 'M' ;
                break ;
                case 2 : 
                    pizzaSizeName = 'G' ; 
                break ; 

            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

          

            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector(".cart--item img").src = pizzaItem.img 
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            c('.cart').append(cartItem)


           
        }


    }else{

        //tira o carrinho de tela 
        c('aside').classList.remove("show") ;

    }
}

