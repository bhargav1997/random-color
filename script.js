window.onload = () => {
    
    const btn = document.getElementById('btn');
    const rgbaColor = document.getElementById('color-rgba');
    const hexColor = document.getElementById('color-hex');
    const color = document.getElementById('color');
    const copy = document.getElementById('copy');
    const clear = document.getElementById('clear');
    const contrastBtn = document.getElementById('contrast-btn');

    copy.addEventListener('click', () => {
        const colorCode = color.value;
        if (colorCode === "rgba") {
            navigator.clipboard.writeText(rgbaColor.innerHTML);
        } else {
            navigator.clipboard.writeText(hexColor.innerHTML);
        }   
        copy.innerHTML = "Copied";
        setTimeout(() => {
            copy.innerHTML = "Copy";
        }, 2000)
    })

    clear.addEventListener('click', () => { 
        navigator.clipboard.writeText(color.innerHTML);
        copy.innerHTML = "Cleared";
        setTimeout(() => {
            copy.innerHTML = "Copy";
        }, 2000)
    })
    

    btn.addEventListener('click', () => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        rgbaColor.innerHTML = `rgb(${r},${g},${b})`;
        hexColor.innerHTML = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

        // body
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

        console.log(r,g,b)
    })

    contrastBtn.addEventListener('click',  () =>  {
        const textColor = document.getElementById('text-color').value;
        const bgColor = document.getElementById('bg-color').value;
      
        const contrastRatio = getContrastRatio(textColor, bgColor);
        
        const resultElement = document.getElementById('result-container');
        if (contrastRatio >= 4.5) {
          resultElement.textContent = 'Sufficient contrast!';
          resultElement.style.color = 'green';
        } else {
          resultElement.textContent = 'Insufficient contrast! Increase text/background contrast.';
          resultElement.style.color = 'red';
        }
      });
      
      function getContrastRatio(textColor, bgColor) {
        const lum1 = getRelativeLuminance(textColor);
        const lum2 = getRelativeLuminance(bgColor);
        const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
        return contrastRatio.toFixed(2);
      }
      
      function getRelativeLuminance(color) {
        const rgb = parseColor(color);
        const [r, g, b] = rgb.map((val) => {
          val /= 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
      
      function parseColor(color) {
        const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        const match = hexRegex.exec(color);
        if (match) {
          return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
        }
        return null;
      }
      
}