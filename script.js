/* =====================================================================
   RENTORRA — script.js
   All site interactivity: booking, WhatsApp routing, filters,
   FAQ, reviews carousel, geolocation, toast
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
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};

var $  = function(s,c){return (c||document).querySelector(s);};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

/* ---------- WHATSAPP HELPERS ---------- */
function waLink(msg){ return "https://wa.me/"+WA+"?text="+encodeURIComponent(msg); }
function openWA(msg){ window.open(waLink(msg),"_blank"); }

/* ---------- DATA ---------- */
var CITIES = ["Pune","Lonavala","Mahabaleshwar","Mumbai","Goa"];

var BIKES = [
  {emoji:"\uD83D\uDEF5",cat:"Scooter",  name:"Activa / Jupiter",      spec:"Auto gears \u00b7 45 kmpl \u00b7 2 seats", hr:399, day:1099, tag:"Scooter"},
  {emoji:"\uD83C\uDFCD\uFE0F",cat:"Commuter",name:"Pulsar / Apache",  spec:"150cc \u00b7 50 kmpl \u00b7 zippy",       hr:499, day:1399, tag:"Commuter"},
  {emoji:"\uD83C\uDFCD\uFE0F",cat:"Cruiser", name:"Royal Enfield Classic",spec:"350cc \u00b7 thump \u00b7 long-haul",  hr:799, day:1999, tag:"Cruiser"},
  {emoji:"\uD83C\uDFD4\uFE0F",cat:"Tourer",  name:"Himalayan / ADV",    spec:"411cc \u00b7 luggage racks \u00b7 any terrain", hr:999, day:2599, tag:"Adventure"},
  {emoji:"\uD83D\uDEF5",cat:"Scooter",  name:"Access / Ntorq",      spec:"Sporty \u00b7 50 kmpl \u00b7 light",       hr:449, day:1199, tag:"Scooter"},
  {emoji:"\uD83D\uDD25",cat:"Sports",   name:"KTM Duke 250",        spec:"Track-bred \u00b7 razor handling",   hr:1099,day:2899, tag:"Sports"},
  {emoji:"\uD83C\uDFCD\uFE0F",cat:"Cruiser", name:"Meteor 350",         spec:"350cc \u00b7 cruiser comfort \u00b7 easy", hr:749, day:1899, tag:"Cruiser"},
  {emoji:"\uD83D\uDEF5",cat:"Scooter",  name:"Vespa Classic",       spec:"Retro \u00b7 premium \u00b7 head-turner", hr:599, day:1499, tag:"Premium"},
  {emoji:"\uD83C\uDFCD\uFE0F",cat:"Commuter",name:"FZ / Gixxer",     spec:"150cc \u00b7 sporty commuter \u00b7 mileage", hr:529, day:1449, tag:"Commuter"}
];

var REVIEWS = [
  {n:"Aniket P.",p:"Pune",t:"Bike was spotless and delivered right to my hostel gate. Booking on WhatsApp took literally a minute. Best rental experience in Pune, hands down."},
  {n:"Sneha K.",p:"Lonavala trip",t:"Took a Classic 350 for the ghats. Engine was perfectly tuned, helmet included, and they personally called to confirm. Felt completely safe."},
  {n:"Rohan M.",p:"Mumbai",t:"No hidden charges at all \u2014 exactly the price shown on the site. Picked up and dropped on time. Will rent again for sure."},
  {n:"Priya D.",p:"Goa",t:"Honestly thought it was too good. Scooter was new, sanitised, and the support number actually picked up at night. 10/10 trust."},
  {n:"Karan S.",p:"Pune",t:"The Himalayan they gave me for my Mahabaleshwar ride was a beast. Fully serviced, luggage racks ready. Smooth from booking to return."},
  {n:"Tejas V.",p:"Pune",t:"Switched from another rental after one bad experience. Rentorra is on another level \u2014 clean bikes, real humans, zero drama."},
  {n:"Megha R.",p:"Lonavala",t:"Loved that everything happens on WhatsApp. Sent details, got a call back in 5 mins, bike at my door in an hour. Magic."},
  {n:"Faizan A.",p:"Mumbai",t:"Transparent, fast, and genuinely premium feeling. The helmet was new and the bike had a full safety check sticker. Impressed."}
];

