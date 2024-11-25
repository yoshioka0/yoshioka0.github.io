window.onload = function() {
    const greetingElement = document.getElementById("greeting");
    const cursorElement = document.querySelector(".typing-cursor");
    const greetingText = "Hello! I'm Yoshioka, welcome to my museum!";
    let index = 0;

    function typeWriter() {
        if (index < greetingText.length) {
            greetingElement.innerHTML =
                greetingText.substring(0, index + 1) + cursorElement.outerHTML;
            index++;
            setTimeout(typeWriter, 100); // Adjust the typing speed here
        } else {
            // Ensure the cursor continues blinking after typing is done
            greetingElement.innerHTML = greetingText + cursorElement.outerHTML;
        }
    }

    typeWriter();
};

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
    let currentLanguage = "en"; // Default language is English

    // Function to load translations dynamically
    async function loadTranslations(lang) {
        try {
            const response = await fetch("translations.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const translations = await response.json();

            // Update text content dynamically based on selected language
            document.getElementById("greeting").textContent = translations[lang].greeting;
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
        } catch (error) {
            console.error("Error loading translations:", error);
        }
    }

    // Add click event listeners for each language option
    languageOptions.forEach(option => {
        option.addEventListener("click", () => {
            const selectedLanguage = option.getAttribute("data-lang");
            if (currentLanguage !== selectedLanguage) {
                currentLanguage = selectedLanguage;
                loadTranslations(currentLanguage);
            }
        });
    });

    // Load default language on page load
    loadTranslations(currentLanguage);
});        