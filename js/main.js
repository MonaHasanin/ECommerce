let cartIcon=document.getElementById('shopping');
let cart=document.querySelector('.cart');
let closeIcon=document.getElementById('close');
let content = document.getElementById('content');
let list = document.querySelector(".list");
let listCart = document.querySelector(".cart-list");
let quantity = document.querySelector('.quantity');
let total = document.querySelector(".total");
 
cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active")
});
closeIcon.addEventListener("click" , ()=>{
    cart.classList.remove("active")
});
let product = [
    {  id:1,
    image: "/1.png" ,
    name: "number 1",
    desc: "plaplapla",
    price: 100,    },
    {  id:2,
    image: "/2.png",
    name: "2",
    desc: "my cart",
    price: 200,},
    {  id:3,
    image: "/3.png",
    name: "3",
    desc: "3",
    price: 300,},
    {  id:4,
    image: "/4.png",
    name: "4",
    desc: "4",
    price: 400,},
    {  id:5,
    image:  "/5.png",
    name: "5",
    desc: "5",
    price: 500,},
   { id:6,
    image:  "/6.png",
    name: "num 6",
    desc: "hello desc",
    price: 600,
 }];
let listCards = [];
function initApp() {
    product.forEach((value) => {
        
        let newDiv = document.createElement("div")
        newDiv.classList.add("card");
        newDiv.innerHTML = `
        <img src="image/${value.image}" class="rounded d-block image-fluid container-fluid">
        <h4 class="card-title text-danger mx-auto d-block ">${value.name}</h4>
        <p class="card-text">${value.desc}</p>
        <h6 class="card-text .small alert-primary">Price: ${value.price}</h6>
        <a href="#" class="btn btn-primary" onclick="addToCart(${value.id})">Buy Now</a>
 
        `

        content.appendChild(newDiv);
    });
}
initApp();
function addToCart(id){
    let products = product.find( p => p.id === id );
    let productIndex = listCards.findIndex( p => p.id === id)
    if ( productIndex > -1 ) {
        listCards[productIndex].quantity += 1
    }else{
        listCards.push({...products,quantity:1})
    }
    reloadCards();
};

function reloadCards() {
    listCart.innerHTML = "";
    let count = 0;
   // let change = 0;
    let totalPrice = 0;
    listCards.forEach((value)=>{
        totalPrice += value.price * value.quantity;
        count += value.quantity;

        let newDiv = document.createElement("li");
        newDiv.classList.add("box")
        newDiv.innerHTML=`

        <div class="d-flex row-col-3 pt-2" >

        <img src="image/${value.image}">
        <div class="d-flex row-col-3 p-1"> Name: ${value.name}</div>
        
        <span class="d-flex row-col-3 p-1">
       Price: ${value.price.toLocaleString()}EG
        </span>


        
        <div class="change d-flex ">
        <button class="btn btn-primary h-25 w-25 p-2" style="font-size: 80%;"  onclick="changeQuantity
        (            (${value.id}) , ${value.quantity - 1 }            )"
       >
             - </button>

        <div class="count p-1">        ${value.quantity}        </div>

        <button class="btn btn-danger h-25 w-25 p-2" style="font-size: 80%;" onclick="changeQuantity
        (            (${value.id}) , ${value.quantity + 1 }            )"> 
            +             </button>
 
         </div>
        </div>
        
        `
        listCart.appendChild(newDiv);
    });
    total.innerHTML = totalPrice.toLocaleString() + " EG";
    quantity.innerHTML = count;
};

function changeQuantity(id, newQuantity){
  let productIndex = listCards.findIndex( p => p.id === id )
  if (newQuantity === 0) {
    listCards.splice(productIndex,1)
  }else{
  listCards[productIndex].quantity = newQuantity;
  }
  reloadCards();
}