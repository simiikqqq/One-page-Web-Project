<?php
header("Content-Type: application/json");

$notesFile = "../data/notes.json";
$archiveFile = "../data/archive.json";

function readJson($file) {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true);
}

function saveJson($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$action = $_GET["action"] ?? "";

if ($action === "getNotes") {
    echo json_encode(readJson($notesFile));
}

if ($action === "getArchive") {
    echo json_encode(readJson($archiveFile));
}

if ($action === "save") {
    $notes = readJson($notesFile);
    $data = json_decode(file_get_contents("php://input"), true);
    $notes[] = $data;
    saveJson($notesFile, $notes);
    echo json_encode(["ok" => true]);
}

if ($action === "delete") {
    $notes = readJson($notesFile);
    array_splice($notes, $_GET["id"], 1);
    saveJson($notesFile, $notes);
    echo json_encode(["ok" => true]);
}

if ($action === "archive") {
    $notes = readJson($notesFile);
    $archive = readJson($archiveFile);

    $archive[] = $notes[$_GET["id"]];
    array_splice($notes, $_GET["id"], 1);

    saveJson($notesFile, $notes);
    saveJson($archiveFile, $archive);

    echo json_encode(["ok" => true]);
}
