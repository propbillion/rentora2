/* =====================================================================
   RENTORRA — script.js  (Marketplace edition)
   Data-driven bike marketplace: image sliders, ratings, availability,
   pricing plans, detail + rules accordions, booking, WhatsApp routing,
   FAQ, reviews carousel, geolocation, toast.
   --------------------------------------------------------------------
   ADMIN: To edit inventory, change the BIKES array + RULES below.
   Everything (cards, sliders, pricing, dropdowns, buttons) auto-populates.
   ===================================================================== */
(function(){
"use strict";

/* ---------- CONFIG ---------- */
var WA   = "918888978552";          // WhatsApp (no +)
var TEL  = "+918888978552";         // Call number
var GENERIC = "Hi Rentorra! \uD83D\uDC4B I want to rent a bike. Can you share availability and pricing?";

/* ---------- SVG ICONS ---------- */
var ICON = {
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
  call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  caretL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  caretR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  km:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  fuel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h12V4a2 2 0 00-2-2H5a2 2 0 00-2 2v18z"/><path d="M15 8h2a2 2 0 012 2v6a2 2 0 002 2 2 2 0 002-2V9.83a2 2 0 00-.59-1.42L19 5"/></svg>',
  deposit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>'
};

var $  = function(s,c){return (c||document).querySelector(s);};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

/* ---------- WHATSAPP HELPERS ---------- */
function waLink(msg){ return "https://wa.me/"+WA+"?text="+encodeURIComponent(msg); }
function openWA(msg){ window.open(waLink(msg),"_blank"); }

/* ---------- CITIES ---------- */
var CITIES = ["Pune","Lonavala","Mahabaleshwar","Mumbai","Goa"];

/* =====================================================================
   BIKE INVENTORY  (admin-editable single source of truth)
   ===================================================================== */
var BIKES = [
  {
    "slug": "activa23",
    "name": "Honda Activa",
    "brand": "Honda",
    "year": 2023,
    "cat": "Scooter",
    "imgs": [
      "activa-blue",
      "activa-grey",
      "activa-red"
    ],
    "rating": 4.9,
    "reviews": 682,
    "locations": [
      "Wakad",
      "Baner",
      "Hinjawadi"
    ],
    "daily": 499,
    "weekly": 2299,
    "half": 3799,
    "monthly": 6999,
    "deposit": 1000,
    "km": "100 KM/Day",
    "extra_km": "Rs 6/KM",
    "fuel": "Fuel excluded",
    "cc": "110cc",
    "trans": "Automatic",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "activa22",
    "name": "Honda Activa",
    "brand": "Honda",
    "year": 2022,
    "cat": "Scooter",
    "imgs": [
      "activa-grey",
      "activa-blue",
      "activa-red"
    ],
    "rating": 4.8,
    "reviews": 574,
    "locations": [
      "Wakad",
      "Wagholi"
    ],
    "daily": 479,
    "weekly": 2199,
    "half": 3699,
    "monthly": 6799,
    "deposit": 1000,
    "km": "100 KM/Day",
    "extra_km": "Rs 6/KM",
    "fuel": "Fuel excluded",
    "cc": "110cc",
    "trans": "Automatic",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "activa21",
    "name": "Honda Activa",
    "brand": "Honda",
    "year": 2021,
    "cat": "Scooter",
    "imgs": [
      "activa-red",
      "activa-blue",
      "activa-grey"
    ],
    "rating": 4.7,
    "reviews": 521,
    "locations": [
      "Baner",
      "Viman Nagar"
    ],
    "daily": 459,
    "weekly": 2099,
    "half": 3599,
    "monthly": 6599,
    "deposit": 1000,
    "km": "100 KM/Day",
    "extra_km": "Rs 6/KM",
    "fuel": "Fuel excluded",
    "cc": "110cc",
    "trans": "Automatic",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "jupiter22",
    "name": "TVS Jupiter",
    "brand": "TVS",
    "year": 2022,
    "cat": "Scooter",
    "imgs": [
      "jupiter-grey",
      "jupiter-blue",
      "jupiter-teal"
    ],
    "rating": 4.8,
    "reviews": 498,
    "locations": [
      "Wakad",
      "Hinjawadi"
    ],
    "daily": 469,
    "weekly": 2149,
    "half": 3649,
    "monthly": 6699,
    "deposit": 1000,
    "km": "100 KM/Day",
    "extra_km": "Rs 6/KM",
    "fuel": "Fuel excluded",
    "cc": "110cc",
    "trans": "Automatic",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "jupiter21",
    "name": "TVS Jupiter",
    "brand": "TVS",
    "year": 2021,
    "cat": "Scooter",
    "imgs": [
      "jupiter-blue",
      "jupiter-grey",
      "jupiter-teal"
    ],
    "rating": 4.6,
    "reviews": 456,
    "locations": [
      "Wagholi",
      "Baner"
    ],
    "daily": 449,
    "weekly": 2049,
    "half": 3549,
    "monthly": 6499,
    "deposit": 1000,
    "km": "100 KM/Day",
    "extra_km": "Rs 6/KM",
    "fuel": "Fuel excluded",
    "cc": "110cc",
    "trans": "Automatic",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "jupiter20",
    "name": "TVS Jupiter",
    "brand": "TVS",
    "year": 2020,
    "cat": "Scooter",
    "imgs": [
      "jupiter-teal",
      "jupiter-blue",
      "jupiter-grey"
    ],
    "rating": 4.6,
    "reviews": 432,
    "locations": [
      "Viman Nagar"
    ],
    "daily": 429,
    "weekly": 1999,
    "half": 3499,
    "monthly": 6399,
    "deposit": 1000,
    "km": "100 KM/Day",
    "extra_km": "Rs 6/KM",
    "fuel": "Fuel excluded",
    "cc": "110cc",
    "trans": "Automatic",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "jawa42",
    "name": "Jawa 42",
    "brand": "Jawa",
    "year": 2021,
    "cat": "Cruiser",
    "imgs": [
      "jawa",
      "jawa",
      "jawa"
    ],
    "rating": 4.9,
    "reviews": 724,
    "locations": [
      "Wakad",
      "Baner"
    ],
    "daily": 999,
    "weekly": 4999,
    "half": 8499,
    "monthly": 14999,
    "deposit": 3000,
    "km": "150 KM/Day",
    "extra_km": "Rs 8/KM",
    "fuel": "Fuel excluded",
    "cc": "293cc",
    "trans": "Manual",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "duke200",
    "name": "KTM Duke 200",
    "brand": "KTM",
    "year": 2022,
    "cat": "Sports",
    "imgs": [
      "duke",
      "duke",
      "duke"
    ],
    "rating": 4.8,
    "reviews": 611,
    "locations": [
      "Hinjawadi",
      "Baner"
    ],
    "daily": 1099,
    "weekly": 5499,
    "half": 8999,
    "monthly": 15999,
    "deposit": 3000,
    "km": "150 KM/Day",
    "extra_km": "Rs 8/KM",
    "fuel": "Fuel excluded",
    "cc": "199cc",
    "trans": "Manual",
    "available": true,
    "status": "",
    "note": ""
  },
  {
    "slug": "harley",
    "name": "Harley Davidson Iron 883",
    "brand": "Harley-Davidson",
    "year": 2021,
    "cat": "Cruiser",
    "imgs": [
      "harley",
      "harley"
    ],
    "rating": 5.0,
    "reviews": 812,
    "locations": [
      "Baner"
    ],
    "daily": 2499,
    "weekly": 12999,
    "half": 21999,
    "monthly": 38999,
    "deposit": 15000,
    "km": "120 KM/Day",
    "extra_km": "Rs 20/KM",
    "fuel": "Fuel excluded",
    "cc": "883cc",
    "trans": "Manual",
    "available": false,
    "status": "Long-Term Rental",
    "note": ""
  },
  {
    "slug": "ninja300",
    "name": "Kawasaki Ninja 300",
    "brand": "Kawasaki",
    "year": 2020,
    "cat": "Sports",
    "imgs": [
      "ninja",
      "ninja"
    ],
    "rating": 4.9,
    "reviews": 678,
    "locations": [
      "Hinjawadi"
    ],
    "daily": 1899,
    "weekly": 9499,
    "half": 15999,
    "monthly": 28999,
    "deposit": 10000,
    "km": "120 KM/Day",
    "extra_km": "Rs 15/KM",
    "fuel": "Fuel excluded",
    "cc": "296cc",
    "trans": "Manual",
    "available": false,
    "status": "Already Booked",
    "note": ""
  },
  {
    "slug": "rc390",
    "name": "KTM RC 390",
    "brand": "KTM",
    "year": 2021,
    "cat": "Sports",
    "imgs": [
      "rc390",
      "rc390"
    ],
    "rating": 4.8,
    "reviews": 592,
    "locations": [
      "Baner"
    ],
    "daily": 1799,
    "weekly": 8999,
    "half": 14999,
    "monthly": 26999,
    "deposit": 10000,
    "km": "120 KM/Day",
    "extra_km": "Rs 15/KM",
    "fuel": "Fuel excluded",
    "cc": "373cc",
    "trans": "Manual",
    "available": false,
    "status": "Already Booked",
    "note": ""
  },
  {
    "slug": "g310r",
    "name": "BMW G310R",
    "brand": "BMW",
    "year": 2021,
    "cat": "Sports",
    "imgs": [
      "g310r",
      "g310r"
    ],
    "rating": 4.9,
    "reviews": 534,
    "locations": [
      "Wakad"
    ],
    "daily": 1699,
    "weekly": 8499,
    "half": 13999,
    "monthly": 25999,
    "deposit": 10000,
    "km": "120 KM/Day",
    "extra_km": "Rs 14/KM",
    "fuel": "Fuel excluded",
    "cc": "313cc",
    "trans": "Manual",
    "available": false,
    "status": "Long-Term Rental",
    "note": ""
  },
  {
    "slug": "dominar",
    "name": "Bajaj Dominar 400",
    "brand": "Bajaj",
    "year": 2022,
    "cat": "Sports",
    "imgs": [
      "dominar",
      "dominar"
    ],
    "rating": 4.7,
    "reviews": 489,
    "locations": [
      "Hinjawadi"
    ],
    "daily": 1299,
    "weekly": 6499,
    "half": 10999,
    "monthly": 18999,
    "deposit": 8000,
    "km": "120 KM/Day",
    "extra_km": "Rs 12/KM",
    "fuel": "Fuel excluded",
    "cc": "373cc",
    "trans": "Manual",
    "available": false,
    "status": "Already Booked",
    "note": ""
  },
  {
    "slug": "benelli",
    "name": "Benelli 302R",
    "brand": "Benelli",
    "year": 2020,
    "cat": "Sports",
    "imgs": [
      "benelli",
      "benelli"
    ],
    "rating": 4.7,
    "reviews": 445,
    "locations": [
      "Baner"
    ],
    "daily": 1599,
    "weekly": 7999,
    "half": 12999,
    "monthly": 23999,
    "deposit": 10000,
    "km": "120 KM/Day",
    "extra_km": "Rs 14/KM",
    "fuel": "Fuel excluded",
    "cc": "300cc",
    "trans": "Manual",
    "available": false,
    "status": "Long-Term Rental",
    "note": ""
  },
  {
    "slug": "interceptor",
    "name": "Royal Enfield Interceptor 650",
    "brand": "Royal Enfield",
    "year": 2022,
    "cat": "Cruiser",
    "imgs": [
      "interceptor",
      "interceptor"
    ],
    "rating": 4.9,
    "reviews": 701,
    "locations": [
      "Wakad",
      "Baner"
    ],
    "daily": 1499,
    "weekly": 7499,
    "half": 12499,
    "monthly": 21999,
    "deposit": 8000,
    "km": "120 KM/Day",
    "extra_km": "Rs 12/KM",
    "fuel": "Fuel excluded",
    "cc": "648cc",
    "trans": "Manual",
    "available": false,
    "status": "Already Booked",
    "note": ""
  },
  {
    "slug": "gt650",
    "name": "Royal Enfield Continental GT 650",
    "brand": "Royal Enfield",
    "year": 2022,
    "cat": "Cruiser",
    "imgs": [
      "gt650",
      "gt650"
    ],
    "rating": 4.8,
    "reviews": 623,
    "locations": [
      "Baner"
    ],
    "daily": 1499,
    "weekly": 7499,
    "half": 12499,
    "monthly": 21999,
    "deposit": 8000,
    "km": "120 KM/Day",
    "extra_km": "Rs 12/KM",
    "fuel": "Fuel excluded",
    "cc": "648cc",
    "trans": "Manual",
    "available": false,
    "status": "Long-Term Rental",
    "note": ""
  },
  {
    "slug": "himalayan",
    "name": "Royal Enfield Himalayan",
    "brand": "Royal Enfield",
    "year": 2022,
    "cat": "Adventure",
    "imgs": [
      "himalayan",
      "himalayan"
    ],
    "rating": 4.9,
    "reviews": 756,
    "locations": [
      "Hinjawadi",
      "Baner"
    ],
    "daily": 1399,
    "weekly": 6999,
    "half": 11999,
    "monthly": 20999,
    "deposit": 8000,
    "km": "150 KM/Day",
    "extra_km": "Rs 10/KM",
    "fuel": "Fuel excluded",
    "cc": "411cc",
    "trans": "Manual",
    "available": false,
    "status": "Already Booked",
    "note": ""
  },
  {
    "slug": "rr310",
    "name": "TVS Apache RR310",
    "brand": "TVS",
    "year": 2021,
    "cat": "Sports",
    "imgs": [
      "rr310",
      "rr310"
    ],
    "rating": 4.8,
    "reviews": 567,
    "locations": [
      "Wakad"
    ],
    "daily": 1399,
    "weekly": 6999,
    "half": 11499,
    "monthly": 20999,
    "deposit": 8000,
    "km": "120 KM/Day",
    "extra_km": "Rs 12/KM",
    "fuel": "Fuel excluded",
    "cc": "312cc",
    "trans": "Manual",
    "available": false,
    "status": "Long-Term Rental",
    "note": ""
  },
  {
    "slug": "r15",
    "name": "Yamaha R15 V4",
    "brand": "Yamaha",
    "year": 2022,
    "cat": "Sports",
    "imgs": [
      "r15",
      "r15"
    ],
    "rating": 4.8,
    "reviews": 689,
    "locations": [
      "Hinjawadi"
    ],
    "daily": 999,
    "weekly": 4999,
    "half": 8499,
    "monthly": 14999,
    "deposit": 6000,
    "km": "120 KM/Day",
    "extra_km": "Rs 10/KM",
    "fuel": "Fuel excluded",
    "cc": "155cc",
    "trans": "Manual",
    "available": false,
    "status": "Already Booked",
    "note": ""
  }
];

/* Common rental rules (apply to all bikes) */
var RULES = [
  "Original Aadhaar Card and Original Driving License mandatory at pickup.",
  "All original documents must be presented at the time of pickup.",
  "Fuel charges are not included in the security deposit or rent.",
  "Security deposit is refundable; settled within 30 minutes after return.",
  "Vehicle damage is chargeable as per the Authorised Service Center.",
  "Helmet damage is chargeable to the customer.",
  "Speed limits: non-gear 60 km/h, gear 90 km/h. Each violation = Rs 1000 fine.",
  "Complimentary helmet for the first day only; extra days chargeable.",
  "Immediate cancellation will not be entertained.",
  "Any proceeding hour will be considered a full day.",
  "You receive a clean bike; return it in the same clean condition.",
  "We do not provide cheap or unsafe complimentary helmets.",
  "Working professional proof + residential proof required.",
  "Late return: Rs 200 per hour, considering impact on subsequent bookings.",
  "Out-of-state transport of the vehicle is not allowed."
];

/* ---------- REVIEWS (carousel) ---------- */
var REVIEWS = [
  {n:"Aniket P.",p:"Pune",t:"Bike was spotless and delivered right to my hostel gate. Booking on WhatsApp took literally a minute. Best rental experience in Pune, hands down."},
  {n:"Sneha K.",p:"Lonavala trip",t:"Took a Jawa 42 for the ghats. Engine was perfectly tuned, helmet included, and they personally called to confirm. Felt completely safe."},
  {n:"Rohan M.",p:"Mumbai",t:"No hidden charges at all \u2014 exactly the price shown on the site. Picked up and dropped on time. Will rent again for sure."},
  {n:"Priya D.",p:"Goa",t:"Honestly thought it was too good. Scooter was new, sanitised, and the support number actually picked up at night. 10/10 trust."},
  {n:"Karan S.",p:"Pune",t:"The Duke they gave me was a beast \u2014 fully serviced, clean, ready. Smooth from booking to return. Deposit refunded in 30 minutes."},
  {n:"Tejas V.",p:"Pune",t:"Switched from another rental after one bad experience. Rentorra is on another level \u2014 clean bikes, real humans, zero drama."},
  {n:"Megha R.",p:"Lonavala",t:"Loved that everything happens on WhatsApp. Sent details, got a call back in 5 mins, bike at my door in an hour. Magic."},
  {n:"Faizan A.",p:"Mumbai",t:"Transparent, fast, and genuinely premium feeling. The helmet was new and the bike had a full safety check. Impressed."}
];

/* ---------- TOAST ---------- */
var toastEl, toastTimer;
function toast(msg){
  if(!toastEl){ toastEl=document.createElement("div"); toastEl.className="toast"; document.body.appendChild(toastEl); }
  toastEl.innerHTML=ICON.info+"<span>"+msg+"</span>";
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){toastEl.classList.remove("show");},3400);
}

