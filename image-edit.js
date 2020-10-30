var imageEdit = {
    currentImage: {}
}

const compressorHeightSlider = document.getElementById("compressorHeight")
const compressorWidthSlider = document.getElementById("compressorWidth")
const compressorHeightLabel = document.getElementById("compressorHeightLabel")
const compressorWidthLabel = document.getElementById("compressorWidthLabel")

let height = 50
let width = 50

const compressorBtn = document.getElementById("compressorBtn")

window.onload = (ev) => {
    document.getElementById("upload-image").addEventListener("change", (imageEvent) => {
        imageEdit.currentImage = imageEvent.target.files[0];
        if (FileReader) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById("preview").src = fr.result;
                compressorHeightSlider.max = document.getElementById("preview").height
                compressorHeightSlider.value = document.getElementById("preview").height
                compressorHeightLabel.innerText = `Height: ${document.getElementById("preview").height}`
                compressorWidthSlider.max = document.getElementById("preview").width
                compressorWidthSlider.value = document.getElementById("preview").width
                compressorWidthLabel.innerText = `Width: ${document.getElementById("preview").width}`
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
            compressorHeightSlider.max = document.getElementById("preview").height
            compressorHeightSlider.value = document.getElementById("preview").height
            compressorHeightLabel.innerText = `Height: ${document.getElementById("preview").height}`
            compressorWidthSlider.max = document.getElementById("preview").width
            compressorWidthSlider.value = document.getElementById("preview").width
            compressorWidthLabel.innerText = `Width: ${document.getElementById("preview").width}`
        }
    })
}

function changeCompressorHeight(evt) {
    height = evt.target.value
    compressorHeightLabel.innerText = `Height: ${height}`
}

function changeCompressorWidth(evt) {
    width = evt.target.value
    compressorWidthLabel.innerText = `Width: ${width}`
}

compressorBtn.addEventListener('click', compressor)
compressorHeightSlider.addEventListener('change', changeCompressorHeight)
compressorWidthSlider.addEventListener('change', changeCompressorWidth)