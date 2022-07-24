var menuCheckbox = document.getElementById("menuCheckbox");
menuCheckbox.checked = false;
var menuContent = document.getElementById("menuContent");
menuCheckbox.addEventListener('change', e => {
	menuContent.classList.remove("hidden");
	if(!e.target.checked){
		var value = window.getComputedStyle(menuContent).getPropertyValue("--animation-time");
		if (value.endsWith("ms")){
			value = value.slice(0,-2);
		}else if(value.endsWith("s")){
			value = value.slice(0,-1)*1000;
		}else{
			console.error("ERROR: the animation time is not in the correct format");
		}
		setTimeout(()=>{
			menuContent.classList.add("hidden");
		},value);
	}
});
menuLabel = document.querySelector(".menu[for=\"menuCheckbox\"]")
menuLabel.addEventListener("keydown",e=>{
	if(e.key == " " || e.key == "Enter"){
		menuCheckbox.checked = !menuCheckbox.checked;
		menuCheckbox.dispatchEvent(new Event("change"));
	}
	if(e.key=="ArrowDown" && menuCheckbox.checked){
		document.querySelector("#menuContent > a:first-child").focus()
	}
});

[...menuContent.children].forEach(el => {
	el.addEventListener("keydown",e=>{
		if(e.key=="ArrowDown" && menuCheckbox.checked && e.target.nextElementSibling != null){
			e.target.nextElementSibling.focus()
		}
		if(e.key=="ArrowUp" && menuCheckbox.checked){
			if (e.target.previousElementSibling == null){
				menuLabel.focus()
			}else{
				e.target.previousElementSibling.focus()
			}
		}
	})
});
