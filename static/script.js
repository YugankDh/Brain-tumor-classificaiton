const uploadBox = document.getElementById('uploadBox')
const fileInput = document.getElementById('fileInput')
const preview = document.getElementById('previewArea')
const predictBtn = document.getElementById('scanBtn')
const result = document.getElementById('result')
const labelEl = document.getElementById('accuracyClass')
const confidenceEl = document.getElementById('accuracyNumber')
const about_text = document.getElementById("aboutText")
const severity_Text = document.getElementById("Severity_text")
const preview_text = document.getElementById("preview_placeholder")


let selectedFile = null


uploadBox.addEventListener('click', () => fileInput.click())


fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0]
    if (!selectedFile) return

    const reader = new FileReader()
    reader.onload = (e) => {
        preview.style.backgroundImage = `url(${e.target.result})`
        preview_text.textContent = ""
    }
    reader.readAsDataURL(selectedFile)
})


predictBtn.addEventListener('click', async () => {
    if (!selectedFile) return

    predictBtn.textContent = 'Analysing...'
    predictBtn.disabled = true

    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        })

        const data = await response.json()


        labelEl.textContent = data.class

        confidenceEl.textContent = Math.round(data.confidence)
        about_text.textContent = data.about
        severity_Text.textContent = data.sh

    } catch (err) {
        alert('Something went wrong. Check the console.')
        console.error(err)
    }

    predictBtn.textContent = 'SCAN'
    predictBtn.disabled = false
})