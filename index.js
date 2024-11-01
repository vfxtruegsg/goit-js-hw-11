import{i as a,S as u}from"./assets/vendor-BrddEoy-.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p="https://pixabay.com/api/",f="46841282-5db11f3b406bb735b1a036109";function m(o){const i=new URLSearchParams({key:f,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${p}?${i}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function d(o){return o.map(({webformatURL:i,largeImageURL:r,tags:n,likes:e,views:t,comments:s,downloads:c})=>`
      <li class="gallery-item">
      <a class="gallery-link" href=${r} >
      <img
        class="gallery-image"
        src=${i}
        alt=${n}
        width="360" height ="152"
      />
    </a>
    <div class="description">
    <ul class="list-points">
    <li class="items-points">
    <p>Likes</p>
    <p>${e}</p>
    </li>
    <li class="items-points">
    <p>Views</p>
    <p>${t}</p>
    </li>
    <li class="items-points">
    <p>Comments</p>
    <p>${s}</p>
    </li>
    <li class="items-points">
    <p>Downloads</p>
    <p>${c}</p>
    </li>
  
    </ul>
    </div>
  </li>  
      `).join("")}const h=document.querySelector(".search-container"),y=document.querySelector(".list-photo"),l=document.querySelector(".loader");h.addEventListener("submit",g);function g(o){o.preventDefault();const i=o.target.elements.query.value.trim();if(!i){a.error({title:"❌",message:"Please enter your request",position:"topRight",timeout:3e3,transitionIn:"fadeInLeft",transitionOut:"fadeOutRight"});return}l.style.opacity="1",m(i).then(r=>{r.total||a.error({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3,transitionIn:"fadeInLeft",transitionOut:"fadeOutRight"}),y.innerHTML=d(r.hits),L.refresh()}).catch(r=>{throw new Error(r)}).finally(()=>{l.style.opacity="0"})}const L=new u(".gallery-link",{captions:!0,captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
