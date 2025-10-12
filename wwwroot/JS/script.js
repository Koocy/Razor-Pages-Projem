function zamaniGoster() {
    let d = new Date();
    document.getElementById("saat").textContent = d.toLocaleTimeString();
}

zamaniGoster();
setInterval(zamaniGoster, 1000);

document.getElementById("sayi1").addEventListener('input', () => {
    if (parseInt(document.getElementById("sayi1").value) > document.getElementById("sayi1").max) {
        document.getElementById("sayi1").value = document.getElementById("sayi1").max;
    }

    if (parseInt(document.getElementById("sayi1").value) < document.getElementById("sayi1").min) {
        document.getElementById("sayi1").value = document.getElementById("sayi1").min;
    }
})

document.getElementById("sayi2").addEventListener('input', () => {
    if (parseInt(document.getElementById("sayi2").value) > document.getElementById("sayi2").max) {
        document.getElementById("sayi2").value = document.getElementById("sayi2").max;
    }

    if (parseInt(document.getElementById("sayi2").value) < document.getElementById("sayi2").min) {
        document.getElementById("sayi2").value = document.getElementById("sayi2").min;
    }
})

document.getElementById("sayi1").value = localStorage.getItem("sayi1") || "";
document.getElementById("sayi2").value = localStorage.getItem("sayi2") || "";

function EBOBEKOKHesapla() {
    localStorage.setItem("sayi1", document.getElementById("sayi1").value);
    localStorage.setItem("sayi2", document.getElementById("sayi2").value);

    let iAsaldir = true, ortak1 = false, ortak2 = false;
    const ortaklar = [];

    let birinciSayi = parseInt(document.getElementById("sayi1").value, 10);
    let ikinciSayi = parseInt(document.getElementById("sayi2").value, 10);

    if (isNaN(birinciSayi) || isNaN(ikinciSayi)) {
        alert("Lütfen gerçek sayı girin");
        return;
    }

    let constBS = birinciSayi;
    let constIS = ikinciSayi;

    let i = 2;
    let iArttirildi = false;

    while (i <= birinciSayi || i <= ikinciSayi) {
        if (i > 2 && !iArttirildi) {
            let karekoki = Math.sqrt(i);

            for (let n = 2; n <= karekoki; n++) {
                if (i % n == 0) {
<<<<<<< HEAD
                    isAsal = false;
=======
                    iAsaldir = false;
>>>>>>> main
                    break;
                }
            }
        }

        if (iAsaldir) {
            iArttirildi = false;

            if (birinciSayi % i == 0) {
                birinciSayi = birinciSayi / i;
                ortak1 = true;
            }

            if (ikinciSayi % i == 0) {
                ikinciSayi = ikinciSayi / i;
                ortak2 = true;
            }

            if (ortak1 && ortak2) {
                ortaklar.push(i);
            }
        }

        if (birinciSayi == 1 && ikinciSayi == 1) break;

        if (!ortak1 && !ortak2) {
            i++;
            iArttirildi = true;
        }

        iAsaldir = true; ortak1 = false; ortak2 = false;
    }

    let EBOB = 1;
    for (let z = 0; z < ortaklar.length; z++) {
        EBOB = EBOB * ortaklar[z];
    }

    let EKOK = (constBS / EBOB) * constIS;

    document.getElementById('ebob').innerHTML = EBOB;
    document.getElementById('ekok').innerHTML = EKOK;
}

let sehir = "izmir";

async function havaDurumunuAl() {
    const apiURL = "https://api.weatherapi.com/v1/current.json?q=" + sehir + "&key=8e3a2daa05c44f18974195952253008";

    try {
        let cevap = await fetch(apiURL);
        if (!cevap.ok) throw new Error(cevap.status)
        let veriJSON = await cevap.json();

        const sehirDisplay = document.getElementById("sehirSec").options[document.getElementById("sehirSec").selectedIndex].text;

        const sicaklik = veriJSON.current.temp_c;
        const iconURL = "https:" + veriJSON.current.condition.icon;

        document.getElementById("sehir").textContent = "Şehir: " + sehirDisplay;
        document.getElementById("sicaklik").textContent = "Sıcaklık: " + sicaklik + "°C";
        document.getElementById("icon").src = iconURL;
    }

    catch (error) {
        document.getElementById("sehir").innerHTML = "";
        document.getElementById("sicaklik").innerHTML = "Hava durumu alınamadı.";
        document.getElementById("icon").src = "";

        console.error(error);
    }
}

havaDurumunuAl();

document.getElementById("sehirSec").addEventListener("change", function () {
    sehir = this.value;

    havaDurumunuAl();
});