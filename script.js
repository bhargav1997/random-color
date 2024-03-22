window.onload = () => {
    
    const btn = document.getElementById('btn');
    const color = document.getElementById('color');
    const hex = document.getElementById('hex');
    const copy = document.getElementById('copy');
    const clear = document.getElementById('clear');

    copy.addEventListener('click', () => {
        
        navigator.clipboard.writeText(color.innerHTML);
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
        color.innerHTML = `rgb(${r},${g},${b})`;
        hex.innerHTML = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

        // body
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

        console.log(r,g,b)
    })
}