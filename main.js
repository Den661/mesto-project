(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{x:()=>O});var t=document.querySelector(".popup_type_profile-edit"),n=document.querySelector(".popup_type_place-add"),r=document.querySelector(".popup_type_image"),o=document.querySelector(".popup_type_edit-avatar"),c=r.querySelector(".popup__image"),u=r.querySelector(".popup__figcaption"),a=document.querySelector(".profile"),i=a.querySelector(".profile__name"),l=a.querySelector(".profile__bio"),s=t.querySelector(".popup__input_name"),p=t.querySelector(".popup__input_bio"),d=document.querySelector(".places__list"),f=a.querySelector(".profile__edit-button"),_=t.querySelector(".popup__close"),y=t.querySelector(".form"),v=n.querySelector(".popup__close"),m=a.querySelector(".profile__add-button"),h=n.querySelector(".form"),S=o.querySelector(".form"),b=r.querySelector(".popup__close"),q=document.querySelector("#place-template").content,g=Array.from(n.querySelectorAll(".form__input")),L=n.querySelector(".form"),E=document.querySelector(".profile__avatar"),k=document.querySelector(".profile__avatar-overlay");function C(e){e.classList.add("popup_opened"),document.addEventListener("keydown",U),e.addEventListener("click",x)}function x(e){e.target.classList.contains("popup")&&A(e.target)}function A(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",U),e.removeEventListener("click",x)}function U(e){"Escape"===e.key&&A(document.querySelector(".popup_opened"))}var O,j,w,P,T,D,I,N,B,J={baseUrl:"https://nomoreparties.co/v1/plus-cohort-12",headers:{authorization:"f3af3a32-1630-4f2d-93bf-f554187b89c2","Content-Type":"application/json"}};function H(e){return e.ok?e.json():Promise.reject(e.status)}function M(e){var t=q.querySelector(".place").cloneNode(!0),n=t.querySelector(".place__image"),o=t.querySelector(".place__delete-button");return n.src=e.link,n.alt=e.name,R(e.likes,t),function(e,t){t===O?e.classList.add("place__delete-button_active"):e.classList.remove("place__delete-button_active")}(o,e.owner._id),t.querySelector(".place__like").addEventListener("click",(function(n){return function(e,t,n){var r;e.target.classList.contains("place__like_checked")?(r=t,fetch("".concat(J.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:J.headers}).then((function(e){return H(e)}))).then((function(e){return R(e.likes,n)})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(J.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:J.headers}).then((function(e){return H(e)}))}(t).then((function(e){return R(e.likes,n)})).catch((function(e){return console.log(e)}))}(n,e._id,t)})),t.querySelector(".place__delete-button").addEventListener("click",(function(t){return n=t.target.parentElement,void(r=e._id,fetch("".concat(J.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:J.headers}).then((function(e){return H(e)}))).then((function(){return function(e){e.remove()}(n)})).catch((function(e){return console.log(e)}));var n,r})),n.addEventListener("click",(function(e){return t=e.target.src,n=name,c.src=t,c.alt=n,u.textContent=n,void C(r);var t,n})),t.querySelector(".place__title").textContent=e.name,t}function R(e,t){var n=t.querySelector(".place__likes-count"),r=t.querySelector(".place__like");n.textContent=e.length,function(e){return!!JSON.stringify(e).includes(O)}(e)?r.classList.add("place__like_checked"):r.classList.remove("place__like_checked")}function z(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}function $(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)}function F(e,t,n){t.textContent=e?"Сохранение...":n}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function K(e){d.prepend(e)}f.addEventListener("click",(function(){s.value=i.textContent,p.value=l.textContent,C(t)})),m.addEventListener("click",(function(){var e=n.querySelector(".popup__button");L.reset(),function(e,t){$(e,t,"popup__button_inactive"),e.forEach((function(e){return z(L,e,"form__input_invalid","form__input-error")}))}(g,e),C(n)})),_.addEventListener("click",(function(){return A(t)})),y.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");F(!0,t),function(e,t){return fetch("".concat(J.baseUrl,"/users/me"),{method:"PATCH",headers:J.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return H(e)}))}(s.value,p.value).then((function(e){i.textContent=e.name,l.textContent=e.about})).then((function(){return A(e.target.closest(".popup"))})).catch((function(e){return console.log(e)})).finally((function(){F(!1,t,"Создать")}))})),v.addEventListener("click",(function(){return A(n)})),h.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__input_name").value,n=e.target.querySelector(".popup__input_link").value,r=e.target.querySelector(".popup__button");F(!0,r),function(e,t){return fetch("".concat(J.baseUrl,"/cards"),{method:"POST",headers:J.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return H(e)}))}(t,n).then((function(e){return M(e)})).then((function(e){return K(e)})).then((function(){return A(e.target.closest(".popup"))})).then((function(){return e.target.reset()})).catch((function(e){return console.log(e)})).finally((function(){F(!1,r,"Создать")}))})),b.addEventListener("click",(function(){return A(r)})),E.addEventListener("click",(function(){C(o)})),S.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__input_link").value,n=e.target.querySelector(".popup__button");F(!0,n),function(e){return fetch("".concat(J.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:J.headers,body:JSON.stringify({avatar:e})}).then((function(e){return H(e)}))}(t).then((function(e){E.style.backgroundImage="URL(".concat(e.avatar,")")})).then((function(){return A(e.target.closest(".popup"))})).finally((function(){return F(!1,n,"Сохранить")}))})),Promise.all([fetch("".concat(J.baseUrl,"/cards"),{headers:J.headers}).then((function(e){return H(e)})),fetch("".concat(J.baseUrl,"/users/me"),{headers:J.headers}).then((function(e){return H(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];i.textContent=c.name,l.textContent=c.about,E.style.backgroundImage="URL(".concat(c.avatar,")"),O=c._id,o.forEach((function(e){return K(M(e))}))})),w=(j={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_invalid",errorClass:"form__input-error"}).formSelector,P=j.inputSelector,T=j.submitButtonSelector,D=j.inactiveButtonClass,I=j.inputErrorClass,N=j.errorClass,(B=Array.from(document.querySelectorAll(w))).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),B.forEach((function(e){return function(e,t,n,r,o,c){var u=Array.from(e.querySelectorAll(t)),a=e.querySelector(n);$(u,a),u.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.valid?z(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,o,c),$(u,a,r)}))}))}(e,P,T,D,I,N)}))})),E.addEventListener("mouseover",(function(){k.style.visibility="visible",k.style.opacity="1"})),E.addEventListener("mouseout",(function(){k.style.visibility="hidden",k.style.opacity=0}))})();