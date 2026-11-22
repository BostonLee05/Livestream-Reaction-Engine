// Find the HTML elements that JavaScript needs to control.
const reactionStage = document.getElementById("reactionStage");
const sendButton = document.getElementById("sendButton");
const reactionButtons = document.querySelectorAll(".reaction-choice");
const stageMessage = document.getElementById("stageMessage");

// This stores the emoji the user has selected.
// Heart is selected when the page first opens.
let selectedReaction = "❤️";

// Step 1: Let the user choose one of the four reactions.
reactionButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        // Read the emoji from this button's data-emoji attribute.
        selectedReaction = button.dataset.emoji;

        // Remove the selected style from all four buttons.
        reactionButtons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
            otherButton.setAttribute("aria-pressed", "false");
        });

        // Highlight the button that was clicked.
        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");
    });
});

// Step 2: Create and display one floating reaction.
function sendReaction() {

    // Create a new HTML element. It starts as an empty span.
    const reaction = document.createElement("span");

    // Put the selected emoji inside the new element.
    reaction.textContent = selectedReaction;

    // Add the CSS class that starts the animation.
    reaction.classList.add("floating-reaction");

    // Choose a random horizontal starting position.
    // Keep the emoji inside the reaction stage.
    const maxX = Math.max(0, reactionStage.clientWidth - 45);
    const startX = Math.random() * maxX;

    // Choose a random sideways movement between -60px and 60px.
    const drift = Math.round(Math.random() * 120 - 60);

    // Give the CSS animation the two random values.
    reaction.style.setProperty("--start-x", startX + "px");
    reaction.style.setProperty("--drift", drift + "px");

    // Hide the welcome message after the first reaction.
    if (stageMessage) {
        stageMessage.remove();
    }

    // Put the new reaction into the reaction stage.
    reactionStage.appendChild(reaction);

    // When the 3-second animation finishes, remove the element.
    // This prevents old reactions from staying in the HTML page.
    reaction.addEventListener("animationend", function() {
        reaction.remove();
    });
}

// Step 3: Run sendReaction() whenever Send Reaction is clicked.
sendButton.addEventListener("click", sendReaction);
