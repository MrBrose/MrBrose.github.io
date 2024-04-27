const imageLoaded = img=>new Promise((resolve, reject)=>{
    if (img.complete) {resolve();}else{
        img.addEventListener("load",resolve);
        img.addEventListener("error",reject);
    }
});

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const insertNextEl = (el, neu)=>{
    if (el.nextSibling) {el.parentNode.insertBefore(neu, el.nextSibling);}
    else {el.parentNode.appendChild(neu);}
}

const splitscroller = ()=>[...document.querySelectorAll("[component^=side-scroll]")].forEach(async el=>{
    el.setAttribute("OG","");
    let kids = [...el.children];
    await Promise.allSettled(kids.map(imageLoaded));
    let rows = (el.getBoundingClientRect().height/250)|0;
    let length = Math.round(el.children.length / rows);
    let imgs = [];
    while (kids.length > 0){imgs.push(kids.splice(0, length));}
    el.replaceChildren()
    let rowItems = [el];
    for (let i = 0; i < rows - 1; i++) {
        let div = document.createElement("DIV");
        div.setAttribute("component","side-scroll");
        insertNextEl(rowItems[i],div);
        rowItems.push(div);
    }
    zip(rowItems, imgs).forEach(([row, img])=>row.replaceChildren(...img));
    el.parentElement.style.setProperty("--width", Math.max(
        ...rowItems.map(row=>row.lastChild.getBoundingClientRect().right - row.getBoundingClientRect().left)
    )+"px");
});
const mergeScroller = ()=>{
    let lastOG;
    [...document.querySelectorAll("[component^=side-scroll]")].forEach(async el=>{
        if (typeof el.getAttribute("OG") == "string"){
            lastOG = el;
        }else{
            lastOG.append(...el.childNodes);
            el.remove()
        }
    });
}
document.addEventListener('load', splitscroller, false);
splitscroller();
window.addEventListener('resize', ()=>{
    mergeScroller();
    splitscroller();
});
 
let main = document.querySelector("main");
main.addEventListener("wheel",e=>{
    main.scrollLeft += e.deltaY * 1.5
})