window.addEventListener("load", function(){
    Grade(document.querySelectorAll("#gradientWrap"));

    var img = document.querySelector("#image");
    img.naturalWidth

    // document.getElementById("gradientWrap").style.width = `${img.naturalWidth+40}px`;
    // console.log(img.naturalWidth);
    document.getElementById("gradientWrap").style.height = `${img.naturalHeight+60}px`;
    console.log(img.naturalHeight);
})