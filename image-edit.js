var imageEdit = {
    currentImage: {}
}

const compressorHeightSlider = document.getElementById("compressorHeight");
const compressorWidthSlider = document.getElementById("compressorWidth");
const compressorHeightLabel = document.getElementById("compressorHeightLabel");
const compressorWidthLabel = document.getElementById("compressorWidthLabel");

var height = 50;
var width = 50;

const compressorBtn = document.getElementById("compressorBtn")


const setVals = (fr) => {
    //Display image for nice styling, allows for scaling without editing the real image
    document.getElementById("preview").src = fr.result;
    //Hidden real image that the editing and data comes from
    document.getElementById("edit-image").src = fr.result;
    document.getElementById("edit-image").onload = () => {
        compressorHeightSlider.max = document.getElementById("edit-image").height;
        compressorHeightSlider.value = document.getElementById("edit-image").height;
        compressorHeightLabel.innerText = `Height: ${document.getElementById("edit-image").height}`;
        compressorWidthSlider.max = document.getElementById("edit-image").width;
        compressorWidthSlider.value = document.getElementById("edit-image").width;
        compressorWidthLabel.innerText = `Width: ${document.getElementById("edit-image").width}`;
        height = compressorWidthSlider.value = document.getElementById("edit-image").height;
        width = compressorWidthSlider.value = document.getElementById("edit-image").width;
    }
}

window.onload = (ev) => {
    document.getElementById("upload-image").addEventListener("change", (imageEvent) => {
        imageEdit.currentImage = imageEvent.target.files[0];
        if (FileReader) {
            var fr = new FileReader();
            fr.onload = function () {
               setVals(fr); 
            }
            fr.readAsDataURL(imageEvent.target.files[0]);
        }
    })
};

function compressor() {
    new Compressor(imageEdit.currentImage, {
        maxHeight: height,
        maxWidth: width,
        success(result) {
            imageEdit.currentImage = result
            document.getElementById("preview").src = URL.createObjectURL(result);
            document.getElementById("edit-image").src = URL.createObjectURL(result);
            compressorHeightSlider.max = document.getElementById("edit-image").height;
            compressorHeightSlider.value = document.getElementById("edit-image").height;
            compressorHeightLabel.innerText = `Height: ${document.getElementById("edit-image").height}`;
            compressorWidthSlider.max = document.getElementById("edit-image").width;
            compressorWidthSlider.value = document.getElementById("edit-image").width;
            compressorWidthLabel.innerText = `Width: ${document.getElementById("edit-image").width}`;
            height = compressorWidthSlider.value = document.getElementById("edit-image").height;
            width = compressorWidthSlider.value = document.getElementById("edit-image").width;
        }
    })
}

compressorBtn.addEventListener('click', compressor)
compressorHeightSlider.addEventListener('change', (e) => {
    height = e.target.value
    compressorHeightLabel.innerText = `Height: ${height}`
})
compressorWidthSlider.addEventListener('change', (e) => {
    width = e.target.value
    compressorWidthLabel.innerText = `Width: ${width}`
})

//cropper stuff
