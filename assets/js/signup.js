const AlldropdownsButton = document.querySelectorAll(".form-main-container .form-input .has-dropdown");
const AllInputsWithDropdown = document.querySelectorAll(".form-main-container .form-input:has(.has-dropdown) .form-control");

const bothTabsOfInputs = document.querySelectorAll("form .form-controls-container");
const bothTabs = document.querySelectorAll(".tab-content .tab-pane");
const allForChemicalInputs = bothTabs[0].querySelectorAll(".form-input .form-control");
const allPetAndGasInput = bothTabs[1].querySelectorAll(".form-input .form-control");

const submitBtn = document.querySelector(".form-main-container button[type='submit']");

function setDisableTrue(array) {
	array.forEach((inputItem) => {
		inputItem.disabled = true;
	});
}
function setDisableFalse(array) {
	array.forEach((inputItem) => {
		inputItem.disabled = false;
	});
}

function followFormRule(firstArray, secondArray) {
	/*
   form rule: 
   "If one of the department forms is being filled,
    disable the other one in order to prevent 
    double entries of data for user" 
    */
	for (let eachInput = 0; eachInput < firstArray.length; eachInput++) {
		firstArray[eachInput].addEventListener("input", function () {
			this.value !== "" ? setDisableTrue(secondArray) : setDisableFalse(secondArray);
		});
	}
}

followFormRule(allForChemicalInputs, allPetAndGasInput);
followFormRule(allPetAndGasInput, allForChemicalInputs);

for (const eachTabOfInputs of bothTabsOfInputs) {
	/*
   for each tab, get the dom elements
   */
	const categorySelectionDropdown = eachTabOfInputs.querySelector(".select-category.has-dropdown");
	const categorySelectionInput = eachTabOfInputs.querySelector(".select-category-class");
	const graduationYearInput = eachTabOfInputs.querySelector(".graduation-year-form-input");
	const yearInputDropdown = eachTabOfInputs.querySelector(".graduation-year.has-dropdown");
	const yearInput = eachTabOfInputs.querySelector(".graduation-year");

	/* get their dropdown children */
	const categoryChildren = categorySelectionDropdown.children;
	const years = yearInputDropdown.children;

	/*
      automate function basically takes in three arugments
      First one => the array 
      Second argument => a function 
      third argument => the number of arguments passed into the function of the second argument
   */
	automate(categoryChildren, hideShowGraduationYearForm, 2);
	automate(years, setYear, 1);

	function automate(arrayOfSingleElements, runGivenFunction, numberOfParameters) {
		for (const singleElement of arrayOfSingleElements) {
			const htmlElement = singleElement.children.item("span" || "button" || "a");
			const attributeName = htmlElement.getAttribute("name");
			const textContent = htmlElement.textContent;

			htmlElement.addEventListener("click", () => {
				numberOfParameters === 2 ? runGivenFunction(attributeName, textContent) : runGivenFunction(textContent);
			});
		}
	}

	function setYear(year) {
		yearInput.value = year;
	}

	function hideShowGraduationYearForm(innerText, input) {
		const isVisible = "isVisible";

		//if no value exist, do nothing
		if (innerText.toLowerCase() === "alumni") {
			graduationYearInput.classList.add(isVisible);
		} else {
			graduationYearInput.classList.remove(isVisible);
		}
		categorySelectionInput.value = input;
	}
}
