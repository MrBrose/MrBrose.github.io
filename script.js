Number.prototype.clamp = function (min, max) {
	if (this < min) {
		return min;
	}
	if (this > max) {
		return max;
	}
	return this;
}

if (document.body.getAttribute("no-header")==null){
	let menuCheckbox = document.getElementById("menuCheckbox");
	menuCheckbox.checked = false;
	let menuContent = document.getElementById("menuContent");
	let header = document.querySelector("header");
	let main = document.querySelector("main");
	let footer = document.querySelector("footer");
	let menuLabel = document.querySelector(".menu[for=\"menuCheckbox\"]")

	menuCheckbox.addEventListener('change', e => {
		menuContent.classList.remove("hidden");
		if (!e.target.checked) {

			let value = window.getComputedStyle(menuContent).getPropertyValue("--animation-time");
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
		main.toggleAttribute("inert");
		footer.toggleAttribute("inert");
	});

	header.addEventListener("click", e => {
		if (menuCheckbox.checked && e.clientY > header.getBoundingClientRect().bottom){
			menuCheckbox.checked = !menuCheckbox.checked;
			menuCheckbox.dispatchEvent(new Event("change"));
		}
	});

	menuLabel.addEventListener("keydown", e => {
		if (e.key === " " || e.key === "Enter" || (menuCheckbox.checked && e.key === "Escape")) {
			menuCheckbox.checked = !menuCheckbox.checked;
			menuCheckbox.dispatchEvent(new Event("change"));
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if (e.key === "ArrowDown" && menuCheckbox.checked) {
			document.querySelector("#menuContent > a:first-child").focus()
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
		}
	});

	[...menuContent.children].forEach(el => {
		el.addEventListener("keydown", e => {
			if (e.key === "ArrowDown" && menuCheckbox.checked && e.target.nextElementSibling != null) {
				e.target.nextElementSibling.focus();
				e.stopPropagation();
				e.stopImmediatePropagation();
				e.preventDefault();
			}
			if (e.key === "ArrowUp" && menuCheckbox.checked) {
				if (e.target.previousElementSibling == null) {
					menuLabel.focus();
				} else {
					e.target.previousElementSibling.focus()
				}
				e.stopPropagation();
				e.stopImmediatePropagation();
				e.preventDefault();
			}
			if (e.key === "Escape") {
				menuCheckbox.checked = !menuCheckbox.checked;
				menuCheckbox.dispatchEvent(new Event("change"));
				e.stopPropagation();
				e.stopImmediatePropagation();
				e.preventDefault();
			}
		})
	});
}
