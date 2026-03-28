const pickedColor = document.querySelector("#color-input");
const colorTheory = document.querySelector("select");
const numberOfColors = 5;

document.querySelector("#get-color-scheme").addEventListener("click", () => {
  const hexCol = pickedColor.value.slice(1);
  const colorTheoryValue = colorTheory.value;
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
    .then((response) => response.json())
    .then((data) => {
      const renderingColors = data.colors.map((color) => color.hex.value);
      console.log(data.colors[0].hex.value);
      console.log(data.colors[1].hex.value);
      console.log(data.colors[2].hex.value);
      console.log(data.colors[3].hex.value);
      console.log(data.colors[4].hex.value);
      console.log(renderingColors);

      renderingColors.forEach((color, index) => {
        document.querySelector(`.color${index}`).style.backgroundColor = color;
        document.querySelector(`.name${index}`).textContent = color;
      });

      renderingColors.length = 0;
    });
});
