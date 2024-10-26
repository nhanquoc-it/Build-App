const inputValue = document.getElementById("inputValue");
const listContainer = document.getElementById("todo-list");

function addTask() {
	if (inputValue.value == "") {
		alert("You must write something!");
	} else {
		let li = document.createElement("li");
		li.classList.add("todo-item");
		li.innerHTML = inputValue.value;
		listContainer.appendChild(li);
		let span = document.createElement("span");
		span.classList.add("close-btn");
		span.innerHTML = '<img src="./images/close.png" alt="Close" />';
		li.appendChild(span);
	}
	inputValue.value = "";
	inputValue.focus();
	saveData();
}

listContainer.addEventListener(
	"click",
	function (e) {
		if (e.target.tagName === "LI") {
			e.target.classList.toggle("checked");
			saveData();
		} else if (e.target.tagName === "IMG") {
			e.target.parentElement.parentElement.remove();
			saveData();
		}
	},
	false
);

function saveData() {
	localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
