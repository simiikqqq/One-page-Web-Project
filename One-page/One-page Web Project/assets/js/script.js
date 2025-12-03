const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("main section");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.section;

        sections.forEach(s => s.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});
