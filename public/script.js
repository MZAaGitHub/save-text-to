const saveButton = document.querySelector("#saveButton");
const readButton = document.querySelector("#readButton");
const myTextarea = document.querySelector("#myTextarea");

saveButton.addEventListener("click", () => {
  const text = myTextarea.value;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/save");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ text }));
});

readButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/read");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    myTextarea.value = response.text;
  };
  xhr.send();
});
