function filtro(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage) {

    let boton_filtro_negativo = document.querySelector(".js-filtro-negativo");
    let boton_filtro_brillo = document.querySelector(".js-filtro-brillo");
    let boton_filtro_grayscale = document.querySelector(".js-filtro-grayscale");
    let boton_filtro_sepia = document.querySelector(".js-filtro-sepia");
    let boton_filtro_blur = document.querySelector(".js-filtro-blur");
    let boton_filtro_nitidez = document.querySelector(".js-filtro-sharpen");
    let boton_filtro_bordes = document.querySelector(".js-filtro-bordes");
    
    // Filtros por pixel
   
    boton_filtro_negativo.addEventListener("click", function() { setNegativo() });
    boton_filtro_brillo.addEventListener("click", function() { setBrillo() });
    boton_filtro_grayscale.addEventListener("click", function() { setGrayscale() });
    boton_filtro_sepia.addEventListener("click", function() { setSepia() });
    
    // Filtros con matriz
    
    boton_filtro_bordes.addEventListener("click", function() {
        let kernel =
        [   -1, -1, -1,
            -1,  8, -1,
            -1, -1, -1    ]

        setKernel(kernel)
    })

    boton_filtro_blur.addEventListener("click", function() {
        let kernel = 
        [   1/9, 1/9, 1/9,
            1/9, 1/9, 1/9,
            1/9, 1/9, 1/9   ]
        
        setKernel(kernel)
    })

    boton_filtro_nitidez.addEventListener("click", function() {
        let kernel = 
        [   0, -1,  0,
           -1,  5, -1,
            0, -1,  0   ]

        setKernel(kernel)
    })

    // Funciones

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
                let grayscale = imageDataConFiltro.data[index + 0] * .3 + imageDataConFiltro.data[index + 1] * .59 + imageDataConFiltro.data[index + 2] * .11;
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
                
                imageDataConFiltro.data[index + 0] = (red * .393) + (green *.769) + (blue * .189);
                imageDataConFiltro.data[index + 1] = (red * .349) + (green *.686) + (blue * .168);
                imageDataConFiltro.data[index + 2] = (red * .272) + (green *.534) + (blue * .131);
            }
        }
        context_canvas_invisible.putImageData(imageDataConFiltro, 0, 0);
        isImageBig(canvas_invisible, canvas) ? drawScaledImage(canvas_invisible, context) : drawImage(canvas_invisible, context);
    }
        
    function setKernel(kernel) {

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

