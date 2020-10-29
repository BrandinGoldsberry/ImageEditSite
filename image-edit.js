var imageEdit = {
    currentImage: {}
}

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
        }
    })
}

compressorBtn.addEventListener('click', compressor)