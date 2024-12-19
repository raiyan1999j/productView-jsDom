const selectColor = document.getElementById("selectColor");
const productView = document.getElementById("productView");
const countOrder  = document.getElementById("countOrder");
const increment   = document.getElementById("increment");
const decrement   = document.getElementById("decrement");
const showPrice   = document.getElementById("showPrice");
const selectSize  = document.getElementById("selectSize");
const countCart   = document.getElementById("countCart");
const modalBox    = document.getElementById("modalBox");
const appendData  = document.getElementById("appendData");
const productTitle= document.getElementById("productTitle").innerText;
const orderContainer = [];
const toggleModal = {show:false};
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
    showCart(orderContainer);
}
// show cart data
function showCart(){
    appendData.innerHTML = orderContainer.map((items,index)=>{
        return `<div
              class="w-[563px] mx-auto flex flex-row justify-between items-center border border-[#DBDFEA] border-t-0 border-r-0 border-l-0 mt-4 pt-1 pb-2"
            >
              <div class="w-[278px] flex flex-row items-center">
                <div class="h-[41.79px] w-[36.64px]">
                  <img
                    src=${items.preview}
                    class="h-full w-full object-contain"
                    alt="image"
                  />
                </div>
                <div class="ml-[7.36px]">
                  <p
                    class=" font-normal text-sm leading-[23.1px] text-[#8091A7] capitalize"
                  >
                    ${items.title}
                  </p>
                </div>
              </div>
              <div class="w-[62px]">
                <h5
                  class=" font-normal text-sm leading-[23.1px] text-[#364A63] capitalize"
                >
                  ${items.color}
                </h5>
              </div>
              <div class="w-[69px]">
                <h5
                  class=" font-normal text-sm leading-[23.1px] text-[#364A63] capitalize"
                >
                    ${items.size}
                </h5>
              </div>
              <div class="w-[59px]">
                <h5
                  class=" font-normal text-sm leading-[23.1px] text-[#364A63] capitalize"
                >
                  ${items.qnt}
                </h5>
              </div>
              <div class="w-[91px] text-right">
                <h5
                  class=" font-normal text-sm leading-[23.1px] text-[#364A63] capitalize"
                >
                  $${items.price * items.qnt}
                </h5>
              </div>
            </div>`
    })
    
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
// preview modal box
function modalCondition(condition){
    if(condition){
        modalBox.classList.remove("hidden","opacity-0");
    }else{
        modalBox.classList.add("hidden")
    }
}
defaultData();
