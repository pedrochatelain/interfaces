function filtro(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage) {

    let boton_filtro_negativo = document.querySelector(".js-filtro-negativo");
    let boton_filtro_brillo = document.querySelector(".js-filtro-brillo");
    let boton_filtro_grayscale = document.querySelector(".js-filtro-grayscale");
    let boton_filtro_sepia = document.querySelector(".js-filtro-sepia");

    boton_filtro_negativo.addEventListener("click", function() { setNegativo(canvas, canvas_invisible) });
    boton_filtro_brillo.addEventListener("click", function() { setBrillo(canvas, canvas_invisible) });
    boton_filtro_grayscale.addEventListener("click", function() { setGrayscale(canvas, canvas_invisible) });
    boton_filtro_sepia.addEventListener("click", function() { setSepia(canvas, canvas_invisible) });
    
    function setNegativo() {
        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        let imageDataConFiltro = imageData;
        for (let j = 0; j < canvas_invisible.height; j++) {
            for (let i = 0; i < canvas_invisible.width; i++) {
                let index = (i + canvas_invisible.width * j) * 4;
                imageDataConFiltro.data[index + 0] = 255 - imageDataConFiltro.data[index + 0];
                imageDataConFiltro.data[index + 1] = 255 - imageDataConFiltro.data[index + 1];
                imageDataConFiltro.data[index + 2] = 255 - imageDataConFiltro.data[index + 2];
            }
        }
        context_canvas_invisible.putImageData(imageDataConFiltro, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);
    }
    
    function setBrillo() {
        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        let imageDataConFiltro = imageData;
        for (let j = 0; j < canvas_invisible.height; j++) {
            for (let i = 0; i < canvas_invisible.width; i++) {
                let index = (i + canvas_invisible.width * j) * 4;
                // convertir pixel rgb a hsl
                let r = imageDataConFiltro.data[index + 0];
                let g = imageDataConFiltro.data[index + 1];
                let b = imageDataConFiltro.data[index + 2]
    
                let hsl = RGBToHSL(r,g,b);
    
                hsl.l = hsl.l+10;
    
                let rgb = HSLToRGB(hsl.h, hsl.s, hsl.l);
    
                imageDataConFiltro.data[index + 0] = rgb.r;
                imageDataConFiltro.data[index + 1] = rgb.g;
                imageDataConFiltro.data[index + 2] = rgb.b;
            }
        }
        context_canvas_invisible.putImageData(imageDataConFiltro, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);    
    }
    
    function setGrayscale() {
        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        let imageDataConFiltro = imageData;
        for (let j = 0; j < canvas_invisible.height; j++) {
            for (let i = 0; i < canvas_invisible.width; i++) {
                let index = (i + canvas_invisible.width * j) * 4;
                var grayscale = imageDataConFiltro.data[index + 0] * .3 + imageDataConFiltro.data[index + 1] * .59 + imageDataConFiltro.data[index + 2] * .11;
                imageDataConFiltro.data[index + 0] = grayscale;
                imageDataConFiltro.data[index + 1] = grayscale;
                imageDataConFiltro.data[index + 2] = grayscale;
            }
        }
        context_canvas_invisible.putImageData(imageDataConFiltro, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);
    }
    
    function setSepia() {
        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        let imageDataConFiltro = imageData;
        for (let j = 0; j < canvas_invisible.height; j++) {
            for (let i = 0; i < canvas_invisible.width; i++) {
                let index = (i + canvas_invisible.width * j) * 4;
                let red = imageDataConFiltro.data[index + 0];
                let green = imageDataConFiltro.data[index + 1];
                let blue = imageDataConFiltro.data[index + 2];
                /*  outputRed = (inputRed * .393) + (inputGreen *.769) + (inputBlue * .189)
                    outputGreen = (inputRed * .349) + (inputGreen *.686) + (inputBlue * .168)
                    outputBlue = (inputRed * .272) + (inputGreen *.534) + (inputBlue * .131)
                */
                imageDataConFiltro.data[index + 0] = (red * .393) + (green *.769) + (blue * .189);
                imageDataConFiltro.data[index + 1] = (red * .349) + (green *.686) + (blue * .168);
                imageDataConFiltro.data[index + 2] = (red * .272) + (green *.534) + (blue * .131);
            }
        }
        context_canvas_invisible.putImageData(imageDataConFiltro, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);
    }

    let btn_sobel = document.querySelector(".js-filtro-sobel");

    btn_sobel.addEventListener("click", function() { setSobel(canvas, canvas_invisible) });
    
    
    function setSobel(canvas, canvas_invisible) {
        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        var sobelData = Sobel(imageData);
        
        var sobelImageData = sobelData.toImageData();
        context_canvas_invisible.putImageData(sobelImageData, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);
          
    }

}

