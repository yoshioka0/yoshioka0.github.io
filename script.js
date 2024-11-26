// Function to run typewriter effect
function typeWriter(greetingText) {
    const greetingElement = document.getElementById("greeting");
    const cursorElement = document.querySelector(".typing-cursor");
    let index = 0;

    // Reset the greeting text before starting the animation
    greetingElement.innerHTML = ''; 

    // Type the greeting text
    function typing() {
        if (index < greetingText.length) {
            greetingElement.innerHTML = greetingText.substring(0, index + 1) + cursorElement.outerHTML;
            index++;
            setTimeout(typing, 100); // Adjust typing speed here
        } else {
            // Ensure the cursor continues blinking after typing is done
            greetingElement.innerHTML = greetingText + cursorElement.outerHTML;
        }
    }

    typing();
}

// JavaScript to handle the popup
const popupOverlay = document.getElementById("popupOverlay");
const closePopupButton = document.getElementById("closePopupButton");

// Show the popup
function showPopup() {
    popupOverlay.style.display = "block";
}

// Close the popup when the close button is clicked
closePopupButton.addEventListener("click", () => {
    popupOverlay.style.display = "none";
});

// Close the popup if the overlay is clicked
popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
        popupOverlay.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const languageMenu = document.getElementById("languageMenu");
    const languageOptions = document.querySelectorAll(".language-option");
    const selectedLanguageText = document.getElementById("selectedLanguageText"); // Span for language text

    // Retrieve the selected language from localStorage, or default to "en"
    let currentLanguage = localStorage.getItem("language") || "en"; // Default language is English if none is stored

    // Function to load translations dynamically
    async function loadTranslations(lang) {
        try {
            const response = await fetch("translations.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const translations = await response.json();

            // Update text content dynamically based on selected language
            document.getElementById("heading").textContent = translations[lang].heading;
            document.getElementById("description").textContent = translations[lang].description;
            document.getElementById("project1_title").textContent = translations[lang].project1_title;
            document.getElementById("project1_description").textContent = translations[lang].project1_description;
            document.getElementById("project2_title").textContent = translations[lang].project2_title;
            document.getElementById("project2_description").textContent = translations[lang].project2_description;
            document.getElementById("coming_soon_title").textContent = translations[lang].coming_soon_title;
            document.getElementById("coming_soon_description").textContent = translations[lang].coming_soon_description;
            document.getElementById("popup_title").textContent = translations[lang].popup_title;
            document.getElementById("popup_message").textContent = translations[lang].popup_message;

            // Load the greeting for the selected language and apply typewriter effect
            const greetingText = translations[lang].greeting;
            typeWriter(greetingText); // Call typewriter animation after greeting is updated
            
            // Update the selected language text in the button
            updateLanguageText(lang);

        } catch (error) {
            console.error("Error loading translations:", error);
        }
    }

    // Function to update the text of the selected language in the button
    function updateLanguageText(lang) {
        const languageNames = {
            en: "English",
            ja: "Japanese",
            hi: "Hindi",
            kn: "Kannada"
        };
        selectedLanguageText.textContent = languageNames[lang] || "English"; // Default to English if no match
    }

    // Add click event listeners for each language option
    languageOptions.forEach(option => {
        option.addEventListener("click", () => {
            const selectedLanguage = option.getAttribute("data-lang");
            if (currentLanguage !== selectedLanguage) {
                currentLanguage = selectedLanguage;
                loadTranslations(currentLanguage);

                // Store the selected language in localStorage
                localStorage.setItem("language", currentLanguage);
            }
        });
    });

    // Load the language on page load from localStorage
    loadTranslations(currentLanguage);
});