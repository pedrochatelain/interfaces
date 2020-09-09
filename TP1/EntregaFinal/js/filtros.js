
function setNegativo(canvas, elasticCanvas) {
    let ctxElasticCanvas = elasticCanvas.getContext("2d");
    let imageData = ctxElasticCanvas.getImageData(0, 0, elasticCanvas.width, elasticCanvas.height);
    let imageDataConFiltro = imageData;
    for (let j = 0; j < elasticCanvas.height; j++) {
        for (let i = 0; i < elasticCanvas.width; i++) {
            let index = (i + elasticCanvas.width * j) * 4;
            imageDataConFiltro.data[index + 0] = 255 - imageDataConFiltro.data[index + 0];
            imageDataConFiltro.data[index + 1] = 255 - imageDataConFiltro.data[index + 1];
            imageDataConFiltro.data[index + 2] = 255 - imageDataConFiltro.data[index + 2];
        }
    }
    ctxElasticCanvas.putImageData(imageDataConFiltro, 0, 0);
    isImageBig(elasticCanvas, canvas) ? drawScaledImage(elasticCanvas, canvas) : drawImage(elasticCanvas, canvas);
}

function setBrillo(canvas, elasticCanvas) {
    let ctxElasticCanvas = elasticCanvas.getContext("2d");
    let imageData = ctxElasticCanvas.getImageData(0, 0, elasticCanvas.width, elasticCanvas.height);
    let imageDataConFiltro = imageData;
    for (let j = 0; j < elasticCanvas.height; j++) {
        for (let i = 0; i < elasticCanvas.width; i++) {
            let index = (i + elasticCanvas.width * j) * 4;
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
    ctxElasticCanvas.putImageData(imageDataConFiltro, 0, 0);
    isImageBig(elasticCanvas, canvas) ? drawScaledImage(elasticCanvas, canvas) : drawImage(elasticCanvas, canvas);    
}

function setGrayscale(canvas, elasticCanvas) {
    let ctxElasticCanvas = elasticCanvas.getContext("2d");
    let imageData = ctxElasticCanvas.getImageData(0, 0, elasticCanvas.width, elasticCanvas.height);
    let imageDataConFiltro = imageData;
    for (let j = 0; j < elasticCanvas.height; j++) {
        for (let i = 0; i < elasticCanvas.width; i++) {
            let index = (i + elasticCanvas.width * j) * 4;
            var grayscale = imageDataConFiltro.data[index + 0] * .3 + imageDataConFiltro.data[index + 1] * .59 + imageDataConFiltro.data[index + 2] * .11;
            imageDataConFiltro.data[index + 0] = grayscale;
            imageDataConFiltro.data[index + 1] = grayscale;
            imageDataConFiltro.data[index + 2] = grayscale;
        }
    }
    ctxElasticCanvas.putImageData(imageDataConFiltro, 0, 0);
    isImageBig(elasticCanvas, canvas) ? drawScaledImage(elasticCanvas, canvas) : drawImage(elasticCanvas, canvas);
}

function setSepia(canvas, elasticCanvas) {
    let ctxElasticCanvas = elasticCanvas.getContext("2d");
    let imageData = ctxElasticCanvas.getImageData(0, 0, elasticCanvas.width, elasticCanvas.height);
    let imageDataConFiltro = imageData;
    for (let j = 0; j < elasticCanvas.height; j++) {
        for (let i = 0; i < elasticCanvas.width; i++) {
            let index = (i + elasticCanvas.width * j) * 4;
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
    ctxElasticCanvas.putImageData(imageDataConFiltro, 0, 0);
    isImageBig(elasticCanvas, canvas) ? drawScaledImage(elasticCanvas, canvas) : drawImage(elasticCanvas, canvas);
}