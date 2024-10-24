const userInput = document.querySelector(".calculator-input");
const calculatorBtn = document.querySelector(".calculator-btn");
const resultAge = document.getElementById("result-age");

userInput.max = new Date().toISOString().split("T")[0];

calculatorBtn.addEventListener("click", () => {
	let birthDate = new Date(userInput.value);
	if (isNaN(birthDate.getTime())) {
		resultAge.innerHTML = "Please enter a valid date.";
		return;
	}
	let dateOfBirth = birthDate.getDate();
	let monthOfBirth = birthDate.getMonth() + 1; // Tháng từ 0-11, chuyển thành 1-12
	let yearOfBirth = birthDate.getFullYear();

	let today = new Date();
	let dateCurrent = today.getDate();
	let monthCurrent = today.getMonth() + 1;
	let yearCurrent = today.getFullYear();

	let totalDate, totalMonth, totalYear;
	totalYear = yearCurrent - yearOfBirth;

	if (monthCurrent >= monthOfBirth) {
		totalMonth = monthCurrent - monthOfBirth;
	} else {
		totalYear--;
		totalMonth = 12 + yearCurrent - yearOfBirth;
	}

	if (dateCurrent >= dateOfBirth) {
		totalDate = dateCurrent - dateOfBirth;
	} else {
		totalMonth--;
		totalDate =
			getDaysInMonth(yearOfBirth, monthOfBirth) + dateCurrent - dateOfBirth;
	}
	// Nếu tháng âm, điều chỉnh số tháng và năm
	if (totalMonth < 0) {
		totalMonth += 12;
		totalYear--;
	}

	// Chuyển đổi tháng thành năm nếu cần
	const additionalYears = Math.floor(totalMonth / 12);
	totalYear += additionalYears;
	totalMonth = totalMonth % 12;

	let result = "";
	if (totalYear > 0) {
		result = `Your current age is <span>${totalYear}</span> years old`;
	} else if (totalMonth > 0) {
		result = `You are now <span>${totalMonth}</span> months old`;
	} else if (totalDate > 0) {
		result = `You are now <span>${totalDate}</span> days old`;
	} else {
		result = "You are not yet born";
	}

	resultAge.innerHTML = `
     <h2>Result :</h2>
    <p>- You were born about <span>${totalYear}</span> years, <span>${totalMonth}</span> months, and <span>${totalDate}</span> days ago.</p>
    
    <p>- ${result}.</p>
    `;
});

function getDaysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}