/* ---------- HEADER SHRINK ---------- */
var hdr=$("#hdr");
window.addEventListener("scroll",function(){ if(hdr) hdr.classList.toggle("shrink",window.scrollY>30); },{passive:true});

/* ---------- MOBILE MENU ---------- */
var nav=$("#nav"), burger=$("#burger");
if(burger){ burger.addEventListener("click",function(){nav.classList.toggle("mob-open");}); }
$$(".mob-menu a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("mob-open");});});

/* ---------- SCROLL REVEAL ---------- */
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
},{threshold:.10});
function observeReveals(scope){ $$(".reveal",scope).forEach(function(el,i){ el.style.transitionDelay=((i%3)*55)+"ms"; io.observe(el); }); }

/* ---------- DATE HELPERS ---------- */
function fmt(d){ return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16); }
function prettyDT(v){ if(!v) return "\u2014"; var d=new Date(v); return d.toLocaleDateString("en-IN",{day:"numeric",month:"short"})+", "+d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}); }
function money(n){ return "\u20B9"+Number(n).toLocaleString("en-IN"); }

/* ---------- BOOKING WIDGET ---------- */
var fCity,fType,fStart,fEnd,bkBtn,bkNote;
function initBookingWidget(){
  fCity=$("#f-city"); fType=$("#f-type"); fStart=$("#f-start"); fEnd=$("#f-end");
  bkBtn=$("#bk-btn"); bkNote=$("#bk-note");
  var now=new Date(); now.setHours(now.getHours()+2,0,0,0);
  var later=new Date(now); later.setDate(later.getDate()+1);
  fStart.min=fmt(new Date()); fStart.value=fmt(now);
  fEnd.min=fmt(now); fEnd.value=fmt(later);
  [fCity,fType,fStart,fEnd].forEach(function(e){ e.addEventListener("change",checkBooking); });
  [fStart,fEnd].forEach(function(e){ e.addEventListener("input",checkBooking); });
  bkBtn.addEventListener("click",function(){ if(checkBooking()) openModal({bike:fType.value||"Any bike",city:fCity.value}); });
  checkBooking();
}
function durationLabel(){
  if(!fStart) return null;
  var a=new Date(fStart.value),b=new Date(fEnd.value);
  if(isNaN(a)||isNaN(b)||b<=a) return null;
  var hrs=Math.round((b-a)/3600000);
  if(hrs<24) return hrs+" hr"+(hrs>1?"s":"");
  var d=Math.floor(hrs/24),h=hrs%24;
  return d+" day"+(d>1?"s":"")+(h?(" "+h+" hr"):"");
}
function checkBooking(){
  var ok=fCity.value && fStart.value && fEnd.value && (new Date(fEnd.value)>new Date(fStart.value));
  var dur=durationLabel();
  if(ok){
    bkBtn.classList.add("live"); bkBtn.innerHTML=ICON.wa+" Book now"+(dur?(" \u00b7 "+dur):"");
    bkNote.classList.add("ok"); bkNote.innerHTML=ICON.check+" Ready to book \u2014 tap to confirm on WhatsApp";
  }else{
    bkBtn.classList.remove("live"); bkBtn.innerHTML="Select details to continue";
    bkNote.classList.remove("ok"); bkNote.innerHTML=ICON.info+" Fill the details to unlock booking";
  }
  return ok;
}

