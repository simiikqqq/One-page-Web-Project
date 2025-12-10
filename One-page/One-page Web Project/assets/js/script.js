const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("main section");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.section;

        sections.forEach(s => s.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});


async function loadNotes() {
    const response = await fetch("backend.php?action=getNotes");
    const notes = await response.json();
    return notes;
}

async function saveNote(data) {
    const response = await fetch("backend.php?action=saveNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return await response.json();
}

async function deleteNote(id) {
    const response = await fetch("backend.php?action=deleteNote&id=" + id);
    return await response.json();
}

async function moveToArchive(id) {
    const response = await fetch("backend.php?action=archiveNote&id=" + id);
    return await response.json();
}
