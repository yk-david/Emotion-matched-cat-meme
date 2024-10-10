import { catsData } from "./data.js";

// DOM
const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

// EVENT
// Detecting radios change and highlight
emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

// EH FUNCTION
function getEmotionsArray(cats) {
    const emotionsArray = [];

    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                // This checks out any duplicate
                emotionsArray.push(emotion);
            }
        }
    }

    return emotionsArray; // It returns only unique emotions
}

function renderEmotionsRadios(cats) {
    let radioItems = "";
    const emotions = getEmotionsArray(cats);

    for (let emotion of emotions) {
        radioItems += `
            <div class='radio'>
                <label for='${emotion}'>${emotion}</label>
                <input
                    type='radio'
                    id='${emotion}'
                    value='${emotion}'
                    name='emotions'
                >
            </div>
        `;
    }
    emotionRadios.innerHTML = radioItems;
}

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio"); // At this stage, you see radio inputs rendered

    // 1. Remove style (if any)
    for (let radio of radios) {
        radio.classList.remove("highlight");
    }
    // 2. Add style (but to parent El of selected El)
    document
        .getElementById(e.target.id)
        .parentElement.classList.add("highlight");
}

function renderCat() {
    const catObject = getSingleCatObject();

    memeModalInner.innerHTML = `
        <img
        class='cat-img'
        src='./images/${catObject.image}'
        alt='${catObject.alt}'
        >
    `;

    memeModal.style.display = "flex";
}

function getSingleCatObject() {
    /* 
    If there is a single matched cat, 
        - render it, 
    but if there are many, 
        - choose randomly one to be rendered 
        */ 
    const catsArray = getMatchingCatsArray();

    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randIndex];
    }
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        const isGif = gifsOnlyOption.checked;

        const matchingCatsArray = catsData.filter(function(cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }
        })

        return matchingCatsArray;
    }
}

function closeModal() {
    memeModal.style.display = "none";
}

// RENDER UNIQUE EMOTION FROM data.js
renderEmotionsRadios(catsData);
