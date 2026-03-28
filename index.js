// Reference to the color input element (e.g. <input type="color">)
const pickedColor = document.querySelector("#color-input");

// Reference to the select element that controls the color scheme mode
const colorTheory = document.querySelector("select");

// Number of colors to request from the API
const numberOfColors = 5;

// Handle click on the "Get color scheme" button
document.querySelector("#get-color-scheme").addEventListener("click", () => {
  // Extract the hex value without the leading "#" (API requirement)
  const hexCol = pickedColor.value.slice(1);

  // Get the selected color theory mode (monochrome, analogic, etc.)
  const colorTheoryValue = colorTheory.value;

  // Fetch a color scheme from The Color API
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${hexCol}&mode=${colorTheoryValue}&count=${numberOfColors}&format=json`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  )
    // Parse the response into a JavaScript object
    .then((response) => response.json())

    // Process the API data and render the colors
    .then((data) => {
      // Extract only the hex values from the API response
      const renderingColors = data.colors.map((color) => color.hex.value);

      // Apply each color to its corresponding UI element
      renderingColors.forEach((color, index) => {
        const colorEl = document.querySelector(`.color${index}`);
        const nameEl = document.querySelector(`.name${index}`);

        // Update background color if the element exists
        if (colorEl) colorEl.style.backgroundColor = color;

        // Display the hex value as text if the element exists
        if (nameEl) nameEl.textContent = color;
      });
    });
});
