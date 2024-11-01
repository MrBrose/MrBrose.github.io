const portfolioScroller = document.querySelector("#logo-portfolio-scroller");
portfolioScroller.addEventListener("wheel", e => {
    e.preventDefault();
    portfolioScroller.scrollBy({left: e.deltaY});
})