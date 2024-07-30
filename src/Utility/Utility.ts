interface IPropsGenerateDarkLightRandomColor {
    colorMode: "dark" | "light";
}


const GenerateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color;

    do {
        // Generate a random hex color code
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (isBlackOrWhite(color));

    return color;
};

const isBlackOrWhite = (color: any) => {
    // Check if the color is close to black or white
    const threshold = 128;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return r + g + b < threshold * 3;
};


const GenerateGUID = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}


// Start - Generate background color based on light and dark of text and icon
const GenerateBackgroundColorBasedOnTextColor = (props: IPropsGenerateDarkLightRandomColor) => {
    // Generate a suitable background color based on the text color
    const backgroundColor = determineBackgroundColor(props.colorMode);

    // Convert the background color to hex format
    const backgroundColorHex = rgbToHex(backgroundColor.r, backgroundColor.g, backgroundColor.b);
    return backgroundColorHex;
}

const determineBackgroundColor = (colorMode: string) => {
    let backgroundColor;
    let luminance;

    if (colorMode == 'light') {
        // Ensure background is dark enough for white text
        do {
            backgroundColor = generateRandomColor();
            luminance = getLuminance(backgroundColor.r, backgroundColor.g, backgroundColor.b);
        } while (luminance > 180); // Adjust the threshold as needed
    } else if (colorMode === 'dark') {
        // Ensure background is light enough for black text
        do {
            backgroundColor = generateRandomColor();
            luminance = getLuminance(backgroundColor.r, backgroundColor.g, backgroundColor.b);
        } while (luminance < 140); // Adjust the threshold as needed
    } else {
        throw new Error("Invalid text color. Choose 'black' or 'white'.");
    }

    return backgroundColor;
}

const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

const getLuminance = (r: number, g: number, b: number) => {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const rgbToHex = (r: any, g: any, b: any) => {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// End - Generate background color based on light and dark of text and icon




// For sharepoint page utility
const checkWhichSectionUseThisComp = (elementId: string) => {
    // Get the element with id 'quickLinkContainer'
    let currentElement = document.getElementById(elementId);

    // Define an array of class names to check for
    let classesToCheck = ['CanvasSection-xl4', 'CanvasSection-xl6', 'CanvasSection-xl8', 'CanvasSection-xl12'];

    // Initialize a variable to store the found class
    let foundClass = null;

    // Initialize a variable to track if it's a full-width section
    let isFullWidth = false;

    // Loop until we reach the desired parent or the top of the document
    while (currentElement && !currentElement.classList.contains('CanvasZone')) {
        // Check if the current element has any of the classes from the array
        for (var i = 0; i < classesToCheck.length; i++) {
            if (currentElement.classList.contains(classesToCheck[i])) {
                foundClass = classesToCheck[i];
                break;
            }
        }

        // Move up to the parent element
        currentElement = currentElement.parentElement;
    }

    // Check if we found any of the desired classes
    if (foundClass !== null && foundClass === 'CanvasSection-xl12') {
        isFullWidth = currentElement.classList.contains('CanvasZone--fullWidth') ? true : false;
    }

    return {
        isFullWidthSectionUse: isFullWidth,
        sectionColumnDetail: foundClass == null ? "" : foundClass.split('-')[1],
        isAppPage: foundClass == null ? true : false
    }
}




export { GenerateRandomColor, GenerateGUID, checkWhichSectionUseThisComp, GenerateBackgroundColorBasedOnTextColor };