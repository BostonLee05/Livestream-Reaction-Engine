const reactionStage = document.getElementById("reactionStage");
const sendButton = document.getElementById("sendButton");
const reactionButtons = document.querySelectorAll(".reaction-choice");
const stageMessage = document.getElementById("stageMessage");

let selectedReaction = "❤️";

reactionButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedReaction = button.dataset.emoji;

        reactionButtons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
            otherButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");
    });
});

function sendReaction() {
    const reaction = document.createElement("span");
    reaction.textContent = selectedReaction;
    reaction.classList.add("floating-reaction");

    const maxX = Math.max(0, reactionStage.clientWidth - 45);
    const startX = Math.random() * maxX;
    const drift = Math.round(Math.random() * 120 - 60);

    reaction.style.setProperty("--start-x", startX + "px");
    reaction.style.setProperty("--drift", drift + "px");

    if (stageMessage) {
        stageMessage.remove();
    }

    reactionStage.appendChild(reaction);

    reaction.addEventListener("animationend", function() {
        reaction.remove();
    });
}

sendButton.addEventListener("click", sendReaction);
