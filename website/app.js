/* Global Variables */
const zipId = document.querySelector('#zip');
const userFeelings = document.querySelector('#feelings');
const generate = document.querySelector('#generate');
const entryDate = document.querySelector('#date');
const entryTemp = document.querySelector('#temp');
const entryname = document.querySelector('#name');
const entryContent = document.querySelector('#content');
const APIURL = 'http://api.openweathermap.org/data/2.5/weather';
const APIKEY = '3fe56ed4dc48e2c8854fc2168568e926';
// Create a new date instance dynamically with JS
let d = new Date();

// main logic
generate.addEventListener('click', getAndUpdate);
getData(`${APIURL}?zip=${10001},us&appid=${APIKEY}`).then(data => console.log(data));

// helper functions
function getcurrentDate() {
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}

function getAndUpdate() {
    const zipcode = zipId.value;
    const feelings = userFeelings.value;
    (zipcode && feelings) || alert('you must enter zipcode.. oor feelings...');
    if (!zipcode || !feelings) return;
    getData(`${APIURL}?zip=${zipcode},us&appid=${APIKEY}`)
        .then(data => {
            console.log(data);
            if (data.cod != 200) {
                alert('city not found');
                return;
            }
            const obj = { ures: feelings, temp: data.main.temp, date: getcurrentDate(), name: data.name };
            return postData('\addEntry', obj);
        }).then(data => {
            console.log(data);
            updateUI(data);
        });
    console.log(zipcode);
}

function updateUI(data) {
    entryDate.innerText = data.date;
    entryContent.innerText = data.ures;
    entryTemp.innerText = data.temp;
    entryname.innerText = data.name;
}

async function getData(url = '') {
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(error);
    }
}

async function postData(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'post',
        credentails: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const resData = await res.json();
        return resData;

    } catch (error) {
        console.log(error);
    }
}