const selectColor = document.getElementById("selectColor");
const productView = document.getElementById("productView");
const countOrder  = document.getElementById("countOrder");
const increment   = document.getElementById("increment");
const decrement   = document.getElementById("decrement");
const showPrice   = document.getElementById("showPrice");
const selectSize  = document.getElementById("selectSize");
const productTitle= document.getElementById("productTitle").innerText;
const orderContainer = [];
const orderObj = {title:productTitle,price:"",color:"",size:"",qnt:"",preview:""};
const imgContainer=[
    {
        color:"purple",
        source:"./resource/image/purple.jpeg"
    },
    {
        color:"black",
        source:"./resource/image/black.jpeg"
    },
    {
        color:"blue",
        source:"./resource/image/blue.jpeg"
    },
    {
        color:"cyan",
        source:"./resource/image/cyan.jpeg"
    }
]

// get selected color
selectColor.addEventListener("click",(items)=>{
    if(items.target.classList.contains("h-4")){
        const takeId = items.target.parentElement.id;
        orderObj.color = takeId;

        colorBaseProduct(takeId);
    }else{
        const takeId = items.target.id;
        orderObj.color = takeId;

        colorBaseProduct(takeId)
    }

    if(items.target.classList.contains("h-4")){
        const step1 = items.target.parentElement.closest("div");
        const step2 = step1.querySelectorAll("div>span");
        const step3 = items.target.style.backgroundColor;

        step2.forEach((value)=>{
            value.style.borderColor = "transparent";
            value.style.borderWidth = "0px"
        })

        items.target.parentElement.style.borderColor = step3;
        items.target.parentElement.style.borderWidth = "2px"
    }
})

// show product base on color
function colorBaseProduct(items){
    const step1 = imgContainer.filter(selection=>selection.color == items);

    if(imgContainer.filter(check=>check.color.includes(items)).length === 1){
        productView.src = step1[0].source;
    }else{
        productView.src = productView.src;
    }

    orderObj.preview = productView.src;
}

// decrement order
decrement.addEventListener("click",()=>{countCurrentOrder(-1)})

// increment order
increment.addEventListener("click",()=>{countCurrentOrder(1)})

// count current order
function countCurrentOrder(value){
    const currentOrder = parseInt(countOrder.innerText) + parseInt(value) < 0 ? 0 : parseInt(countOrder.innerText) + parseInt(value);

    countOrder.innerText = currentOrder;

    orderObj.qnt = countOrder.innerText;
}

// show price base on size
selectSize.addEventListener("click",(items)=>{
    const step1 = (items.target.innerText).match(/\d+/g);
    const step2 = Number(step1).toFixed(2);
    // const step3 = (items.target.innerText).replace(/[^a-zA-Z\s]/g, "");

    // get size code
    if(items.target.classList.contains("px-[18px]")){
        orderObj.size = (items.target.innerText).replace(/[^a-zA-Z\s]/g, "");
    }else{
        orderObj.size = (items.target.parentElement.innerText).replace(/[^a-zA-Z\s]/g, "");
    }
    if(step2 == "NaN"){
        showPrice.innerText = showPrice.innerText;

        orderObj.price = showPrice.innerText;
    }else{
        showPrice.innerText = "$" + step2;

        orderObj.price = step2;
    }

    const assume1 = items.target.parentElement.closest("div #selectSize");
    const assume2 = assume1.querySelectorAll("div");

    assume2.forEach((value)=>{
        value.classList.remove("border-[#6576FF]")
        value.childNodes[1].classList.remove("text-[#6576FF]")
    })
    items.target.closest("div").classList.add("border-[#6576FF]");
    items.target.closest("div").childNodes[1].classList.add("text-[#6576FF]")
})
// add to cart
function addCart(){
   
}