/* =====================================================================
   FLEET / MARKETPLACE RENDER
   ===================================================================== */
function starHTML(rating){
  var full=Math.floor(rating), half=(rating-full)>=0.5, html="";
  for(var i=0;i<5;i++){
    if(i<full) html+='<span class="s on">'+ICON.star+'</span>';
    else if(i===full && half) html+='<span class="s half">'+ICON.star+ICON.star+'</span>';
    else html+='<span class="s">'+ICON.star+'</span>';
  }
  return html;
}
function bikeImg(slug){ return "assets/bikes/"+slug+".svg"; }

function sliderHTML(b){
  var slides=b.imgs.map(function(s,i){
    return '<div class="slide"><img src="'+bikeImg(s)+'" alt="'+b.name+' view '+(i+1)+'" loading="lazy"></div>';
  }).join("");
  var dots=b.imgs.map(function(_,i){ return '<button class="dot'+(i===0?" on":"")+'" data-i="'+i+'" aria-label="Image '+(i+1)+'"></button>'; }).join("");
  var arrows = b.imgs.length>1 ?
    ('<button class="snav prev" aria-label="Previous">'+ICON.caretL+'</button><button class="snav next" aria-label="Next">'+ICON.caretR+'</button>') : "";
  return '<div class="slider" data-n="'+b.imgs.length+'">'+
           '<div class="track">'+slides+'</div>'+
           arrows+
           (b.imgs.length>1?('<div class="dots">'+dots+'</div>'):"")+
         '</div>';
}