/* ---------- TOAST ---------- */
var toastEl, toastTimer;
function toast(msg){
  if(!toastEl){
    toastEl=document.createElement("div");
    toastEl.className="toast";
    document.body.appendChild(toastEl);
  }
  toastEl.innerHTML=ICON.info+"<span>"+msg+"</span>";
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){toastEl.classList.remove("show");},3200);
}

/* ---------- HEADER SHRINK ---------- */
var hdr=$("#hdr");
window.addEventListener("scroll",function(){
  if(hdr) hdr.classList.toggle("shrink",window.scrollY>30);
},{passive:true});

/* ---------- MOBILE MENU ---------- */
var nav=$("#nav"), burger=$("#burger");
if(burger){ burger.addEventListener("click",function(){nav.classList.toggle("mob-open");}); }
$$(".mob-menu a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("mob-open");});});

/* ---------- SCROLL REVEAL ---------- */
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
},{threshold:.12});
function observeReveals(scope){
  $$(".reveal",scope).forEach(function(el,i){ el.style.transitionDelay=((i%4)*60)+"ms"; io.observe(el); });
}

/* ---------- DATE DEFAULTS ---------- */
function fmt(d){ return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16); }
function prettyDT(v){
  if(!v) return "\u2014";
  var d=new Date(v);
  return d.toLocaleDateString("en-IN",{day:"numeric",month:"short"})+", "+
         d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
}

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
  bkBtn.addEventListener("click",function(){
    if(checkBooking()) openModal({bike:fType.value||"Any bike",city:fCity.value});
  });
  checkBooking();
}
function durationLabel(){
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
    bkBtn.classList.add("live");
    bkBtn.innerHTML=ICON.wa+" Book now"+(dur?(" \u00b7 "+dur):"");
    bkNote.classList.add("ok");
    bkNote.innerHTML=ICON.check+" Ready to book \u2014 tap to confirm on WhatsApp";
  }else{
    bkBtn.classList.remove("live");
    bkBtn.innerHTML="Select details to continue";
    bkNote.classList.remove("ok");
    bkNote.innerHTML=ICON.info+" Fill the details to unlock booking";
  }
  return ok;
}

/* ---------- FLEET RENDER + FILTER ---------- */
function renderFleet(){
  var grid=$("#fleet-grid"); if(!grid) return;
  var html="";
  BIKES.forEach(function(b){
    var specs=b.spec.split("\u00b7").map(function(s){return '<span>\u2022 '+s.trim()+'</span>';}).join("");
    html+=''+
    '<div class="bike reveal" data-cat="'+b.cat+'" data-name="'+b.name+'" data-hr="'+b.hr+'" data-day="'+b.day+'">'+
      '<div class="vis"><span class="tag">'+b.tag+'</span><span class="fav">'+ "4.9\u2605" +'</span><span class="emoji">'+b.emoji+'</span></div>'+
      '<div class="body">'+
        '<h3>'+b.name+'</h3>'+
        '<div class="spec">'+specs+'</div>'+
        '<div class="price"><b>\u20B9'+b.hr+'</b><small>/ hr</small>'+
          '<span class="day"><em>\u20B9'+b.day+'</em><i>/ day</i></span></div>'+
        '<button class="pick" data-bike="'+b.name+'">'+ICON.wa+' Book this bike</button>'+
      '</div>'+
    '</div>';
  });
  html+='<div class="fleet-empty" id="fleet-empty">No bikes in this category right now \u2014 tap "Bike Near Me" and we\u2019ll arrange one.</div>';
  grid.innerHTML=html;
  // wire pick buttons
  $$(".bike .pick",grid).forEach(function(btn){
    btn.addEventListener("click",function(){
      var card=btn.closest(".bike");
      openModal({
        bike:card.getAttribute("data-name"),
        city:(fCity?fCity.value:""),
        price:"\u20B9"+card.getAttribute("data-hr")+"/hr \u00b7 \u20B9"+card.getAttribute("data-day")+"/day"
      });
    });
  });
  observeReveals(grid);
}
function initFilters(){
  $$(".chip").forEach(function(chip){
    chip.addEventListener("click",function(){
      $$(".chip").forEach(function(c){c.classList.remove("active");});
      chip.classList.add("active");
      var cat=chip.getAttribute("data-cat");
      var visible=0;
      $$(".bike").forEach(function(card){
        var show=(cat==="all")||(card.getAttribute("data-cat")===cat);
        card.classList.toggle("hide",!show);
        if(show) visible++;
      });
      var empty=$("#fleet-empty");
      if(empty) empty.style.display=visible?"none":"block";
    });
  });
}

