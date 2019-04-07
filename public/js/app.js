console.log('client side js file loaded')

const weatherElement = document.querySelector('form');
const search = document.querySelector('input');
const mess1 = document.getElementById('mess1');
const mess2 = document.getElementById('mess2');

weatherElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    
    mess1.textContent = 'Loading...';
    mess2.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((resp) => {
        resp.json().then((data) => {
            mess1.textContent = '';
            if(data.err) {
                mess1.textContent = data.err;
                console.log()
            } else {
                mess2.textContent = data.location;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});


