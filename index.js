import{i as a,S as c}from"./assets/vendor-BrddEoy-.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u="https://pixabay.com/api/",p="46841282-5db11f3b406bb735b1a036109",f=document.querySelector(".search-container"),m=document.querySelector(".list-photo");document.querySelector(".loader");f.addEventListener("submit",d);function d(o){o.preventDefault();const i=o.target.elements.query.value.trim();if(!i){a.error({title:"❌",message:"Please enter your request",position:"topRight",timeout:3e3,transitionIn:"fadeInLeft",transitionOut:"fadeOutRight"});return}h(i).then(r=>{r.total||a.error({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3,transitionIn:"fadeInLeft",transitionOut:"fadeOutRight"}),m.innerHTML=y(r.hits),g.refresh()}).catch(r=>{throw new Error(r)})}function h(o){const i=new URLSearchParams({key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${u}?${i}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function y(o){return o.map(({webformatURL:i,largeImageURL:r,tags:n,likes:e,views:t,comments:s,downloads:l})=>`
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
  <p>${l}</p>
  </li>

  </ul>
  </div>
</li>  
    `).join("")}const g=new c(".gallery-link",{captions:!0,captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
