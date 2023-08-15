// START POLYFILL FOR SCROLL MAX PROPERTIES (https://stackoverflow.com/a/48246003)
(function(elmProto){
	if ('scrollTopMax' in elmProto) {
		return;
	}
	Object.defineProperties(elmProto, {
		'scrollTopMax': {
			get: function scrollTopMax() {
				return this.scrollHeight - this.clientHeight;
			}
		},
		'scrollLeftMax': {
			get: function scrollLeftMax() {
				return this.scrollWidth - this.clientWidth;
			}
		}
	});
}
)(Element.prototype);
// END POLYFILL FOR SCROLL MAX PROPERTIES

document.querySelectorAll("[component^=\"carousel\"]").forEach(el => {
	if (
		el.children.length != 3 ||
		el.children[0].tagName != "BUTTON" ||
		el.children[1].tagName != "UL" ||
		el.children[2].tagName != "BUTTON"
	){
		console.error("Error [carousel] must have exactly three children of type <button> <ul> <button>");
		return;
	}

	const prevBut = el.children[0];
	const scroll = el.children[1];
	const nextBut = el.children[2];
	const icons = document.createElement("UL");

	let song;
	let clicking = false;

	function checkScrollEnd(){
		prevBut.disabled = scroll.scrollLeft === 0;
		nextBut.disabled = scroll.scrollLeft === (scroll.scrollWidth - scroll.offsetWidth);
	}

	function get_scroll_width(){
		return scroll.scrollLeftMax/(scroll.children.length-1);
	}

	function get_current_el_index(){
		return scroll.scrollLeft / get_scroll_width()
	}
	function set_icon_state(index){
		icons.querySelectorAll(".selected").forEach(el=>el.classList.remove("selected"));
		icons.children[index].classList.add("selected");
	}

	function inertify_elements(){
		[...scroll.children].forEach(el=>el.setAttribute("inert",""));
		scroll.children[get_current_el_index()].removeAttribute("inert");
	}

	function scrollLeft(){
		scroll.scrollBy({left:-el.scrollWidth});
		onScroll(get_current_el_index()-1);
	}
	function scrollRight(){
		scroll.scrollBy({left:el.scrollWidth});
		onScroll(get_current_el_index()+1);
	}

	function onScroll(nextIndex){
		song?.pause();
		if (scroll.children[nextIndex].hasAttribute("titus")){
			song = new Audio("/Bödibödi - Avve N.mp3");
			song.play();
		}
		set_icon_state(nextIndex);
	}

	function scrollStop(){
		inertify_elements();
		clicking = false;
		set_icon_state(get_current_el_index());
	}

	function scrollTo(index){
		scroll.scrollLeft = get_scroll_width()*index;
		onScroll(index);
	}

	function preButtonScroll(){
		if (clicking) { return true; }
		clicking = true;
	}

	// icons
	icons.classList.add("icons");
	[...scroll.children].forEach((el, i)=>{
		let img = document.createElement("IMG");
		img.src = el.getAttribute("img-src");
		let cont = document.createElement("LI");
		let but = document.createElement("BUTTON");
		but.appendChild(img);
		cont.appendChild(but);
		icons.appendChild(cont);
		but.addEventListener("click", ()=>{scrollTo(i);});
	});
	el.insertBefore(icons, nextBut);

	// disable fallback
	scroll.style.overflow = "hidden"; //this is done in js so it still works with no js

	// setup state
	inertify_elements();
	checkScrollEnd();
	onScroll(get_current_el_index())

	// event listners
	scroll.addEventListener("scroll",checkScrollEnd);

	scroll.addEventListener("scrollend",scrollStop)

	prevBut.addEventListener("click",()=>{
		if (preButtonScroll()){return;}
		scrollLeft();
	});
	nextBut.addEventListener("click",()=>{
		if (preButtonScroll()){return;}
		scrollRight();
	});
});