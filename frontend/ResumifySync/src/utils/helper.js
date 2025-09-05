import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


//get lightest average color
export const getLightColorFromImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        if(!imageUrl || typeof imageUrl !== 'string') {
            return reject(new Error('Invalid image URL'));
        }

        const image = new Image();

        if (!imageUrl.startsWith('data')){
            image.crossOrigin = 'anonymous';
        }

        image.src = imageUrl;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let r = 0;
            let g = 0;
            let b = 0;
            let count = 0;

            for(let i=0; i<imageData.data.length; i+=4) {
                const red = data[i];
                const green = data[i+1];
                const blue = data[i+2];
                const brightness = (red + green + blue) / 3;
                
                if(brightness >180) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }
            if (count === 0){
                resolve('#ffffff');
            }else{
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
    
                resolve(`rgb(${r}, ${g}, ${b})`);
            }
        };
        image.onerror = (e) =>{
            console.log('Failed to load image:', e);
            reject(new Error('Failed to load image or is blocked by CORS.'));
        }
    });
};


//formate year months  Eg: Mar 2025
export function formatYearMonth(yearMonth){
    return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}