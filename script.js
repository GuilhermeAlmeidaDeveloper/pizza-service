const c = (el)=>document.querySelector (el);
const cs = (el)=>document.querySelectorAll (el)
//funções para retornar o elemento/array selecionado.

let modalQt = 1;
//Definindo a quantidade padrao de itens no modal.



pizzaJson.map ((item, index)=>{       //mapeando JSON
    
    let pizzaItem = c ('.models .pizza-item').cloneNode(true);
    // preenchimento referente a base de informações em 'pizza-item'.

    c ('.pizza-area').append (pizzaItem)
    // adicionando as pizzas uma após a outra.

    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    //Adicionando as informações da pizza na tela principal. 
    
    pizzaItem.querySelector('a').addEventListener ('click', (e)=>{
        e.preventDefault();
        //removendo o efeito de ida para outra url ao clicar em 'pizza-item'.

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //Atribuindo a cada pizza uma identificação dentro do modal.
        
        modalQt = 1;
        //Redefinindo a quantidade de items para 1 no modal.
        
        c('.pizzaBig img').src = pizzaJson[key].img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML =  `R$ ${pizzaJson[key].price.toFixed(2)}`
        c('.pizzaInfo--size.selected').classList.remove('selected');  
        cs('.pizzaInfo--size').forEach ((size, sizeIndex)=> {
            if(sizeIndex == 2){
                size.classList.add('selected');  
            }
            size.querySelector('span').innerHTML=pizzaJson[key].sizes[sizeIndex]
        });
        //Adicionando as infos das pizzas dentro do (modal).

        c('.pizzaInfo--qt').innerHTML = modalQt;    

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout (() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
        //Adicionando efeito de abertura do pizzaWindowArea.
        
    });


});

function closeModal (){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout (()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500); 
}  //Criando a função para fechar o Modal

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});  //Aplicando o efeito de fechar o modal nos botões.

c('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if (modalQt > 1){    
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    } 
}); // Dando funcionalidade para diminuir a quantidade de itens

c('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt; 
}); //Dando funcionalidade para aumentar a quantidade de itens

cs('.pizzaInfo--size').forEach ((size, sizeIndex)=> {
   size.addEventListener('click', (e)=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected'); 
   });
}); //Aplicando efeito de clique nos tamanhos da pizza dentro do modal.



  