function detailsRows(b){
  var rows=[
    ["Brand", b.brand], ["Model year", b.year], ["Engine", b.cc], ["Transmission", b.trans],
    ["Fuel policy", b.fuel], ["Included KM", b.km], ["Extra KM charge", b.extra_km],
    ["Security deposit", money(b.deposit)+" (refundable)"],
    ["Daily rent", money(b.daily)], ["Weekly rent", money(b.weekly)],
    ["15-day rent", money(b.half)], ["Monthly rent", money(b.monthly)],
    ["Available at", b.locations.join(", ")]
  ];
  return rows.map(function(r){ return '<div class="dl-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'; }).join("");
}
function rulesHTML(){
  return '<ul class="rules">'+RULES.map(function(r){ return '<li>'+ICON.check+'<span>'+r+'</span></li>'; }).join("")+'</ul>';
}

function cardHTML(b){
  var avail=b.available;
  var badge = avail
    ? '<span class="avail on">\u25CF Available Now</span>'
    : '<span class="avail off">\u25CF '+(b.status||"Currently Unavailable")+'</span>';
  var locs=b.locations.map(function(l){ return '<span class="loc-chip">'+l+'</span>'; }).join("");
  var bookBtn = avail
    ? '<button class="card-book" data-slug="'+b.slug+'">'+ICON.wa+' Book Now</button>'
    : '<button class="card-book dis" disabled title="This bike is currently booked for an extended rental period.">'+ICON.lock+' Currently Unavailable</button>';

  return '<article class="mcard reveal'+(avail?"":" unavail")+'" data-cat="'+b.cat+'" data-avail="'+(avail?1:0)+'">'+
    '<div class="mcard-top">'+ badge + sliderHTML(b) +'</div>'+
    '<div class="mcard-body">'+
      '<div class="mc-head">'+
        '<h3>'+b.name+'</h3>'+
        '<span class="yr">'+b.year+'</span>'+
      '</div>'+
      '<div class="mc-rate">'+
        '<span class="stars">'+starHTML(b.rating)+'</span>'+
        '<b>'+b.rating.toFixed(1)+'</b>'+
        '<small>('+b.reviews+" reviews)"+'</small>'+
      '</div>'+
      '<div class="mc-loc"><span class="pin">'+ICON.pin+'</span><span class="loc-label">Available at</span>'+locs+'</div>'+
      '<div class="mc-price">'+
        '<div class="pcell"><small>Daily</small><b>'+money(b.daily)+'</b></div>'+
        '<div class="pcell"><small>Weekly</small><b>'+money(b.weekly)+'</b></div>'+
        '<div class="pcell"><small>15 Days</small><b>'+money(b.half)+'</b></div>'+
        '<div class="pcell"><small>Monthly</small><b>'+money(b.monthly)+'</b></div>'+
      '</div>'+
      '<div class="mc-strip">'+
        '<span>'+ICON.km+' '+b.km+'</span>'+
        '<span>'+ICON.fuel+' '+b.fuel+'</span>'+
        '<span>'+ICON.deposit+' Deposit '+money(b.deposit)+'</span>'+
        '<span>'+ICON.cal+' '+b.year+' model</span>'+
      '</div>'+
      '<div class="acc">'+
        '<button class="acc-h" data-acc="details">'+'<span>Bike details</span>'+ICON.chev+'</button>'+
        '<div class="acc-c"><div class="dl">'+detailsRows(b)+'</div></div>'+
      '</div>'+
      '<div class="acc">'+
        '<button class="acc-h" data-acc="rules">'+'<span>Rules &amp; regulations</span>'+ICON.chev+'</button>'+
        '<div class="acc-c">'+rulesHTML()+'</div>'+
      '</div>'+
      bookBtn +
    '</div>'+
  '</article>';
}

