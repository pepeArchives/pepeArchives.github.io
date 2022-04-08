// images
const imageFullView = document.querySelector("#image-full-view")
const imageContainer = document.querySelector("#image-container")
const imageContainerHeading = document.querySelector("#image-container h1")
const imageContainerImage = document.querySelector("#image-container img")
const imageContainerdownload = document.querySelector("#image-container a")
const images = document.querySelectorAll("main img")

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

imageContainerdownload.onclick = () => {
	let src = imageContainerdownload.parentElement.children[1].getAttribute("src")
	imageContainerdownload.setAttribute("href", src)
}

document.body.onclick = (event) => {
	if (getComputedStyle(imageFullView).display === "flex" && ![imageContainerHeading, imageContainerImage, imageContainerdownload].includes(event.target)) {
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

	if (counter === 1) {
		s = ""
	}

	document.querySelector("main").insertAdjacentHTML("afterbegin", `<h1>${counter} search result${s} for "${searchParam}"</h1>`)
}
