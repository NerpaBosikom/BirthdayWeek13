// Получаем элементы из HTML
const messageDate = document.querySelector(".main__serch"); // Поле ввода даты
const resultText = document.querySelector(".main__text"); // Элемент, куда выводится результат
const button = document.querySelector(".main__button"); // Кнопка "Посчитать"

// Добавляем обработчик клика на кнопку
button.addEventListener("click", function () {
  // Получаем введённую дату из input
  const messageDateStr = messageDate.value.trim(); // Обрезаем лишние пробелы (на всякий случай)

  // Проверяем, выбрал ли пользователь дату
  if (!messageDateStr) {
    resultText.textContent = "Пожалуйста, введите дату!"; // Выводим сообщение
    resultText.classList.add("error-text"); // Добавляем красный цвет тексту
    return; // Прерываем выполнение кода
  }

  // Если дата введена, убираем красное сообщение
  resultText.classList.remove("error-text");

  // Преобразуем дату в миллисекунды (начало дня)
  const messageTimestamp = new Date(messageDateStr).setHours(0, 0, 0, 0);
  const currentTimestamp = new Date().setHours(0, 0, 0, 0);

  // Вычисляем разницу между датами в днях
  const timeDifference = messageTimestamp - currentTimestamp;
  const dayPassed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let message = ""; // Переменная для итогового сообщения

  // Определяем, что выводить пользователю
  if (dayPassed > 0) {
    const dayWord = getDayWord(dayPassed); // Получаем правильное склонение слова "день"
    message = `До вашего дня рождения осталось ${dayPassed} ${dayWord}`;
  } else if (dayPassed < 0) {
    message = "Ваш день рождения уже прошёл";
  } else {
    message = "Ваш день рождения сегодня!";
  }

  // Выводим результат
  resultText.textContent = message;
});

// Функция для правильного склонения слова "день"
function getDayWord(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "день"; // 1 день
  } else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  ) {
    return "дня"; // 2, 3, 4 дня
  } else {
    return "дней"; // 5-20, 25, 30 дней
  }
}