function sortedBikes(){
  // available first (by rating desc), then unavailable (by rating desc)
  return BIKES.slice().sort(function(a,b){
    if(a.available!==b.available) return a.available? -1: 1;
    return b.rating - a.rating;
  });
}

function renderFleet(){
  var grid=$("#fleet-grid"); if(!grid) return;
  var html = sortedBikes().map(cardHTML).join("");
  html += '<div class="fleet-empty" id="fleet-empty">No bikes in this category right now \u2014 tap \u201CBike Near Me\u201D and we\u2019ll arrange one.</div>';
  grid.innerHTML=html;
  wireCards(grid);
  observeReveals(grid);
}

function wireCards(grid){
  // sliders
  $$(".slider",grid).forEach(initSlider);
  // accordions
  $$(".acc-h",grid).forEach(function(btn){
    btn.addEventListener("click",function(){
      var acc=btn.closest(".acc"), c=$(".acc-c",acc);
      var open=acc.classList.contains("open");
      acc.classList.toggle("open",!open);
      c.style.maxHeight = open? null : (c.scrollHeight+"px");
    });
  });
  // book buttons
  $$(".card-book",grid).forEach(function(btn){
    if(btn.classList.contains("dis")) return;
    btn.addEventListener("click",function(){
      var slug=btn.getAttribute("data-slug");
      var b=BIKES.filter(function(x){return x.slug===slug;})[0];
      if(!b) return;
      openModal({
        bike:b.name+" ("+b.year+")",
        city:(fCity&&fCity.value)|| b.locations[0] ||"",
        price:money(b.daily)+"/day \u00b7 "+money(b.weekly)+"/wk",
        extra:"Deposit "+money(b.deposit)+" \u00b7 "+b.km+" \u00b7 "+b.extra_km
      });
    });
  });
}

