const nameUser = document.querySelector(".name");
const email = document.querySelector(".email");
const numb = document.querySelector(".numb");
const url = document.querySelector(".url");
const btnSave = document.querySelector(".btnSave");

const setDl = (newDate) => {
  const Dt = JSON.parse(localStorage.getItem("cards"));
  if (!Dt) {
    localStorage.setItem("cards", JSON.stringify([]));
  } else if (newDate) {
    const newDt = JSON.parse(localStorage.getItem("cards"));
    newDt.push(newDate);
    localStorage.setItem("cards", JSON.stringify(newDt));
  }
};

setDl();

const setD = () => {
  if (
    !nameUser.value.trim("") ||
    !email.value.trim("") ||
    !numb.value.trim("") ||
    !url.value.trim("")
  ) {
    alert("Заполните все ячейки правильно");
    return;
  } else {
    const newDate = {
      name: nameUser.value,
      email: email.value,
      number: numb.value,
      url: url.value,
    };
    setDl(newDate);
    getD();
    nameUser.value = "";
    email.value = "";
    numb.value = "";
    url.value = "";
  }
};
btnSave.addEventListener("click", setD);

const resElem = document.querySelector(".result");

function getD() {
  const date = JSON.parse(localStorage.getItem("cards"));
  resElem.innerHTML = "";

  date.forEach((item, index) => {
    const img = document.createElement("img");
    const inpName = document.createElement("h3");
    const inpEmail = document.createElement("h4");
    const inpNumb = document.createElement("h4");
    const btnDelete = document.createElement("button");
    const btnUpdate = document.createElement("button");
    img.setAttribute("src", item.url);
    inpName.innerText = item.name;
    inpEmail.innerText = item.email;
    inpNumb.innerText = item.number;
    btnDelete.innerText = "Delete";
    btnUpdate.innerText = "Update";

    btnDelete.addEventListener("click", () => {
      deleteBtn(index);
    });
    btnUpdate.addEventListener("click", () => {
      updateElem(index);
    });

    resElem.append(img);
    resElem.append(inpName);
    resElem.append(inpEmail);
    resElem.append(inpNumb);
    resElem.append(btnDelete);
    resElem.append(btnUpdate);
  });
}

getD();

function deleteBtn(index) {
  const date = JSON.parse(localStorage.getItem("cards"));
  date.splice(index, 1);
  localStorage.setItem("cards", JSON.stringify(date));
  getD();
}

function updateElem(index) {
  const date = JSON.parse(localStorage.getItem("cards"));
  const cardToUpdate = date[index];

  // Создайте динамические инпуты для редактирования данных
  const updatedNameInput = document.createElement("input");
  updatedNameInput.value = cardToUpdate.name;
  const updatedEmailInput = document.createElement("input");
  updatedEmailInput.value = cardToUpdate.email;
  const updatedNumberInput = document.createElement("input");
  updatedNumberInput.value = cardToUpdate.number;
  const updatedUrlInput = document.createElement("input");
  updatedUrlInput.value = cardToUpdate.url;

  // Замените содержимое карточки на инпуты для редактирования
  resElem.innerHTML = "";
  resElem.append(updatedNameInput);
  resElem.append(updatedEmailInput);
  resElem.append(updatedNumberInput);
  resElem.append(updatedUrlInput);

  // Создайте кнопку "Сохранить изменения"
  const saveChangesBtn = document.createElement("button");
  saveChangesBtn.innerText = "Сохранить изменения";

  // Добавьте обработчик события для кнопки "Сохранить изменения"
  saveChangesBtn.addEventListener("click", () => {
    // Обновите данные в хранилище на основе введенных значений в инпуты
    cardToUpdate.name = updatedNameInput.value;
    cardToUpdate.email = updatedEmailInput.value;
    cardToUpdate.number = updatedNumberInput.value;
    cardToUpdate.url = updatedUrlInput.value;
    localStorage.setItem("cards", JSON.stringify(date));

    // Отобразите обновленные данные на странице
    getD();
  });

  // Добавьте кнопку "Сохранить изменения" на страницу
  resElem.append(saveChangesBtn);
}