/* ---------- REVIEWS ---------- */
function renderReviews(){
  var track=$("#rev-track"); if(!track) return;
  var html="";
  REVIEWS.concat(REVIEWS).forEach(function(r){
    var parts=r.n.replace("."," ").split(" ").filter(Boolean);
    var initials=(parts[0][0]+(parts[1]?parts[1][0]:"")).toUpperCase();
    html+=''+
    '<div class="rev"><div class="stars">\u2605\u2605\u2605\u2605\u2605</div>'+
      '<q>'+r.t+'</q>'+
      '<div class="who"><div class="av">'+initials+'</div>'+
        '<div><b>'+r.n+'</b><small>'+r.p+'</small></div>'+
        '<span class="vfy">'+ICON.check+' Verified</span></div>'+
    '</div>';
  });
  track.innerHTML=html;

  var mask=$("#rev-mask");
  var down=false,startX=0,scl=0;
  mask.addEventListener("pointerdown",function(e){
    down=true;startX=e.clientX;scl=mask.scrollLeft;
    track.classList.add("paused");mask.classList.add("drag");
    try{mask.setPointerCapture(e.pointerId);}catch(_){}
  });
  mask.addEventListener("pointermove",function(e){
    if(!down)return; mask.scrollLeft=scl-(e.clientX-startX);
  });
  function end(){ down=false;mask.classList.remove("drag"); setTimeout(function(){track.classList.remove("paused");},1200); }
  mask.addEventListener("pointerup",end);
  mask.addEventListener("pointercancel",end);
  mask.addEventListener("mouseenter",function(){track.classList.add("paused");});
  mask.addEventListener("mouseleave",function(){ if(!down) track.classList.remove("paused"); });
}

/* ---------- FAQ ACCORDION ---------- */
function initFAQ(){
  $$(".qa button").forEach(function(btn){
    btn.addEventListener("click",function(){
      var qa=btn.closest(".qa");
      var ans=$(".ans",qa);
      var isOpen=qa.classList.contains("open");
      // close others
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
      var plan=btn.getAttribute("data-plan");
      openWA("Hi Rentorra! \uD83D\uDC4B I\u2019m interested in the *"+plan+"* plan. Please share availability and bikes covered.");
    });
  });
}

/* ---------- ROUTES ---------- */
function initRoutes(){
  $$(".route .rbtn").forEach(function(btn){
    btn.addEventListener("click",function(){
      var dest=btn.getAttribute("data-route");
      openWA("Hi Rentorra! \uD83C\uDFCD\uFE0F I want to plan a ride to *"+dest+"*. Which bikes do you recommend and what\u2019s the rental cost?");
    });
  });
}

/* ---------- BOOKING MODAL ---------- */
var modal,mName,mPhone,mCity,mSummary,mSend,bookingCtx={};
function initModal(){
  modal=$("#modal"); mName=$("#m-name"); mPhone=$("#m-phone");
  mCity=$("#m-city"); mSummary=$("#m-summary"); mSend=$("#m-send");
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
    (bookingCtx.price?('<div class="ln"><span>Rate</span><b>'+bookingCtx.price+'</b></div>'):"");
  modal.classList.add("open");
  document.body.style.overflow="hidden";
  checkModal();
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
    "\nPlease confirm availability and call me back. \uD83D\uDE4F";
  openWA(msg);
}

