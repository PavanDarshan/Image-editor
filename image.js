
const fileInput = document.querySelector(".file-input"),
filterOption = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img .image-pad"),
resetFilterBtn = document.querySelector(".reset"),
chooseImage = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save");



let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;



const loadImage=()=>{
    let file=fileInput.files[0];
    if(!file)
        return;
    previewImg.src=URL.createObjectURL(file); // creating file object passing url

    previewImg.addEventListener("load",()=>{
        resetFilterBtn.click();
        document.querySelector(".main-container").classList.remove("disable");
        
    })

}
const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


filterOption.forEach(option => {
    option.addEventListener("click",()=>{
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText=option.innerText;

        if(option.id ==="brightness")
            {
                filterSlider.max="200";
                filterSlider.value=brightness;
                filterValue.innerText=`${brightness}%`
            }
        else  if(option.id ==="inversion")
            {
                filterSlider.max="100";
                filterSlider.value=inversion;
                filterValue.innerText=`${inversion}%`
            }
            
        else if(option.id ==="saturation")
            {
                filterSlider.max="200";
                filterSlider.value=saturation;
                filterValue.innerText=`${saturation}%`
            }
        else 
            {
                filterSlider.max="100";
                filterSlider.value=grayscale;
                filterValue.innerText=`${grayscale}%`
            }
            
    });
    
});


const updateFilter=()=>{
    filterValue.innerText=`${filterSlider.value}%`;
    const selectedFilter=document.querySelector(".filter .active");
    if(selectedFilter === "brightness")
        {
            brightness=filterSlider.value;
        }
    else if(selectedFilter === "saturation")
        {
            saturation=filterSlider.value;
        }
    else if(selectedFilter === "inversion")
        {
            inversion=filterSlider.value;
        }
        else
        {
            grayscale=filterSlider.value;
        }
    applyFilter();

}
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});
const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOption[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

resetFilterBtn.addEventListener("click", resetFilter);
fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFilter);
chooseImage.addEventListener("click",()=> fileInput.click());
saveImgBtn.addEventListener("click", saveImage);