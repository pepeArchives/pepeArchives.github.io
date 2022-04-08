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