/* ---------- STATIC WA / CALL LINKS ---------- */
function wireStaticLinks(){
  ["final-cta","foot-wa","foot-wa2","nav-cta"].forEach(function(id){
    var e=$("#"+id); if(e) e.href=waLink(GENERIC);
  });
  var call=$("#ab-call"); if(call) call.href="tel:"+TEL;
  var footCall=$("#foot-call"); if(footCall) footCall.href="tel:"+TEL;
  var abWa=$("#ab-wa"); if(abWa){ abWa.addEventListener("click",function(e){e.preventDefault();openWA(GENERIC);}); }
}

/* ---------- GEOLOCATION: "BIKE NEAR ME" ---------- */
// approximate city centers for nearest match
var CITY_GEO={
  "Pune":[18.5204,73.8567],
  "Lonavala":[18.7546,73.4062],
  "Mahabaleshwar":[17.9307,73.6477],
  "Mumbai":[19.0760,72.8777],
  "Goa":[15.2993,74.1240]
};
function haversine(a,b,c,d){
  var R=6371,dLat=(c-a)*Math.PI/180,dLon=(d-b)*Math.PI/180;
  var x=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
function nearestCity(lat,lng){
  var best=null,bd=Infinity;
  for(var c in CITY_GEO){
    var d=haversine(lat,lng,CITY_GEO[c][0],CITY_GEO[c][1]);
    if(d<bd){bd=d;best=c;}
  }
  return {city:best,dist:Math.round(bd)};
}
function initLocate(){
  var btn=$("#ab-loc"); if(!btn) return;
  btn.addEventListener("click",function(){
    if(!navigator.geolocation){
      toast("Location not supported \u2014 opening city picker");
      fallbackPicker();
      return;
    }
    btn.classList.add("locating");
    navigator.geolocation.getCurrentPosition(function(pos){
      btn.classList.remove("locating");
      var lat=pos.coords.latitude,lng=pos.coords.longitude;
      var near=nearestCity(lat,lng);
      // set dropdown to nearest serviced city
      if(fCity){ fCity.value=near.city; fCity.dispatchEvent(new Event("change")); }
      // scroll to booking + flash
      var book=$("#book");
      if(book){ book.scrollIntoView({behavior:"smooth",block:"center"}); }
      toast("Nearest hub: "+near.city+" (~"+near.dist+" km). Bikes loaded \u2014 share your spot on WhatsApp");
      var msg="Hi Rentorra! \uD83D\uDCCD I want a bike *near my location*.\n\n"+
        "My nearest hub looks like *"+near.city+"*.\n"+
        "My live location: https://maps.google.com/?q="+lat.toFixed(5)+","+lng.toFixed(5)+"\n\n"+
        "Please tell me which bikes are available closest to me and the delivery charge.";
      setTimeout(function(){ openWA(msg); },900);
    },function(err){
      btn.classList.remove("locating");
      if(err && err.code===1){ toast("Location blocked \u2014 pick your city instead"); }
      else { toast("Couldn\u2019t get location \u2014 pick your city instead"); }
      fallbackPicker();
    },{enableHighAccuracy:true,timeout:9000,maximumAge:60000});
  });
}
function fallbackPicker(){
  var book=$("#book");
  if(book){ book.scrollIntoView({behavior:"smooth",block:"center"}); }
  if(fCity){ setTimeout(function(){ try{fCity.focus();}catch(_){} },500); }
  setTimeout(function(){
    openWA("Hi Rentorra! \uD83D\uDCCD I want a bike *near my location*. Please share what\u2019s available closest to me and delivery options.");
  },1100);
}

/* ---------- FLOATING BAR REVEAL (subtle) ---------- */
// bar is always visible; nothing else needed

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

  // inject icons into nav/final/bar markers that use data-icon
  $$("[data-icon]").forEach(function(el){
    var k=el.getAttribute("data-icon");
    if(ICON[k]) el.insertAdjacentHTML("afterbegin",ICON[k]);
  });
});

})();
