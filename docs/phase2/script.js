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

    if (stageMessage) {
        stageMessage.remove();
    }

    reactionStage.appendChild(reaction);

    const startX = Math.random() * Math.max(0, reactionStage.clientWidth - 45);
    const drift = Math.round(Math.random() * 120 - 60);
    const height = reactionStage.clientHeight;

    gsap.fromTo(reaction,
        { x: startX, y: 0, scale: 1, opacity: 1 },
        {
            x: startX + drift,
            y: -height,
            scale: 1.25,
            opacity: 0,
            duration: 3,
            ease: "power1.out",
            onComplete: function() {
                reaction.remove();
            }
        }
    );
}

sendButton.addEventListener("click", sendReaction);
