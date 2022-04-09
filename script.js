// images
const imageFullView = document.querySelector("#image-full-view")
const imageContainer = document.querySelector("#image-container")
const imageContainerHeading = document.querySelector("#image-container h1")
const imageContainerImage = document.querySelector("#image-container img")
const imageContainerDownload = document.querySelector("#image-container a")
const images = document.querySelectorAll("#images img")

images.forEach((image) => {
	image.onclick = (event) => {
		event.stopPropagation()
		let src = image.getAttribute("src")
		let name = src.split("/")[1]
		imageContainerHeading.innerText = name
		imageContainerImage.setAttribute("src", src)
		imageFullView.style.display = "flex"
	}
})

imageContainerDownload.onclick = () => {
	let src = imageContainerDownload.parentElement.children[1].getAttribute("src")
	imageContainerDownload.setAttribute("href", src)
}

document.body.onclick = (event) => {
	if (getComputedStyle(imageFullView).display === "flex" && ![imageContainerHeading, imageContainerImage, imageContainerDownload].includes(event.target)) {
		imageFullView.style.display = "none"
	}
}

// search
const searchInput = document.querySelector("#search-field input")
const searchGlass = document.querySelector("#search-field svg:first-of-type")
const searchCross = document.querySelector("#search-field svg:last-of-type")

function assignSearch() {
	window.location.assign(window.location.pathname + `?search=${searchInput.value}`)
}

searchInput.onkeydown = (event) => {
	if (event.key === "Enter") {
		assignSearch()
	}
}

searchGlass.onclick = () => {
	assignSearch()
}

searchCross.onclick = () => {
	searchInput.value = ""
	searchInput.focus()
}

const main = document.querySelector("main")
const searchParam = window.location.href.split("?search=")[1]

if (searchParam !== undefined) {
	searchInput.value = searchParam
	let counter = 0
	let s = "s"

	images.forEach((image) => {
		if (!image.getAttribute("src").toLowerCase().includes(searchParam.toLowerCase())) {
			image.style.display = "none"
		} else {
			counter++
		}
	})

	if (counter === 0) {
		document.querySelector("#images").remove()
		main.insertAdjacentHTML("afterbegin", "<h2>No search results :(</h2>")
	} else if (counter === 1) {
		s = ""
	}

	main.insertAdjacentHTML("afterbegin", `<h1>${counter} search result${s} for "${searchParam}"</h1>`)
}

// switch
const lightSwitch = document.querySelector("#light-switch")
const root = document.querySelector(":root")
const sunPath = `<path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>`
const moonPath = `<path fill="none" d="M0 0h24v24H0z"/><path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"/>`

function lightMode() {
	lightSwitch.innerHTML = sunPath
	root.style.setProperty("--background", "#f5f5f5")
	root.style.setProperty("--foreground", "#212121")
	imageFullView.style.setProperty("--local-bg", "var(--background)")
	imageFullView.style.setProperty("--local-fg", "var(--foreground)")
}

function darkMode() {
	lightSwitch.innerHTML = moonPath
	root.style.setProperty("--background", "#212121")
	root.style.setProperty("--foreground", "#f5f5f5")
	imageFullView.style.setProperty("--local-bg", "var(--foreground)")
	imageFullView.style.setProperty("--local-fg", "var(--background)")
}

lightSwitch.onclick = () => {
	if (localStorage.getItem("mode") !== "dark") {
		localStorage.setItem("mode", "dark")
		darkMode()
	} else {
		localStorage.removeItem("mode")
		lightMode()
	}
}

if (localStorage.getItem("mode")) {
	darkMode()
} else {
	lightMode()
}