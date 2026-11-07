document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#navigation');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#cards");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});
    


const url = 'https://jamaikah.github.io/wdd231/chamber/data/members.json';

const cards = document.querySelector('#cards');

async function getCompanyData() {
    const response = await fetch('https://jamaikah.github.io/wdd231/chamber/data/members.json');
    const data = await response.json();
    displayCompanies(data.companies);
}

getCompanyData();

const displayCompanies = (companies) => {
    companies.forEach((company) => {
        const card = document.createElement('section');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');

        const compName = document.createElement('h2');
        const logo = document.createElement('img');
        const email = document.createElement('p');
        const phoneNum = document.createElement('p');
        const urlink = document.createElement('p');
        const details = document.createElement('a');

        compName.textContent = `${company.companyName}`;
        email.innerHTML = `<strong>EMAIL:</strong> ${company.companyAddress}`;
        phoneNum.innerHTML = `<strong>PHONE:</strong> ${company.companyPhoneNumber}`;
        urlink.innerHTML = `<strong>URL:</strong> ${company.companyURL}`;
        details.textContent = 'Details';

        details.setAttribute('href', company.companyURL);
        details.setAttribute('target', '_blank');

        logo.setAttribute('src', company.image);
        logo.setAttribute('alt', `Logo of ${company.companyName}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '160');
        logo.setAttribute('height', '150');

        
        cardHeader.appendChild(compName);
        cardHeader.appendChild(details);
        cardInfo.appendChild(email);
        cardInfo.appendChild(phoneNum);
        cardInfo.appendChild(urlink);
        cardBody.appendChild(logo);
        cardBody.appendChild(cardInfo);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        cards.appendChild(card);
    })
}