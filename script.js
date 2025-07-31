// Ensure the DOM is fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', () => {
    // Get the envelope wrapper element.
    const envelopeWrapper = document.getElementById('envelope-wrapper');

    // Get references to the image pop-up elements
    const imagePopup = document.getElementById('image-popup');
    const closePopupButton = document.getElementById('close-popup');
    const popupImage = document.getElementById('popup-image');
    const heartSprinkleContainer = document.getElementById('heart-sprinkle-container');

    // Get references to the songs pop-up elements
    const songsPopup = document.getElementById('songs-popup');
    const closeSongsPopupButton = document.getElementById('close-songs-popup');
    const centralSongImage = document.getElementById('central-song-image');
    const songThumbnails = document.querySelectorAll('.song-thumbnail'); // Get all song thumbnail images

    // Get references to the reasons pop-up elements
    const reasonsPopup = document.getElementById('reasons-popup');
    const closeReasonsPopupButton = document.getElementById('close-reasons-popup');
    const reasonsDisplay = document.getElementById('reasons-display');

    // Get references to the clickable panels
    const letterPanel = document.getElementById('letter-panel');
    const songsPanel = document.getElementById('songs-panel'); // Reference to the Songs for U panel
    const reasonsPanel = document.getElementById('reasons-panel'); // Reference to the 100 Reasons panel

    // Variable to hold the currently playing audio
    let currentAudio = null;

    // The list of 100 reasons
    const reasons = [
        "You make me feel like the luckiest person in the world.",
        "Gwapa ka hehe",
        "Your smile lights up my darkest days.",
        "You make ordinary moments feel extraordinary.",
        "I love the way you laugh—it’s my favorite sound.",
        "You freaky hehe",
        "You challenge me to be better every day.",
        "You’re kind to everyone, even when they don’t deserve it.",
        "You make love feel effortless.",
        "You bring peace to my chaos.",
        "You’re incredibly strong, even when you don’t realize it.",
        "I love you hehe",
        "You know exactly how to comfort me.",
        "You’re beautiful inside and out.",
        "You care so deeply—it shows in everything you do.",
        "You inspire me with your passion.",
        "I love how your eyes shine when you talk about what you love.",
        "You’ve taught me the meaning of real love.",
        "You make me laugh when I need it most.",
        "You love me at my worst.",
        "You’re honest, even when it’s hard.",
        "You’re incredibly thoughtful.",
        "You notice the little things that no one else sees.",
        "You’re creative and full of amazing ideas.",
        "You’re my safe place.",
        "You listen—not just with your ears, but with your heart.",
        "You make me feel seen.",
        "You’ve helped me heal in ways I didn’t know I needed.",
        "You love me in a way I never thought was possible.",
        "You believe in me.",
        "You’re patient with me.",
        "You’re always willing to grow—with me and for yourself.",
        "You make my world feel bigger, brighter, better.",
        "You’re the reason I smile for no reason.",
        "You have the softest heart.",
        "You’re playful and fun, and you remind me not to take life too seriously.",
        "You’re wise beyond your years.",
        "You’ve changed the way I see love.",
        "You show up—really show up—for the people you love.",
        "You make me feel wanted.",
        "You make me feel needed.",
        "You make me feel whole.",
        "You’re stunning, effortlessly.",
        "You forgive me when I mess up.",
        "You’re the most beautiful part of my life.",
        "You never make me feel like I’m too much.",
        "You know how to calm me down when I’m overwhelmed.",
        "You make me want to slow dance in the kitchen.",
        "You’re my best friend.",
        "You make the ordinary feel magical.",
        "You’re full of surprises in the best way.",
        "You give the best hugs in the world.",
        "You’re home to me.",
        "You love deeply and fully.",
        "You’re never afraid to be yourself.",
        "You’ve shown me a new kind of happiness.",
        "You’re my sunshine when skies are gray.",
        "You’re the reason I believe in love.",
        "You make every day better just by being in it.",
        "You hold me together when I’m falling apart.",
        "You’re everything I didn’t know I needed.",
        "You make forever seem too short.",
        "You understand my silence.",
        "You’re the reason I look forward to tomorrow.",
        "You’re thoughtful in ways I never expect.",
        "You’re always growing, and that inspires me.",
        "You make me feel chosen—every single day.",
        "You turn my dreams into plans.",
        "You’re the calm to my storm.",
        "You’re strong even when you feel fragile.",
        "You’re resilient and brave.",
        "You make vulnerability feel safe.",
        "You’re my favorite everything.",
        "You’re my person—my heart’s home.",
        "You love with your whole heart.",
        "You’re not perfect, and I love every imperfect piece of you.",
        "You give me purpose.",
        "You know me better than I know myself.",
        "You accept me as I am.",
        "You make life feel lighter.",
        "You make waiting worth it.",
        "You fill my life with color.",
        "You’re a dream I never want to wake up from.",
        "You’ve made me a better version of myself.",
        "You’re the best part of my every day.",
        "You’re the first person I want to tell everything to.",
        "You make me feel alive.",
        "You’re a miracle in my life.",
        "You’re the peace I crave.",
        "You give love a meaning I never understood before you.",
        "You make all the love songs make sense.",
        "You’re my muse, my motivation.",
        "You’re unforgettable.",
        "You’ve become a part of me.",
        "You’re the reason I believe in soulmates.",
        "You’re rare, one of a kind.",
        "You’re the best decision I’ve ever made.",
        "You’re my reason for everything.",
        "You are, simply and completely, everything I love.",
        "I love you… because you are you."
    ];


    // Function to open the image pop-up
    function openImagePopup(imageUrl) {
        popupImage.src = imageUrl; // Set the image source for the pop-up
        imagePopup.classList.add('active'); // Add 'active' class to make it visible
        sprinkleHearts(); // Start sprinkling hearts
    }

    // Function to close the image pop-up
    function closeImagePopup() {
        imagePopup.classList.remove('active'); // Remove 'active' class to hide it
        // Clear any existing hearts after a short delay to allow them to fade out
        setTimeout(() => {
            heartSprinkleContainer.innerHTML = '';
        }, 500); // Adjust delay if heart animation is longer
    }

    // Function to open the songs pop-up
    function openSongsPopup() {
        songsPopup.classList.add('active'); // Add 'active' class to make it visible
    }

    // Function to close the songs pop-up
    function closeSongsPopup() {
        songsPopup.classList.remove('active'); // Remove 'active' class to hide it
        // Stop any playing audio when the pop-up closes
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset to beginning
        }
    }

    // Function to play a song
    function playSong(songSrc) {
        // If a song is already playing, stop it
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(songSrc);
        currentAudio.play().catch(error => {
            console.error("Error playing audio:", error);
            // Handle cases where play() might fail (e.g., user hasn't interacted yet)
        });
    }

    // Function to open the reasons pop-up
    function openReasonsPopup() {
        reasonsPopup.classList.add('active');
        reasonsDisplay.innerHTML = '<h2 class="text-4xl font-dancing-script font-bold mb-4 text-pink-600">100 Reasons Why I Love You</h2>'; // Clear and re-add title

        let reasonIndex = 0;
        const speed = 50; // Speed of the typewriter effect in milliseconds per character
        const phraseDelay = 1500; // Pause in milliseconds before starting the next phrase

        function typeWriter() {
            if (reasonIndex < reasons.length) {
                const currentPhrase = reasons[reasonIndex];
                let charIndex = 0;
                
                // Create a single paragraph element for the current phrase
                const p = document.createElement('p');
                p.classList.add('reason-phrase');
                p.style.opacity = '1'; // Make sure the element is visible

                // Clear previous phrase, add the new paragraph
                const existingParagraphs = reasonsDisplay.querySelectorAll('.reason-phrase');
                if (existingParagraphs.length > 0) {
                    existingParagraphs.forEach(para => para.remove());
                }
                reasonsDisplay.appendChild(p);

                // Start typing the characters
                function typeChar() {
                    if (charIndex < currentPhrase.length) {
                        p.textContent += currentPhrase.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, speed);
                    } else {
                        // After typing is complete, move to the next phrase
                        reasonIndex++;
                        setTimeout(typeWriter, phraseDelay);
                    }
                }
                typeChar();
            } else {
                // All phrases have been displayed
                console.log("All reasons have been shown.");
            }
        }
        typeWriter();
    }

    // Function to close the reasons pop-up
    function closeReasonsPopup() {
        reasonsPopup.classList.remove('active');
        // Clear the reasons from the display
        setTimeout(() => {
            reasonsDisplay.innerHTML = '<h2 class="text-4xl font-dancing-script font-bold mb-4 text-pink-600">100 Reasons Why I Love You</h2>';
        }, 300); // Wait for the pop-up to fade out
    }

    // Function to sprinkle heart emojis
    function sprinkleHearts() {
        const numHearts = 20; // Number of hearts to sprinkle
        const popupRect = imagePopup.getBoundingClientRect(); // Get dimensions of the popup

        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️'; // Heart emoji

            // Random initial position around the popup
            const startX = popupRect.left + popupRect.width / 2 + (Math.random() - 0.5) * popupRect.width * 0.5;
            const startY = popupRect.top + popupRect.height / 2 + (Math.random() - 0.5) * popupRect.height * 0.5;

            // Random end position (sprinkle outwards)
            const endX = startX + (Math.random() - 0.5) * window.innerWidth * 0.6;
            const endY = startY + (Math.random() - 0.5) * window.innerHeight * 0.6;

            // Random rotation
            const startRot = Math.random() * 360;
            const endRot = startRot + (Math.random() - 0.5) * 720; // Rotate more

            // Set CSS variables for animation
            heart.style.setProperty('--x', `${startX}px`);
            heart.style.setProperty('--y', `${startY}px`);
            heart.style.setProperty('--rot', `${startRot}deg`);
            heart.style.setProperty('--x-end', `${endX}px`);
            heart.style.setProperty('--y-end', `${endY}px`);
            heart.style.setProperty('--rot-end', `${endRot}deg`);

            // Random animation delay for staggered effect
            heart.style.animationDelay = `${Math.random() * 0.5}s`;

            heartSprinkleContainer.appendChild(heart);
        }
    }


    // Event listener for the main envelope click
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeWrapper.classList.toggle('open');
        });
    } else {
        console.error('Error: #envelope-wrapper not found.');
    }

    // Event listener for the "Letter for U" panel click
    if (letterPanel) {
        letterPanel.addEventListener('click', () => {
            // IMPORTANT: Replace 'https://placehold.co/1920x1080/FFC0CB/000000?text=Your+Custom+Image'
            // with the actual path or URL to your 1920x1080px image (e.g., 'chloeletter.jpg').
            openImagePopup('chloeletter.png');
        });
    } else {
        console.error('Error: #letter-panel not found.');
    }

    // Event listener for the close button of the image pop-up
    if (closePopupButton) {
        closePopupButton.addEventListener('click', closeImagePopup);
    } else {
        console.error('Error: #close-popup not found.');
    }

    // Optional: Close image popup when clicking outside the image (on the overlay)
    if (imagePopup) {
        imagePopup.addEventListener('click', (event) => {
            if (event.target === imagePopup) {
                closeImagePopup();
            }
        });
    }

    // Event listener for the "Songs for U" panel click
    if (songsPanel) {
        songsPanel.addEventListener('click', openSongsPopup);
    } else {
        console.error('Error: #songs-panel not found.');
    }

    // Event listener for the close button of the songs pop-up
    if (closeSongsPopupButton) {
        closeSongsPopupButton.addEventListener('click', closeSongsPopup);
    } else {
        console.error('Error: #close-songs-popup not found.');
    }

    // Event listeners for each song thumbnail
    songThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const songSrc = thumbnail.dataset.songSrc; // Get the song URL from data-song-src attribute
            if (songSrc) {
                playSong(songSrc); // Reverted to playing local audio file
            } else {
                console.warn('Song URL not found for thumbnail:', thumbnail);
            }
        });
    });
    
    // Event listener for the "100 Reasons Why I Love You" panel click
    if (reasonsPanel) {
        reasonsPanel.addEventListener('click', openReasonsPopup);
    } else {
        console.error('Error: #reasons-panel not found.');
    }

    // Event listener for the close button of the reasons pop-up
    if (closeReasonsPopupButton) {
        closeReasonsPopupButton.addEventListener('click', closeReasonsPopup);
    } else {
        console.error('Error: #close-reasons-popup not found.');
    }

    // Optional: Close popups when clicking outside the content (on the overlay)
    if (songsPopup) {
        songsPopup.addEventListener('click', (event) => {
            // Check if the click occurred directly on the overlay, not on the content wrapper
            if (event.target === songsPopup) {
                closeSongsPopup();
            }
        });
    }
    if (reasonsPopup) {
        reasonsPopup.addEventListener('click', (event) => {
            // Check if the click occurred directly on the overlay, not on the content wrapper
            if (event.target === reasonsPopup) {
                closeReasonsPopup();
            }
        });
    }
});
