const selectColor = document.getElementById("selectColor");
const productView = document.getElementById("productView");
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