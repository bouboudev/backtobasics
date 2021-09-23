let userData = [];

// faire async await pour afficher les informations après qu'il est cherché tout les resultats sinon sa n'affiche rien
const fetchUser = async() => { await fetch('https://randomuser.me/api/?results=24')
.then((res) => res.json())
.then((data) => (userData = data.results));
console.log(userData[0]);
};

const userDisplay = async () => { await
    fetchUser();
// Gerer date de naissance
    const dateParser =(date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        return newDate
    }
    // Gerer date d'ancienneté en jour
    const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
}
    document.body.innerHTML = userData.map((user) =>
    ` 
    <div class="card"> 
    <img src="${user.picture.large}" alt ="photo de ${user.name.first}"/> 
    <h3> ${user.name.first} ${user.name.last}</h3> 
    <p> ${user.location.city}, ${dateParser(user.dob.date)} </p> 
    <em> Membre depuis ${dayCalc(user.registered.date)} jours</em> 

    </div>
    `
    ).join("");
    
};

userDisplay();