/* ---------- IMAGE SLIDER (swipe + arrows + dots) ---------- */
function initSlider(sl){
  var n=parseInt(sl.getAttribute("data-n"),10);
  if(n<=1) return;
  var track=$(".track",sl), dots=$$(".dot",sl), idx=0;
  function go(i){
    idx=(i+n)%n;
    track.style.transform="translateX("+(-idx*100)+"%)";
    dots.forEach(function(d,j){ d.classList.toggle("on",j===idx); });
  }
  var prev=$(".prev",sl), next=$(".next",sl);
  if(prev) prev.addEventListener("click",function(e){e.stopPropagation();go(idx-1);});
  if(next) next.addEventListener("click",function(e){e.stopPropagation();go(idx+1);});
  dots.forEach(function(d){ d.addEventListener("click",function(e){e.stopPropagation();go(parseInt(d.getAttribute("data-i"),10));}); });
  // touch / pointer swipe
  var sx=0,dx=0,down=false;
  sl.addEventListener("pointerdown",function(e){down=true;sx=e.clientX;dx=0;track.style.transition="none";});
  sl.addEventListener("pointermove",function(e){
    if(!down)return; dx=e.clientX-sx;
    track.style.transform="translateX(calc("+(-idx*100)+"% + "+dx+"px))";
  });
  function up(){
    if(!down)return; down=false; track.style.transition="";
    if(Math.abs(dx)>45){ go(dx<0? idx+1 : idx-1); } else { go(idx); }
  }
  sl.addEventListener("pointerup",up);
  sl.addEventListener("pointercancel",up);
  sl.addEventListener("pointerleave",function(){ if(down) up(); });
  go(0);
}

/* ---------- FILTERS ---------- */
function initFilters(){
  $$(".chip").forEach(function(chip){
    chip.addEventListener("click",function(){
      $$(".chip").forEach(function(c){c.classList.remove("active");});
      chip.classList.add("active");
      var f=chip.getAttribute("data-cat"), visible=0;
      $$(".mcard").forEach(function(card){
        var show;
        if(f==="all") show=true;
        else if(f==="available") show=card.getAttribute("data-avail")==="1";
        else show=card.getAttribute("data-cat")===f;
        card.classList.toggle("hide",!show);
        if(show) visible++;
      });
      var empty=$("#fleet-empty"); if(empty) empty.style.display=visible?"none":"block";
    });
  });
}

