let button = document.querySelector("#calc-btn");

// https://habr.com/ru/company/lamptest/blog/690638/

button.addEventListener("click", async () => {
    // let url = document.querySelector("#url").value;

    let url = "https://cors-anywhere.herokuapp.com/";
    let response = await fetch(url);
    console.log(response);
})