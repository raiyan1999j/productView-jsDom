const selectColor = document.getElementById("selectColor");
const productView = document.getElementById("productView");
const countOrder  = document.getElementById("countOrder");
const increment   = document.getElementById("increment");
const decrement   = document.getElementById("decrement");
const showPrice   = document.getElementById("showPrice");
const selectSize  = document.getElementById("selectSize");
const countCart   = document.getElementById("countCart");
const productTitle= document.getElementById("productTitle").innerText;
const orderContainer = [];
const orderObj = {title:productTitle,price:"$79",color:"purple",size:"M",qnt:"0",preview:"./resource/image/purple.jpeg"};
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
});

// showing modal
countCart.addEventListener("click",(event)=>{
    
})
// add to cart
function addCart(){
    orderContainer.push({...orderObj})
    orderObj.price = "$79";
    orderObj.color = "purple";
    orderObj.size  = "M";
    orderObj.qnt   = "0";
    orderObj.preview= "./resource/image/purple.jpeg"

    defaultData();
    totalCart();
}
// show sum of total cart
function totalCart(){
    const step1 = orderContainer.length;;

    countCart.innerText = step1;
}
// show default data
 function defaultData(){
    const bandColor = selectColor.querySelectorAll("div>span");
    const wristSize = selectSize.querySelectorAll("div > div");
    
    bandColor.forEach((value)=>{
        if(value.id == orderObj.color){
            const bgColor = value.children[0].attributes[1].nodeValue;
            const bgColorCode = bgColor.split(":")[1].split(";")[0];

            value.style.borderColor = bgColorCode;
            value.style.borderWidth = "2px";
        }else{
            value.style.borderColor = "transparent";
            value.style.borderWidth = "0px";
        }
    })

    wristSize.forEach((value)=>{
        const defaultSize = (value.children[0].innerText).replace(/[^a-zA-Z\s]/g, "").trim();

        if(defaultSize.toLowerCase() == orderObj.size.toLowerCase()){
            value.classList.add("border-[#6576FF]");

            value.children[0].classList.add("text-[#6576FF]");
        }else{
            value.classList.remove("border-[#6576FF]");
            
            value.children[0].classList.remove("text-[#6576FF]")
        }
    })

    countOrder.innerText = orderObj.qnt;
    productView.src = orderObj.preview;
    showPrice.innerText = orderObj.price;
}

defaultData();
