window.onload = () => {
   const btn = document.getElementById('btn');
   const boxColorContainer = document.getElementById('box-color-container');
   const rgbaColor = document.getElementById('color-rgba');
   const hexColor = document.getElementById('color-hex');
   const rgbaRandomColor = document.getElementById('rgba-random-color');
   const hexRandomColor = document.getElementById('hex-random-color');
   const color = document.getElementById('color');
   const copy = document.getElementById('copy');
   const clear = document.getElementById('clear');
   const contrastBtn = document.getElementById('contrast-btn');
   const noteEditor = document.getElementById('note-editor');
   const textContrastContainer = document.querySelector('#contrast-color-box-container h2');
   const contrastContainer = document.getElementById('contrast-color-box-container');
   var slider = document.getElementById('opacitySlider');

   // copy.addEventListener('click', () => {
   //     const colorCode = color.value;
   //     if (colorCode === "rgba") {
   //         navigator.clipboard.writeText(rgbaColor.innerHTML);
   //         noteEditor.innerHTML+= "<br>"+rgbaColor.innerHTML;
   //     } else {
   //         navigator.clipboard.writeText(hexColor.innerHTML);
   //         noteEditor.innerHTML+= "<br>"+hexColor.innerHTML;
   //     }
   //     copy.innerHTML = "Copied";
   //     setTimeout(() => {
   //         copy.innerHTML = "Copy";
   //     }, 2000)
   // })

   // clear.addEventListener('click', () => {
   //     navigator.clipboard.writeText(color.innerHTML);
   //     copy.innerHTML = "Cleared";
   //     setTimeout(() => {
   //         copy.innerHTML = "Copy";
   //     }, 2000)
   // })

   btn.addEventListener('click', () => {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      rgbaRandomColor.innerHTML = `rgb(${r},${g},${b})`;
      hexRandomColor.innerHTML = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

      boxColorContainer.style.backgroundColor = `rgb(${r},${g},${b})`;

      console.log(r, g, b);
   });

   contrastBtn.addEventListener('click', () => {
      const textColor = document.getElementById('text-color').value;
      const bgColor = document.getElementById('bg-color').value;

      const contrastRatio = getContrastRatio(textColor, bgColor);

      const resultElement = document.getElementById('result-container');
      resultElement.style.display = 'block';

      console.log('bgColor', bgColor);
      console.log('txt', textColor);

      contrastContainer.style.backgroundColor = `${bgColor}`;
      textContrastContainer.style.color = `${textColor}`;

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

   // Function to convert opacity to hex
   function hexWithOpacity(hex, opacity) {
      let hexTemp = hex;
      if (hex.length > 7) {
         hexTemp = hex.slice(0, 7);
      }
      // Convert opacity from [0, 1] to [00, FF]
      var alpha = Math.round(opacity * 255);
      // Append alpha value to hex color
      var alphaHex = (alpha + 0x10000).toString(16).slice(-2);
      return hexTemp + alphaHex;
   }

   // Function to convert opacity to RGBA
   function rgbaWithOpacity(rgb, opacity) {
      // Check if the input is already in rgba format
      var rgbaMatch = rgb.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);

      if (rgbaMatch) {
         // If it's already in rgba format, update the opacity
         var updatedOpacity = Math.min(Math.max(opacity, 0), 1); // Ensure opacity is between 0 and 1
         return 'rgba(' + rgbaMatch[1] + ',' + rgbaMatch[2] + ',' + rgbaMatch[3] + ',' + updatedOpacity + ')';
      } else {
         // Extract RGB values from the string
         var rgbValues = rgb.match(/\d+/g);
         // Construct RGBA string with opacity
         return 'rgba(' + rgbValues.join(',') + ',' + opacity + ')';
      }
   }

   // Function to update the opacity of the target element
   function updateOpacity() {
      var opacityValue = slider.value / 100; // Convert slider value to opacity (0-1)
      const hexOpacityColor = hexWithOpacity(hexRandomColor.innerHTML, opacityValue);
      const rgbaOpacityColor = rgbaWithOpacity(rgbaRandomColor.innerHTML, opacityValue);
      boxColorContainer.style.backgroundColor = hexOpacityColor; // Apply opacityValue;
      hexRandomColor.innerHTML = hexOpacityColor;
      rgbaRandomColor.innerHTML = rgbaOpacityColor;
   }

   // Add event listener to the slider
   slider.addEventListener('input', updateOpacity);
};
