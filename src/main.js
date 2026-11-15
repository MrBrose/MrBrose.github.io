import { setPopupableDefaults } from "popupable-vue"
import { createApp } from "vue"
import App from "./App.vue"
import { followLinks, router } from "./router.js"
import "./styles/styles.css"
import "./styles/carousel.css"
import "./styles/transition.css"

setPopupableDefaults({ zoomable: true })
followLinks(document)
createApp(App).use(router).mount("#app")
