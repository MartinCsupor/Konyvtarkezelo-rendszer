let konyvek = [
    new Konyv("Szép új világ", "Aldous Huxley", 1932, 288, "Fantasy"),
    new Konyv("1984", "George Orwell", 1949, 320, "Sci-fi"),
    new Konyv("Pál utcai fiúk", "Molnár Ferenc", 1906, 240, "Regény"),
    new Konyv("Hatalmas Regény", "Molnár János", 1906, 240, "Regény")
]

function Konyv(cim, szerzo, kiadasiEv, oldalszam, kategoria) {
    this.cim = cim
    this.szerzo = szerzo
    this.kiadasiEv = Number(kiadasiEv)
    this.oldalszam = Number(oldalszam)
    this.kategoria = kategoria
    this.kolcsonozve = false
    this.kolcsonoz = () => {
        this.kolcsonozve = true
    }
    this.visszahoz = () => {
        this.kolcsonozve = false
    }
}

document.getElementById("konyvHozzaad").addEventListener("click", () => {
    const cim = document.getElementById("cim").value.trim()
    const szerzo = document.getElementById("szerzo").value.trim()
    const kiadasiEv = document.getElementById("kiadasiEv").value.trim()
    const oldalszam = document.getElementById("oldalszam").value.trim()
    const kategoria = document.getElementById("kategoria").value
    const hozzaadError = document.getElementById("hozzaadError")
    const hozzaadSuccess = document.getElementById("hozzaadSuccess")

    hozzaadError.textContent = ""
    hozzaadSuccess.textContent = ""

    if (cim === "") {
        hozzaadError.textContent = "A cím megadása kötelező!"
        return
    }

    if (szerzo === "") {
        hozzaadError.textContent = "A szerző megadása kötelező!"
        return
    }

    if (kiadasiEv === "") {
        hozzaadError.textContent = "A kiadási év megadása kötelező!"
        return
    }

    if (kategoria === "") {
        hozzaadError.textContent = "A kategória megadása kötelező!"
        return
    }

    if (!/^\d+$/.test(kiadasiEv)) {
        hozzaadError.textContent = "A kiadási év csak szám lehet!"
        return
    }

    if (oldalszam === "") {
        hozzaadError.textContent = "Az oldalszám megadása kötelező!"
        return
    }

    if (!/^\d+$/.test(oldalszam)) {
        hozzaadError.textContent = "Az oldalszám csak szám lehet!"
        return
    }

    konyvek.push(new Konyv(cim, szerzo, kiadasiEv, oldalszam, kategoria))

    hozzaadSuccess.textContent = "Könyv hozzáadva!"
    setTimeout(() => {
        hozzaadSuccess.textContent = ""
    }, 3000);

    document.getElementById("cim").value = ""
    document.getElementById("szerzo").value = ""
    document.getElementById("kiadasiEv").value = ""
    document.getElementById("oldalszam").value = ""
    document.getElementById("kategoria").value = ""

    tablazatFrissites()
    statisztikaFrissites()
})

const tbody = document.getElementById("tbody")


function tablazatFrissites(megjelenitendoKonyv = konyvek) {

    tbody.innerHTML = ""

    if (megjelenitendoKonyv.length == 0) {
        
        const tr = document.createElement("tr")
        const td = document.createElement("td")
        const p = document.createElement("p")

        td.colSpan = 7
        td.className = "px-6 py-10 text-center text-slate-500" 
        p.textContent = "Nincsenek könyvek"
        
        td.appendChild(p)
        tr.appendChild(td)
        tbody.appendChild(tr)
        
        return
    }

    megjelenitendoKonyv.forEach(konyv => {
        const tr = document.createElement("tr")
        const cim = document.createElement("td")
        const szerzo = document.createElement("td")
        const kiadasiEv = document.createElement("td")
        const oldalszam = document.createElement("td")
        const kategoria = document.createElement("td")
        const akcio = document.createElement("td")
        const akcioButton = document.createElement("button")
        const torlesAkcio = document.createElement("td")
        const torlesButton = document.createElement("button")
        tr.className = "border-b border-slate-100 transition hover:bg-slate-50"
        cim.className = "px-6 py-4 font-medium text-slate-900"
        szerzo.className = "px-6 py-4 text-slate-600"
        kiadasiEv.className = "px-6 py-4 text-slate-600"
        oldalszam.className = "px-6 py-4 text-slate-600"
        kategoria.className = "px-6 py-4 text-slate-600"
        akcio.className = "px-6 py-4"
        akcioButton.className = konyv.kolcsonozve
            ? "rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-200"
            : "rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
        torlesAkcio.className = "px-6 py-4"
        torlesButton.className = "rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"

        cim.innerText = konyv.cim
        szerzo.innerText = konyv.szerzo
        kiadasiEv.innerText = konyv.kiadasiEv
        oldalszam.innerText = konyv.oldalszam
        kategoria.innerText = konyv.kategoria
        akcioButton.innerText = konyv.kolcsonozve ? "Visszahozás" : "Kölcsönözés"
        akcioButton.addEventListener("click", () => {
            if (konyv.kolcsonozve) {
                konyv.visszahoz()
                document.getElementById("szabadKonyvek").className = "rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                document.getElementById("osszesKonyv").className = "rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
                document.getElementById("kategoriak").value = ""
            } else {
                konyv.kolcsonoz()
                document.getElementById("szabadKonyvek").className = "rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                document.getElementById("osszesKonyv").className = "rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
                document.getElementById("kategoriak").value = ""
            }
            tablazatFrissites() 
            statisztikaFrissites()
        })
        torlesButton.textContent = "Törlés"
        torlesButton.addEventListener("click", () => {
            const index = konyvek.indexOf(konyv)
            konyvek.splice(index, 1)
            tablazatFrissites()
            statisztikaFrissites()
        })

        akcio.appendChild(akcioButton)
        torlesAkcio.appendChild(torlesButton)
        tr.appendChild(cim)
        tr.appendChild(szerzo)
        tr.appendChild(kiadasiEv)
        tr.appendChild(oldalszam)
        tr.appendChild(kategoria)
        tr.appendChild(akcio)
        tr.appendChild(torlesAkcio)
        tbody.appendChild(tr)
    })
}

