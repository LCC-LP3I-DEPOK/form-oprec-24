 window.onload = function () {

const name = document.getElementById('name');
const major = document.getElementById('major');
const cardnumber = document.getElementById('cardnumber');
const expirationdate = document.getElementById('expirationdate');
const securitycode = document.getElementById('securitycode');
const output = document.getElementById('output');
const ccicon = document.getElementById('ccicon');
const ccsingle = document.getElementById('ccsingle');
const classCode = document.getElementById('class_code');
const nimNumberDisplay = document.getElementById('nimNumber');
// const generatecard = document.getElementById('generatecard');


let cctype = null;

//Mask the Credit Card Number Input
// var cardnumber_mask = new IMask(cardnumber, {
//     mask: [
//         {
//             mask: '0000 0000 0000 0000',  // Format untuk semua mask, menggunakan 4 angka spasi
//             regex: '^3[47]\\d{0,13}',
//             cardtype: 'american express'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
//             cardtype: 'discover'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
//             cardtype: 'diners'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
//             cardtype: 'mastercard'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^(?:2131|1800)\\d{0,11}',
//             cardtype: 'jcb15'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^(?:35\\d{0,2})\\d{0,12}',
//             cardtype: 'jcb'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
//             cardtype: 'maestro'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^4\\d{0,15}',
//             cardtype: 'visa'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             regex: '^62\\d{0,14}',
//             cardtype: 'unionpay'
//         },
//         {
//             mask: '0000 0000 0000 0000',  // Format yang sama di sini
//             cardtype: 'Unknown'
//         }
//     ],
//     dispatch: function (appended, dynamicMasked) {
//         var number = (dynamicMasked.value + appended).replace(/\D/g, '');

//         for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
//             let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
//             if (number.match(re) != null) {
//                 return dynamicMasked.compiledMasks[i];
//             }
//         }
//     }
// });


//Mask the Expiration Date
var expirationdate_mask = new IMask(expirationdate, {
    mask: 'MM{/}YY',
    groups: {
        YY: new IMask.MaskedPattern.Group.Range([0, 99]),
        MM: new IMask.MaskedPattern.Group.Range([0o0, 99]),
    }
});

//Mask the security code
var securitycode_mask = new IMask(securitycode, {
    mask: '0000',
});
 
const swapColor = function (basecolor) {
    document.querySelectorAll('.lightcolor')
        .forEach(function (input) {
            input.setAttribute('class', '');
            input.setAttribute('class', 'lightcolor ' + basecolor);
        });
    document.querySelectorAll('.darkcolor')
        .forEach(function (input) {
            input.setAttribute('class', '');
            input.setAttribute('class', 'darkcolor ' + basecolor + 'dark');
        });
};





//Generate random card number from list of known test numbers
const randomCard = function () {
    let testCards = [
        '4000056655665556',
        '5200828282828210',
        '371449635398431',
        '6011000990139424',
        '30569309025904',
        '3566002020360505',
        '6200000000000005',
        '6759649826438453',
    ];
    let randomNumber = Math.floor(Math.random() * testCards.length);
    cardnumber_mask.unmaskedValue = testCards[randomNumber];
}
// generatecard.addEventListener('click', function () {
//     randomCard();
// });


// CREDIT CARD IMAGE JS
 document.querySelector('.preload').classList.remove('preload');
document.querySelector('.creditcard').addEventListener('click', function () {
    if (this.classList.contains('flipped')) {
        this.classList.remove('flipped');
    } else {
        this.classList.add('flipped');
    }
})

//On Input Change Events
name.addEventListener('input', function () {
    if (name.value.length == 0) {
        document.getElementById('nameMember').innerHTML = '';
        document.getElementById('svgnameback').innerHTML = '';
    } else {
        document.getElementById('nameMember').innerHTML = this.value;
        document.getElementById('svgnameback').innerHTML = this.value;
    }
});

//On Input Change Events
major.addEventListener('input', function () {
    if (major.value.length == 0) {
        document.getElementById('nameMajor').innerHTML = '';
     } else {
        document.getElementById('nameMajor').innerHTML = this.value;
     }
});

var cardnumber_mask = new IMask(cardnumber, {
    mask: '0000000000000000', // Mask tanpa spasi untuk input
});

// Fungsi untuk memformat tampilan card number dengan spasi setiap 4 angka
function formatCardNumber(value) {
    let cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(.{4})/g, '$1 ').trim();
}

cardnumber_mask.on('accept', function () {
    if (cardnumber_mask.value.length == 0) {
        document.getElementById('nimNumber').innerHTML = '';
    } else {
        // Tampilkan card number yang sudah diformat
        document.getElementById('nimNumber').innerHTML = formatCardNumber(cardnumber_mask.value);
    }
});

// Tambahkan event listener untuk class_code
document.getElementById('class_code').addEventListener('input', function () {
    let classCodeValue = this.value;

    // Ambil nilai cardnumber yang sudah ada
    let currentCardNumber = cardnumber_mask.value;

    // Ambil 4 angka dari class_code, hapus 1 angka di depan
    let formattedClassCode = classCodeValue.slice(1, 5); // Ambil 4 angka kedua sampai kelima dari class code

    // Format card number dengan class code di depan
    if (currentCardNumber.length > 0) {
        document.getElementById('nimNumber').innerHTML = formatCardNumber(formattedClassCode + currentCardNumber);
    } else {
        document.getElementById('nimNumber').innerHTML = formatCardNumber(formattedClassCode);
    }
});

expirationdate_mask.on('accept', function () {
    if (expirationdate_mask.value.length == 0) {
        document.getElementById('birthDate').innerHTML = '';
    } else {
        document.getElementById('birthDate').innerHTML = expirationdate_mask.value;
    }
});

securitycode_mask.on('accept', function () {
    if (securitycode_mask.value.length == 0) {
        document.getElementById('svgsecurity').innerHTML = '';
    } else {
        document.getElementById('svgsecurity').innerHTML = securitycode_mask.value;
    }
});

//On Focus Events
name.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
});

cardnumber.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
});

expirationdate.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
});

securitycode.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.add('flipped');
});
};
