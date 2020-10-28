var imageEdit = {
    currentImage: {}
}

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
