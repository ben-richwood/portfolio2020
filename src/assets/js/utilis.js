import stdinSound from "../sounds/stdin.wav";
import hudSound from "../sounds/hud.m4a";
import store from './store/index.js';

class Sound {
	constructor() {
		this.projectSound = new Audio(stdinSound);
		this.hudSound = new Audio(hudSound);
	}

	play(sound = "projectSound") {
		if (!this[sound]) return;
		this[sound].play();
	}

	project() {
		if (store.state.settings.isSoundOn) this.projectSound.play();
	}
	hud() {
		if (store.state.settings.isSoundOn) this.hudSound.play();
	}
}

export const sound = new Sound();

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const checkCookieExistence = function (name) {
	let cookieLookUp = document.cookie
  .split('; ')
  .find(row => row.startsWith(`${name}=`))
  ?.split('=')[1];
	return cookieLookUp
}

export const formatTutoObj = function(){
	const cookie = checkCookieExistence("tutoAlreadySeen")
	return {
		zoom: cookie !== undefined,
		pan: cookie !== undefined,
		project: cookie !== undefined,
	}
}

export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
// Example of use:
// setCookie('user', 'John', {secure: true, 'max-age': 3600});
