const encrypt = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
}

let firstTime = true;


function encryptText() {
    let inputText = getInputText();

    if (!validateField(inputText)) {
        return;
    }

    buildWord(inputText);
    if (firstTime) {
        changeTextToElement("#messagesTitle", "¡¡Copia el mensaje haciendo click sobre él!!");
        setAttrToElement("#emptyInbox", "hidden", true);
        setAttrCssToElement(".panel-right-item", "justify-content", "start");
        firstTime = false;
    }

    setAttrCssToElement("#newWord", "background-color", "#0A3871");
    setAttrCssToElement("#newWord", "color", "white");
}

function setAttrToElement(selector, attr, value) {
    const element = document.querySelector(selector);
    element.setAttribute(attr, value);
}

function setAttrCssToElement(selector, attr, value) {
    const element = document.querySelector(selector);
    element.style[attr] = value;
}

function getInputText() {
    return document.querySelector('[name="inputText"]').value;
}

function validateField(inputText) {
    const regex = /^[a-z\s]+$/;

    return regex.test(inputText) && inputText.trim().length > 0;

}

function buildWord(inputText) {
    let newWord = "";

    for (const letter of inputText) {
        newWord += checkCharacter(letter);
    }

    changeTextToElement("#newWord", newWord);
}

function checkCharacter(letter) {

    if (letter in encrypt) {
        return encrypt[letter];
    } else {
        return letter;
    }
}

function changeTextToElement(element, text) {
    document.querySelector(element).textContent = text;
}

function desEncryptText() {
    let encryptedText = getInputText();
    let desEncryptedText = "";
    let i = 0;

    if (!validateField(encryptedText)) {
        return;
    }

    while (i < encryptedText.length) {
        let foundedKey = false;

        for (const [key, value] of Object.entries(encrypt)) {
            if (encryptedText.startsWith(value, i)) {
                desEncryptedText += key;
                i += value.length;
                foundedKey = true;
                break;
            }
        }

        if (!foundedKey) {
            desEncryptedText += encryptedText[i];
            i++;
        }
    }

    changeTextToElement("#newWord", desEncryptedText);
    setAttrCssToElement("#newWord", "background-color", "#D8DFE8");
    setAttrCssToElement("#newWord", "color", "black");

}



document.addEventListener('DOMContentLoaded', () => {

    const textarea = document.querySelector('textarea.auto-resize');
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });

    textarea.addEventListener('focus', () => textarea.value = "");

    const newWord = document.querySelector("#newWord");
    newWord.addEventListener('click', () => {
        let textToCopy = newWord.textContent;
        document.querySelector('[name="inputText"]').value = textToCopy;

        navigator.clipboard.writeText(textToCopy).then().catch(err => {
            console.error(err);
        });
    });

});