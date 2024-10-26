// Lưu trữ ghi chú
let notes = JSON.parse(localStorage.getItem("notes")) || [];
const noteInput = document.getElementById("noteInput");
const noteList = document.getElementById("noteList");

function saveNotes() {
	localStorage.setItem("notes", JSON.stringify(notes));
}

// Tải ghi chú từ localStorage khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
	notes = JSON.parse(localStorage.getItem("notes")) || [];
	renderNotes();
});

// Hàm để thêm ghi chú
function addNote() {
	const noteText = noteInput.value.trim();

	if (noteText) {
		notes.push(noteText);
		noteInput.value = "";
		saveNotes();
		renderNotes();
	} else {
		alert("Vui lòng nhập vào nội dung ghi chú!");
	}
}

// Hàm để xóa ghi chú
function deleteNote(index) {
	if (confirm("Bạn có chắc chắn muốn xóa ghi chú này?")) {
		notes.splice(index, 1);
		saveNotes();
		renderNotes();
	}
}

// Hàm để sửa ghi chú
function editNote(index) {
	const newNote = prompt("Sửa ghi chú:", notes[index]);

	if (newNote !== null) {
		notes[index] = newNote;
		saveNotes();
		renderNotes();
	}
}

// Hàm để render ghi chú
function renderNotes() {
	noteList.innerHTML = "";

	notes.forEach((note, index) => {
		const li = document.createElement("li");
		li.className = "note-item";
		li.innerHTML = `
           <p class="text" > ${note}</p>
            <div>
                <button class="btn edit-btn" onclick="editNote(${index})">
                <img class="note-icon" src="./images/edit.png" alt="Edit" />
                Sửa</button>
                <button class="btn delete-btn" onclick="deleteNote(${index})">
                <img class="note-icon" src="./images/deleted.png" alt="Delete" />
                Xóa</button>
            </div>
        `;
		noteList.appendChild(li);
	});
}
