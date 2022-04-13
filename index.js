document.addEventListener('DOMContentLoaded', (e) => {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    let data = [];
    let pickedColor = '';

    const img = document.createElement('img');
    img.src = canvas.getAttribute('src');

    img.onload = (e) => {
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        const aspect = nw / nh;
        canvas.height = canvas.width / aspect;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = imageData.data;
        
        canvas.addEventListener('mousemove', getPixel);
        canvas.addEventListener('click', addColorInfo);  
    }

    function getPixel(e) {
        let { offsetX, offsetY } = e;
        const c = getPixelColor(canvas.width, offsetY, offsetX);
        pickedColor = `rgb(${c.red}, ${c.green}, ${c.blue})`;
        document.getElementById('pixelColor').style.backgroundColor = pickedColor;
    }

    function getPixelColor(cols, x, y) {     
        let pixel = cols * x + y;   
        let arrayPos = pixel * 4;  
        return {
            red: data[arrayPos],
            green: data[arrayPos + 1],
            blue: data[arrayPos + 2],
            alpha: data[arrayPos + 3],
        };
    }

    function addColorInfo(e) {
        let color = document.createElement('span');
        color.className = 'box';
        color.setAttribute('data-color', pickedColor);
        color.style.backgroundColor = pickedColor;
        document.querySelector('.colors').appendChild(color);
        
        // let info = document.createElement('span');
        // info.className = 'box';
        // info.textContent = `${pickedColor}, HEX code, HSL`;
        // document.querySelector('.info').appendChild(info);
    }
});