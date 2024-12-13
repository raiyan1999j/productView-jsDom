const selectColor = document.getElementById("selectColor");
const productView = document.getElementById("productView");
const countOrder  = document.getElementById("countOrder");
const increment   = document.getElementById("increment");
const decrement   = document.getElementById("decrement");
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
    // console.dir(items.target.id)
    const getSequence = items.target.id;

    colorBaseProduct(getSequence)
})

// show product base on color
function colorBaseProduct(items){
    const step1 = imgContainer.filter(selection=>selection.color == items);

    if(imgContainer.filter(check=>check.color.includes(items)).length === 1){
        productView.src = step1[0].source
    }else{
        productView.src = productView.src;
    }
}

// decrement order
decrement.addEventListener("click",()=>{countCurrentOrder(-1)})

// increment order
increment.addEventListener("click",()=>{countCurrentOrder(1)})

// count current order
function countCurrentOrder(value){
    // console.log(countOrder.innerText)
    const currentOrder = parseInt(countOrder.innerText) + parseInt(value) < 0 ? 0 : parseInt(countOrder.innerText) + parseInt(value);

    countOrder.innerText = currentOrder;
}