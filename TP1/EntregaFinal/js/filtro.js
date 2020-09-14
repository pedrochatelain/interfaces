function filtro(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage) {

    let boton_filtro_negativo = document.querySelector(".js-filtro-negativo");
    let boton_filtro_brillo = document.querySelector(".js-filtro-brillo");
    let boton_filtro_grayscale = document.querySelector(".js-filtro-grayscale");
    let boton_filtro_sepia = document.querySelector(".js-filtro-sepia");
    let boton_filtro_blur = document.querySelector(".js-filtro-blur");
    let boton_filtro_nitidez = document.querySelector(".js-filtro-sharpen");
    let boton_filtro_bordes = document.querySelector(".js-filtro-bordes");
    
    boton_filtro_negativo.addEventListener("click", function() { setFiltro(getNegativoPixel) });

    boton_filtro_brillo.addEventListener("click", function() { setFiltro(getBrilloPixel) });

    boton_filtro_grayscale.addEventListener("click", function() { setFiltro(getGrisesPixel) });

    boton_filtro_sepia.addEventListener("click", function() { setFiltro(getSepiaPixel) });
        
    boton_filtro_bordes.addEventListener("click", function() {
        let kernel =
        [   -1, -1, -1,
            -1,  8, -1,
            -1, -1, -1    ]

        setFiltroMatriz(kernel)
    })

    boton_filtro_blur.addEventListener("click", function() {
        let kernel = 
        [   1/9, 1/9, 1/9,
            1/9, 1/9, 1/9,
            1/9, 1/9, 1/9   ]
        
        setFiltroMatriz(kernel)
    })

    boton_filtro_nitidez.addEventListener("click", function() {
        let kernel = 
        [   0, -1,  0,
           -1,  5, -1,
            0, -1,  0   ]

        setFiltroMatriz(kernel)
    })

    // Aplica un tono negativo a un determinado pixel y lo devuelve modificado
    function getNegativoPixel(pixel) {

        pixel.r = 255 - pixel.r;
        pixel.g = 255 - pixel.g;
        pixel.b = 255 - pixel.b;
        return pixel;

    }

    // Aplica brillo a un determinado pixel y lo devuelve modificado
    function getBrilloPixel(pixel) {

        let hsl = RGBToHSL(pixel.r, pixel.g, pixel.b);
        hsl.l = hsl.l + 10; // aumenta luminicencia
        let rgb = HSLToRGB(hsl.h, hsl.s, hsl.l);
        return rgb;

    }

    // Aplica escala de grises a un determinado pixel y lo devuelve modificado
    function getGrisesPixel(pixel) {

        let grayscale = pixel.r * .3 + pixel.g * .59 + pixel.b * .11;
        pixel.r = grayscale;
        pixel.g = grayscale;
        pixel.b = grayscale;
        return pixel;

    }

    // Aplica un tono sepia a un determinado pixel y lo devuelve modificado
    function getSepiaPixel(pixel) {

        let red = pixel.r;
        let green = pixel.g;
        let blue = pixel.b;

        pixel.r = (red * .393) + (green *.769) + (blue * .189);
        pixel.g = (red * .349) + (green *.686) + (blue * .168);
        pixel.b = (red * .272) + (green *.534) + (blue * .131);
        return pixel;

    }

    /* Aplica un filtro a cada pixel del canvas invisible. Por parámetro
       se pasa la función que se le quiere aplicar al pixel. */
    function setFiltro(getPixelModificado) {

        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        let imageDataConFiltro = imageData;
        for (let j = 0; j < canvas_invisible.height; j++) {
            for (let i = 0; i < canvas_invisible.width; i++) {
                let index = (i + canvas_invisible.width * j) * 4;

                let red = imageDataConFiltro.data[index + 0];
                let green = imageDataConFiltro.data[index + 1];
                let blue = imageDataConFiltro.data[index + 2];

                let pixel = {
                    'r' : red,
                    'g' : green,
                    'b' : blue
                };

                let pixel_modificado = getPixelModificado(pixel)
                
                imageDataConFiltro.data[index + 0] = pixel_modificado.r;
                imageDataConFiltro.data[index + 1] = pixel_modificado.g;
                imageDataConFiltro.data[index + 2] = pixel_modificado.b;
            }
        }
        context_canvas_invisible.putImageData(imageDataConFiltro, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);

    }
    
    // Dado un kernel (matriz) aplica un filtro a la imagen 
    function setFiltroMatriz(kernel) {

        let imageData = context_canvas_invisible.getImageData(0, 0, canvas_invisible.width, canvas_invisible.height);
        let size = Math.sqrt(kernel.length);
        let half = Math.floor(size / 2);
        let width = canvas_invisible.width;
        let height = canvas_invisible.height;
        let inputData = context_canvas_invisible.getImageData(0, 0, width, height).data;
        let outputData = imageData.data;
        let pixelsAbove;
        let weight;
        let neighborY;
        let neighborX;
        let inputIndex;
        let outputIndex;
    
        for (let i = 0; i < height; ++i) {
            pixelsAbove = i * width;
            for (let j = 0; j < width; ++j) {
                r = 0;
                g = 0;
                b = 0;
    
                for (let kernelY = 0; kernelY < size; ++kernelY) {
                    for (let kernelX = 0; kernelX < size; ++kernelX) {
                        weight = kernel[kernelY * size + kernelX];
                        neighborY = Math.min(
                            height - 1,
                            Math.max(0, i + kernelY - half)
                        );
                        neighborX = Math.min(
                            width - 1,
                            Math.max(0, j + kernelX - half)
                        );
                        inputIndex = (neighborY * width + neighborX) * 4;
                        r += inputData[inputIndex] * weight;
                        g += inputData[inputIndex + 1] * weight;
                        b += inputData[inputIndex + 2] * weight;
                    }
                }
                outputIndex = (pixelsAbove + j) * 4;
                outputData[outputIndex] = r;
                outputData[outputIndex + 1] = g;
                outputData[outputIndex + 2] = b;
            }
        }
        context_canvas_invisible.putImageData(imageData, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);
        
    }


}