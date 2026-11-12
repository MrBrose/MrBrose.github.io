import { createApp } from "vue"
import App from "./App.vue"
import { followLinks, router } from "./router.js"
import "./styles/styles.css"
import "./styles/carousel.css"

followLinks(document)
createApp(App).use(router).mount("#app")
