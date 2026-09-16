const hats = {
  white: {
    number: "01 / 06", name: "White Hat", tagline: "Facts & information", color: "#ece9df",
    description: "Focus only on the information available. Stay neutral, set opinions aside, and find what is known, unknown, or still needs to be verified.",
    prompts: ["What do we know for certain?", "What information is missing?", "Where can we find reliable evidence?"],
    best: "you need a shared, objective starting point."
  },
  red: {
    number: "02 / 06", name: "Red Hat", tagline: "Feelings & intuition", color: "#ce3e34",
    description: "Make room for instinct, emotion, and first impressions—without needing to explain or justify them. Surface the human response honestly.",
    prompts: ["What is my gut reaction?", "How might people feel about this?", "What emotion are we not saying aloud?"],
    best: "the emotional temperature of a decision matters."
  },
  black: {
    number: "03 / 06", name: "Black Hat", tagline: "Risks & caution", color: "#292929",
    description: "Look critically for risks, weak spots, and unintended consequences. Be careful and logical—not negative for the sake of it.",
    prompts: ["What could go wrong?", "Which assumptions may not hold?", "What must we protect against?"],
    best: "an idea needs stress-testing before you commit."
  },
  yellow: {
    number: "04 / 06", name: "Yellow Hat", tagline: "Value & optimism", color: "#edbd2e",
    description: "Search deliberately for value, benefits, and reasons an idea can work. Optimism here is grounded in logic, not wishful thinking.",
    prompts: ["What value could this create?", "Why might this work?", "What is the best possible outcome?"],
    best: "the opportunity or upside is being overlooked."
  },
  green: {
    number: "05 / 06", name: "Green Hat", tagline: "Ideas & creativity", color: "#368967",
    description: "Generate possibilities without judging them too early. Challenge the obvious answer, make unusual connections, and invite alternatives.",
    prompts: ["What else could we try?", "How would we solve this with no constraints?", "Can we combine two existing ideas?"],
    best: "the group is stuck or needs fresh alternatives."
  },
  blue: {
    number: "06 / 06", name: "Blue Hat", tagline: "Process & control", color: "#367cae",
    description: "Manage the thinking process itself. Define the goal, choose which hat is needed next, summarize what emerged, and decide on the next action.",
    prompts: ["What are we trying to achieve?", "Which perspective do we need next?", "What have we learned—and what happens now?"],
    best: "you are opening, steering, or closing the conversation."
  }
};

const dialog = document.querySelector(".hat-dialog");
const closeButton = document.querySelector(".close-button");
let trigger = null;

function openHat(key) {
  const hat = hats[key];
  if (!hat) return;
  trigger = document.activeElement;
  dialog.style.setProperty("--dialog-color", hat.color);
  dialog.querySelector(".dialog-kicker").textContent = hat.number;
  dialog.querySelector("#dialog-title").textContent = hat.name;
  dialog.querySelector(".dialog-tagline").textContent = hat.tagline;
  dialog.querySelector(".dialog-description").textContent = hat.description;
  dialog.querySelector(".dialog-tip span").textContent = hat.best;
  dialog.querySelector(".prompt-list").replaceChildren(
    ...hat.prompts.map((text) => {
      const item = document.createElement("div");
      item.className = "flex items-start gap-3 rounded border border-[#e1dcd2] bg-white px-3 py-2.5 text-sm";
      const arrow = document.createElement("span");
      arrow.className = "font-bold text-[var(--dialog-color)]";
      arrow.ariaHidden = "true";
      arrow.textContent = "→";
      item.append(arrow, text);
      return item;
    })
  );
  dialog.showModal();
}

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openHat(button.dataset.open));
});

closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => trigger?.focus());
