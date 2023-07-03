Number.prototype.clamp = function (min, max) {
	if (this < min) {
		return min;
	}
	if (this > max) {
		return max;
	}
	return this;
}

var menuCheckbox = document.getElementById("menuCheckbox");
menuCheckbox.checked = false;
var menuContent = document.getElementById("menuContent");
var dialog = document.querySelector("dialog");
menuCheckbox.addEventListener('change', e => {
	menuContent.classList.remove("hidden");
	if (!e.target.checked) {

		

		var value = window.getComputedStyle(menuContent).getPropertyValue("--animation-time");
		if (value.endsWith("ms")) {
			value = value.slice(0, -2);
		} else if (value.endsWith("s")) {
			value = value.slice(0, -1) * 1000;
		} else {
			console.error("ERROR: the animation time is not in the correct format");
		}
		setTimeout(() => {
			menuContent.classList.add("hidden");
		}, value);
	}
});
menuLabel = document.querySelector(".menu[for=\"menuCheckbox\"]")
menuLabel.addEventListener("keydown", e => {
	if (e.key == " " || e.key == "Enter" || (menuCheckbox.checked && e.key == "Escape")) {
		menuCheckbox.checked = !menuCheckbox.checked;
		menuCheckbox.dispatchEvent(new Event("change"));
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	}
	if (e.key == "ArrowDown" && menuCheckbox.checked) {
		document.querySelector("#menuContent > a:first-child").focus()
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	}
});

[...menuContent.children].forEach(el => {
	el.addEventListener("keydown", e => {
		if (e.key == "ArrowDown" && menuCheckbox.checked && e.target.nextElementSibling != null) {
			e.target.nextElementSibling.focus();
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if (e.key == "ArrowUp" && menuCheckbox.checked) {
			if (e.target.previousElementSibling == null) {
				menuLabel.focus();
			} else {
				e.target.previousElementSibling.focus()
			}
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if (e.key == "Escape") {
			menuCheckbox.checked = !menuCheckbox.checked;
			menuCheckbox.dispatchEvent(new Event("change"));
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
	})
});

// const lerp = (point, start, end) => start + ((end - start) * point);
// const inverseLerp = (
// 	newMax,
// 	newMin,
// 	oldMax,
// 	oldMin,
// 	value
// ) => lerp((value - oldMin) / (oldMax - oldMin), newMin, newMax)

// var scrolly = document.getElementById("scrolly");

// if (scrolly !== null) {
// 	scrolly.addEventListener("scroll", e => {
// 		// window.pageYOffset;
// 		[...document.getElementsByClassName("scales-with-scroll")].forEach(el => {
// 			var rect = el.getBoundingClientRect();
// 			if (
// 				rect.top + window.scrollY > window.pageYOffset + window.innerHeight ||
// 				rect.bottom + window.scrollY < window.pageYOffset
// 			) {
// 				return;
// 			}
// 			var centre = rect.top + window.scrollY + (rect.height / 2);
// 			var pageYCentre = window.pageYOffset + (window.innerHeight / 2);
// 			var oldMin = centre > pageYCentre ? rect.top + window.scrollY : rect.top + window.scrollY + rect.height;
// 			el.style.setProperty(
// 				"--scale",
// 				inverseLerp(1, 0.5, centre, oldMin, pageYCentre).clamp(0.5, 1)
// 			);
// 		});
// 	});
// }
