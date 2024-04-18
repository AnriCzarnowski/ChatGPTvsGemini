// Pobranie elementów HTML
const formularzDodawania = document.getElementById('formularzDodawania');
const tabelaHistorii = document.getElementById('tabelaHistorii');
const sumaDoch = document.getElementById('sumaDoch');
const sumaWydatkow = document.getElementById('sumaWydatkow');
const bilans = document.getElementById('bilans');
const podatek = document.getElementById('podatek');
const netto = document.getElementById('netto');
const sredniDzienny = document.getElementById('sredniDzienny');

// Tablica przechowująca historię pozycji
let historia = [];

// Funkcja formatowania daty
function formatujDate(data) {
    const miesiace = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    const dzien = data.getDate();
    const miesiac = miesiace[data.getMonth()];
    const rok = data.getFullYear();
    return `${dzien} ${miesiac} ${rok}`;
}

// Funkcja dodawania pozycji do historii
function dodajPozycje(kwota, typ) {
    const data = new Date();
    const dataFormatowana = formatujDate(data);

    historia.push({
        data: dataFormatowana,
        kwota: kwota,
        typ: typ
    });

    // Aktualizacja tabeli historii
    aktualizujTabeleHistorii();

    // Aktualizacja podsumowania
    aktualizujPodsumowanie();
}

// Funkcja aktualizacji tabeli historii
function aktualizujTabeleHistorii() {
    tabelaHistorii.innerHTML = `<thead>
            <tr>
                <th>Data</th>
                <th>Kwota</th>
                <th>Typ</th>
            </tr>
        </thead>
        <tbody>`;

    for (const pozycja of historia) {
        tabelaHistorii.innerHTML += `<tr>
            <td><span class="math-inline">\{pozycja\.data\}</td\>
<td\></span>{pozycja.kwota.toFixed(2)} zł</td>
            <td>${pozycja.typ}</td>
        </tr>`;
    }

    tabelaHistorii.innerHTML += `</tbody>`;
}

// Funkcja aktualizacji podsumowania
function aktualizujPodsumowanie() {
    let sumaDochZ = 0;
    let sumaWydatkowZ = 0;

    for (const pozycja of historia) {
        if (pozycja.typ === "dochód") {
            sumaDochZ += pozycja.kwota;
        } else if (pozycja.typ === "wydatek") {
            sumaWydatkowZ += pozycja.kwota;
        }
    }

    const bilansZ = sumaDochZ - sumaWydatkowZ;
    const podatekZ = bilansZ * 0.23;
    const nettoZ = bilansZ - podatekZ;
    const sredniDziennyZ = nettoZ / historia.length;

    sumaDoch.innerText = `${sumaDochZ.toFixed(2)} zł`;
    sumaWydatkow.innerText = `${sumaWydatkowZ.toFixed(2)} zł`;
    bilans.innerText = `${bilansZ.toFixed(2)} zł`;
    podatek.innerText = `${podatekZ.toFixed(2)} zł`;
    netto.innerText = `${nettoZ.toFixed(2)} zł`;
    sredniDzienny.innerText = `${sredniDziennyZ.toFixed(2)} zł`;
}

// Obsługa zdarzenia submit formularza dodawania
formularzDodawania.addEventListener('submit', function(e) {
    e.preventDefault();

    const kwota = parseFloat(document.getElementById('kwota').value);
    const typ = document.getElementById('typ').value;

    if (isNaN(kwota) || kwota <= 0) {
        alert("Nieprawidłowa kwota!");
        return;
    }

    dodajPozycje(kwota, typ);

    // Wyczyszczenie formularza
    document.getElementById('kwota').value = "";
    document.getElementById('typ').value = "dochód";
    });

    // Domyślne dane początkowe (opcjonalnie)
    dodajPozycje(1000, "dochód");
    dodajPozycje(500, "wydatek");
    dodajPozycje(200, "dochód");
    dodajPozycje(350, "wydatek");