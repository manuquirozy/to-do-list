const regex = /\s+|dropdown-item/g;

const dropdownItem = document.querySelectorAll('.dropdown-item');

dropdownItem.forEach((item) => {
  item.addEventListener('click', function () {
    const selectedValue = this.getAttribute('data-value');
    const itemClass = this.getAttribute('class');
    const taskId = itemClass.replace(regex, '');
    const url = '/status';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: taskId, status: selectedValue }),
    })
      .then((response) => {
        window.location.href = '/list';
        return response.json();
      })
      .catch((error) => console.error(error));
  });
});