/* ---------- REVIEWS ---------- */
function renderReviews(){
  var track=$("#rev-track"); if(!track) return;
  track.innerHTML = REVIEWS.concat(REVIEWS).map(function(r){
    var parts=r.n.replace("."," ").split(" ").filter(Boolean);
    var initials=(parts[0][0]+(parts[1]?parts[1][0]:"")).toUpperCase();
    return '<div class="rev"><div class="stars">\u2605\u2605\u2605\u2605\u2605</div><q>'+r.t+'</q>'+
      '<div class="who"><div class="av">'+initials+'</div><div><b>'+r.n+'</b><small>'+r.p+'</small></div>'+
      '<span class="vfy">'+ICON.check+' Verified</span></div></div>';
  }).join("");
  var mask=$("#rev-mask"); var down=false,startX=0,scl=0;
  mask.addEventListener("pointerdown",function(e){down=true;startX=e.clientX;scl=mask.scrollLeft;track.classList.add("paused");mask.classList.add("drag");try{mask.setPointerCapture(e.pointerId);}catch(_){}}); 
  mask.addEventListener("pointermove",function(e){if(!down)return;mask.scrollLeft=scl-(e.clientX-startX);});
  function end(){down=false;mask.classList.remove("drag");setTimeout(function(){track.classList.remove("paused");},1200);}
  mask.addEventListener("pointerup",end); mask.addEventListener("pointercancel",end);
  mask.addEventListener("mouseenter",function(){track.classList.add("paused");});
  mask.addEventListener("mouseleave",function(){if(!down)track.classList.remove("paused");});
}

/* ---------- FAQ ---------- */
function initFAQ(){
  $$(".qa button").forEach(function(btn){
    btn.addEventListener("click",function(){
      var qa=btn.closest(".qa"), ans=$(".ans",qa), isOpen=qa.classList.contains("open");
      $$(".qa.open").forEach(function(o){ if(o!==qa){o.classList.remove("open");$(".ans",o).style.maxHeight=null;} });
      qa.classList.toggle("open",!isOpen);
      ans.style.maxHeight=isOpen?null:(ans.scrollHeight+"px");
    });
  });
}

/* ---------- PLANS ---------- */
function initPlans(){
  $$(".plan .pbtn").forEach(function(btn){
    btn.addEventListener("click",function(){
      openWA("Hi Rentorra! \uD83D\uDC4B I\u2019m interested in the *"+btn.getAttribute("data-plan")+"* plan. Please share availability and bikes covered.");
    });
  });
}

/* ---------- ROUTES ---------- */
function initRoutes(){
  $$(".route .rbtn").forEach(function(btn){
    btn.addEventListener("click",function(){
      openWA("Hi Rentorra! \uD83C\uDFCD\uFE0F I want to plan a ride to *"+btn.getAttribute("data-route")+"*. Which bikes do you recommend and what\u2019s the rental cost?");
    });
  });
}

/* ---------- BOOKING MODAL ---------- */
var modal,mName,mPhone,mCity,mSummary,mSend,bookingCtx={};
function initModal(){
  modal=$("#modal"); mName=$("#m-name"); mPhone=$("#m-phone"); mCity=$("#m-city");
  mSummary=$("#m-summary"); mSend=$("#m-send");
  modal.addEventListener("click",function(e){ if(e.target===modal) closeModal(); });
  $("#m-close").addEventListener("click",closeModal);
  mName.addEventListener("input",checkModal);
  mSend.addEventListener("click",sendBooking);
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") closeModal(); });
}
function openModal(ctx){
  bookingCtx=ctx||{};
  mCity.value=bookingCtx.city||(fCity?fCity.value:"")||"\u2014";
  var dur=durationLabel()||"\u2014";
  mSummary.innerHTML=
    '<div class="ln"><span>Bike</span><b>'+(bookingCtx.bike||(fType?fType.value:"")||"Any bike")+'</b></div>'+
    '<div class="ln"><span>City</span><b>'+(bookingCtx.city||(fCity?fCity.value:"")||"\u2014")+'</b></div>'+
    '<div class="ln"><span>Pick-up</span><b>'+prettyDT(fStart?fStart.value:"")+'</b></div>'+
    '<div class="ln"><span>Drop-off</span><b>'+prettyDT(fEnd?fEnd.value:"")+'</b></div>'+
    '<div class="ln"><span>Duration</span><b>'+dur+'</b></div>'+
    (bookingCtx.price?('<div class="ln"><span>Rate</span><b>'+bookingCtx.price+'</b></div>'):"")+
    (bookingCtx.extra?('<div class="ln"><span>Terms</span><b>'+bookingCtx.extra+'</b></div>'):"");
  modal.classList.add("open"); document.body.style.overflow="hidden"; checkModal();
}
function closeModal(){ modal.classList.remove("open"); document.body.style.overflow=""; }
function checkModal(){
  var ok=mName.value.trim().length>1;
  if(ok){ mSend.classList.add("live"); mSend.innerHTML=ICON.wa+" Send booking to WhatsApp"; }
  else  { mSend.classList.remove("live"); mSend.innerHTML="Add your name to continue"; }
}
function sendBooking(){
  if(mName.value.trim().length<2) return;
  var dur=durationLabel()||"\u2014", c=bookingCtx;
  var msg="\uD83C\uDFCD\uFE0F *New Bike Booking \u2014 Rentorra*\n\n"+
    "*Name:* "+mName.value.trim()+"\n"+
    (mPhone.value.trim()?("*Phone:* "+mPhone.value.trim()+"\n"):"")+
    "*Bike:* "+(c.bike||(fType?fType.value:"")||"Any bike")+"\n"+
    "*City:* "+(c.city||(fCity?fCity.value:"")||"\u2014")+"\n"+
    "*Pick-up:* "+prettyDT(fStart?fStart.value:"")+"\n"+
    "*Drop-off:* "+prettyDT(fEnd?fEnd.value:"")+"\n"+
    "*Duration:* "+dur+"\n"+
    (c.price?("*Rate:* "+c.price+"\n"):"")+
    (c.extra?("*Terms:* "+c.extra+"\n"):"")+
    "\nPlease confirm availability and call me back. \uD83D\uDE4F";
  openWA(msg);
}

