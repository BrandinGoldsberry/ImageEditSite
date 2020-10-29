var imageEdit = {
    currentImage: {}
}

let brightness = 10;
let contrast = 10;
let sepia = 10;
let saturation = 10;
const camanBtn = document.getElementById("camanBtn")

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

function camanApply() {
    Caman("#preview", function () {
        this.brightness(brightness)
        this.contrast(contrast)
        this.sepia(sepia)
        this.saturation(saturation)
        this.render()
    })
}

camanBtn.addEventListener('click', camanApply)