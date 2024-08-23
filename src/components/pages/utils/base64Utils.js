// utils/base64Utils.js
export const encodeBase64 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
  };
  
  export const decodeBase64 = (str) => {
    return decodeURIComponent(escape(atob(str)));
  };
  