/* ---------- STATIC LINKS ---------- */
function wireStaticLinks(){
  ["final-cta","foot-wa","foot-wa2","nav-cta"].forEach(function(id){ var e=$("#"+id); if(e) e.href=waLink(GENERIC); });
  var call=$("#ab-call"); if(call) call.href="tel:"+TEL;
  var footCall=$("#foot-call"); if(footCall) footCall.href="tel:"+TEL;
  var abWa=$("#ab-wa"); if(abWa){ abWa.addEventListener("click",function(e){e.preventDefault();openWA(GENERIC);}); }
}

/* ---------- GEOLOCATION ---------- */
var CITY_GEO={ "Pune":[18.5204,73.8567],"Lonavala":[18.7546,73.4062],"Mahabaleshwar":[17.9307,73.6477],"Mumbai":[19.0760,72.8777],"Goa":[15.2993,74.1240] };
function haversine(a,b,c,d){ var R=6371,dLat=(c-a)*Math.PI/180,dLon=(d-b)*Math.PI/180; var x=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2); return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)); }
function nearestCity(lat,lng){ var best=null,bd=Infinity; for(var c in CITY_GEO){ var dd=haversine(lat,lng,CITY_GEO[c][0],CITY_GEO[c][1]); if(dd<bd){bd=dd;best=c;} } return {city:best,dist:Math.round(bd)}; }
function initLocate(){
  var btn=$("#ab-loc"); if(!btn) return;
  btn.addEventListener("click",function(){
    if(!navigator.geolocation){ toast("Location not supported \u2014 opening city picker"); fallbackPicker(); return; }
    btn.classList.add("locating");
    navigator.geolocation.getCurrentPosition(function(pos){
      btn.classList.remove("locating");
      var lat=pos.coords.latitude,lng=pos.coords.longitude, near=nearestCity(lat,lng);
      if(fCity){ fCity.value=near.city; fCity.dispatchEvent(new Event("change")); }
      var book=$("#book"); if(book){ book.scrollIntoView({behavior:"smooth",block:"center"}); }
      toast("Nearest hub: "+near.city+" (~"+near.dist+" km). Bikes loaded \u2014 share your spot on WhatsApp");
      var msg="Hi Rentorra! \uD83D\uDCCD I want a bike *near my location*.\n\nMy nearest hub looks like *"+near.city+"*.\nMy live location: https://maps.google.com/?q="+lat.toFixed(5)+","+lng.toFixed(5)+"\n\nPlease tell me which bikes are available closest to me and the delivery charge.";
      setTimeout(function(){ openWA(msg); },900);
    },function(err){
      btn.classList.remove("locating");
      toast(err&&err.code===1?"Location blocked \u2014 pick your city instead":"Couldn\u2019t get location \u2014 pick your city instead");
      fallbackPicker();
    },{enableHighAccuracy:true,timeout:9000,maximumAge:60000});
  });
}
function fallbackPicker(){
  var book=$("#book"); if(book){ book.scrollIntoView({behavior:"smooth",block:"center"}); }
  if(fCity){ setTimeout(function(){ try{fCity.focus();}catch(_){} },500); }
  setTimeout(function(){ openWA("Hi Rentorra! \uD83D\uDCCD I want a bike *near my location*. Please share what\u2019s available closest to me and delivery options."); },1100);
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded",function(){
  observeReveals(document);
  initBookingWidget();
  renderFleet();
  initFilters();
  renderReviews();
  initFAQ();
  initPlans();
  initRoutes();
  initModal();
  wireStaticLinks();
  initLocate();
  $$("[data-icon]").forEach(function(el){ var k=el.getAttribute("data-icon"); if(ICON[k]) el.insertAdjacentHTML("afterbegin",ICON[k]); });
});

})();
