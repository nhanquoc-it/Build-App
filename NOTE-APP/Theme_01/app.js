// DOMContentLoaded - Đảm bảo mã JavaScript chỉ chạy sau khi DOM đã được tải hoàn toàn.
document.addEventListener("DOMContentLoaded", () => {
	const noteForm = document.getElementById("noteForm");
	const titleNote = document.getElementById("title");
	const contentNote = document.getElementById("content");
	const noteList = document.getElementById("noteList");
	const noteIdInput = document.getElementById("noteId");
	const addNoteBtn = document.querySelector(".add-note");

	let notes = getNotesFromLocalStorage();

	// Render Notes - Hiển thị template danh sách Notes
	function renderNotes() {
		noteList.innerHTML = "";
		notes.forEach((note) => {
			const noteItem = document.createElement("li");
			noteItem.className = "note-item";
			noteItem.innerHTML = `
                <div class="note-content">
				<strong>Tiêu đề: ${note.title}</strong>
				<p>Nội dung: ${note.content}</p>
			</div>
			<button class="btn edit-note" data-id="${note.id}">Sửa</button>
			<button class="btn delete-note" data-id="${note.id}">
				Xóa
			</button>
            `;
			noteList.appendChild(noteItem);
		});
	}

	// Action : Add Note (Form Submit) - Thực hiện hành động thêm ghi chú
	noteForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const id = noteIdInput.value;
		const title = titleNote.value.trim();
		const content = contentNote.value.trim();

		if (title === "" || content === "") return;

		if (id) {
			// Chỉnh sửa ghi chú
			const index = notes.findIndex((note) => note.id === id);
			if (index > -1) {
				notes[index] = { id, title, content };
			}
			addNoteBtn.textContent = "Thêm Ghi Chú";
			noteIdInput.value = "";
		} else {
			// Thêm ghi chú mới
			const newNote = {
				id: Date.now().toString(),
				title,
				content,
			};
			notes.push(newNote);
		}

		saveNotesToLocalStorage();
		resetForm();
		renderNotes();
	});

	// Actions : Edit & Delete Notes (Note List) - Thực hiện hành động Sửa & Xóa ghi chú
	noteList.addEventListener("click", function (event) {
		const target = event.target;
		const id = target.getAttribute("data-id");

		const note = notes.find((note) => note.id === id);
		if (target.classList.contains("edit-note")) {
			if (note) {
				titleNote.value = note.title;
				contentNote.value = note.content;
				noteIdInput.value = note.id;
				addNoteBtn.textContent = "Chỉnh Sửa Ghi Chú";
			}
		} else if (target.classList.contains("delete-note")) {
			notes = notes.filter((note) => note.id !== id);
			saveNotesToLocalStorage();
			renderNotes();
		}
	});

	// Reset Validate Form - Làm mới các trường nhập liệu trên Form
	function resetForm() {
		titleNote.value = "";
		contentNote.value = "";
		noteIdInput.value = "";
		titleNote.focus();
		addNoteBtn.textContent = "Thêm Ghi Chú";
	}

	/*======= LocalStorage =======*/
	//getNotesFromLocalStorage - Lấy dữ liệu ghi chú từ localStorage
	function getNotesFromLocalStorage() {
		return JSON.parse(localStorage.getItem("notes")) || [];
	}
	//saveNotesToLocalStorage - Lưu dữ liệu ghi chú vào localStorage
	function saveNotesToLocalStorage() {
		localStorage.setItem("notes", JSON.stringify(notes));
	}
	//loadNotes - Tải tất cả ghi chú từ localStorage khi ứng dụng khởi động
	function loadNotes() {
		notes.forEach((note) => renderNotes(note));
	}
	// Load notes from localStorage
	loadNotes();
});
