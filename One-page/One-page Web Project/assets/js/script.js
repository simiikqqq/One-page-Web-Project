let notes = [];
let archive = [];
let editingIndex = null;
let activeCategory = null;

document.querySelectorAll("nav button").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll("main section")
            .forEach(s => s.classList.remove("active"));
        document.getElementById(btn.dataset.section).classList.add("active");
    };
});

// NAČTENÍ DAT

async function loadData() {
    notes = await fetch("../api/notes.php?action=getNotes").then(r => r.json());
    archive = await fetch("../api/notes.php?action=getArchive").then(r => r.json());
    renderAllNotes();
    renderArchive();
}

loadData();

// ULOŽENÍ

document.getElementById("saveNote").onclick = async () => {
    const title = noteTitle.value;
    const text = noteText.value;
    const category = noteCategory.value;

    if (!title || !text || !category) {
        alert("Vyplň vše");
        return;
    }

    await fetch("../api/notes.php?action=save", {
        method: "POST",
        body: JSON.stringify({ title, text, category })
    });

    noteTitle.value = noteText.value = "";
    loadData();
};

// VYKRESLENÍ 

function renderAllNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((n, i) => {
        notesContainer.innerHTML += `
        <div class="note-card">
            <h3>${n.title}</h3>
            <p>${n.text}</p>
            <small>${n.category}</small><br><br>
            <button onclick="archiveNote(${i})">Archiv</button>
            <button onclick="deleteNote(${i})">Smazat</button>
        </div>`;
    });
}

document.querySelectorAll(".category").forEach(btn => {
    btn.onclick = () => {
        activeCategory = btn.dataset.category;
        categoryNotes.innerHTML = "";
        notes.filter(n => n.category === activeCategory)
            .forEach(n => {
                categoryNotes.innerHTML += `
                <div class="note-card">
                    <h3>${n.title}</h3>
                    <p>${n.text}</p>
                </div>`;
            });
    };
});

// AKCE 

async function deleteNote(index) {
    await fetch(`../api/notes.php?action=delete&id=${index}`);
    loadData();
}

async function archiveNote(index) {
    await fetch(`../api/notes.php?action=archive&id=${index}`);
    loadData();
}

function renderArchive() {
    const box = document.getElementById("archive-list");
    box.innerHTML = "";

    archive.forEach(note => {
        const div = document.createElement("div");
        div.className = "archive-item";
        div.innerHTML = `<strong>${note.title}</strong><br>${note.text}`;
        box.appendChild(div);
    });
}