document.getElementById("osszesKonyv").addEventListener("click", () => {
    document.getElementById("szabadKonyvek").className = "rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
    document.getElementById("osszesKonyv").className = "rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
    document.getElementById("kategoriak").value = ""
    tablazatFrissites(konyvek)
})

document.getElementById("szabadKonyvek").addEventListener("click", () => {
    const szabadKonyvek = konyvek.filter(konyv => {
        return konyv.kolcsonozve == false
    })
    document.getElementById("szabadKonyvek").className = "rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
    document.getElementById("osszesKonyv").className = "rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
    document.getElementById("kategoriak").value = ""
    tablazatFrissites(szabadKonyvek)
})

document.getElementById("kategoriak").addEventListener("change", () => {
    const valasztott = document.getElementById("kategoriak").value
    if (valasztott == ""){
        tablazatFrissites(konyvek)
        return
    }
    const kategoriaKonyvek = konyvek.filter(konyv => {
        return konyv.kategoria == valasztott
    })
    tablazatFrissites(kategoriaKonyvek)
})

function legregebbiStatisztika() {
    if (konyvek.length == 0) {
        document.getElementById("statisztika").textContent = "Nincsnek könyvek!"
        return
    }
    
    const legregebbiKonyv = konyvek.reduce((konyv, koviKonyv) => {
        return koviKonyv.kiadasiEv < konyv.kiadasiEv ? koviKonyv : konyv
    })
    document.getElementById("statisztika").textContent = `Legrégebbi könyv: ${legregebbiKonyv.cim} - ${legregebbiKonyv.kiadasiEv}`
}
function legvastagabbStatisztika() {  
    if (konyvek.length == 0) {
        document.getElementById("statisztika").textContent = "Nincsnek könyvek!"
        return
    }

    const legvastagabbKonyv = konyvek.reduce((konyv, koviKony) => {
        return koviKony.oldalszam > konyv.oldalszam ? koviKony : konyv
    })
    document.getElementById("statisztika").textContent = `Legvastagabb könyv: ${legvastagabbKonyv.cim} - ${legvastagabbKonyv.oldalszam} oldal`
}
function atlagosStatisztika() {
    if (konyvek.length == 0) {
        document.getElementById("statisztika").textContent = "Nincsnek könyvek!"
        return
    }

    const atlagosOldalszam = (konyvek.reduce((osszeg, konyv) => osszeg + konyv.oldalszam, 0) / konyvek.length).toFixed(0)
    document.getElementById("statisztika").textContent = `Átlagos oldalszám: ${atlagosOldalszam} oldal`
}
function statisztikaFrissites() {
    atlagosStatisztika()
    legvastagabbStatisztika()
    legregebbiStatisztika()
}

document.getElementById("legregebbiKonyv").addEventListener("click", () => {
   legregebbiStatisztika()
})

document.getElementById("legvastagabbKonyv").addEventListener("click", () => {
    legvastagabbStatisztika()
})

document.getElementById("atlagosOldalszam").addEventListener("click", () => {
    atlagosStatisztika()
})

tablazatFrissites(konyvek)
legregebbiStatisztika()