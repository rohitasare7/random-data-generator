<template>
  <!-- <button @click="toggleTheme" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-2.5 absolute top-4 right-4">
      <svg v-if="isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </button> -->


  <label for="theme" class="theme absolute top-2 right-0 md:top-6 md:right-6">

    <span class="theme__toggle-wrap ">
      <input id="theme" class="theme__toggle" type="checkbox" role="switch" name="theme" value="dark"
        @click="toggleTheme" v-model="isDarkMode">
      <!-- <span class="theme__fill"></span> -->
      <span class="theme__icon">
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
      </span>
    </span>

  </label>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false);

onMounted(() => {
  const storedTheme = localStorage.getItem('color-theme')
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  }
}
</script>

<style scoped>
/* 
* Light / Dark Mode switch by Jon Kantner : https://codepen.io/jkantner
*/
.theme {
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}

.theme__fill,
.theme__icon {
  transition: transform 0.3s ease-in-out;
}

.theme__fill {
  background-color: hsl(223, 10%, 100%);
  display: block;
  mix-blend-mode: difference;
  position: fixed;
  inset: 0;
  height: 100%;
  transform: translateX(-100%);
}

.theme__icon,
.theme__toggle {
  z-index: 1;
}

.theme__icon,
.theme__icon-part {
  position: absolute;
}

.theme__icon {
  display: block;
  top: 0.715em;
  left: 0.95em;
  width: 0em;
  height: 0.5em;
}

.theme__icon-part {
  border-radius: 50%;
  box-shadow: 0.4em -0.4em 0 0.5em hsl(0, 0%, 100%) inset;
  top: calc(50% - 0.425em);
  left: calc(50% - 0.425em);
  width: 0.75em;
  height: 0.75em;
  transition:
    box-shadow 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  transform: scale(0.5);
}

.theme__icon-part~.theme__icon-part {
  background-color: hsl(0, 0%, 100%);
  border-radius: 0.05em;
  box-shadow: none;
  top: 40%;
  left: calc(50% - 0.07em);
  transform: rotate(0deg) translateY(0.35em);
  transform-origin: 50% 0;
  width: 0.05em;
  height: 0.17em;
}

.theme__icon-part:nth-child(3) {
  transform: rotate(45deg) translateY(0.35em);
}

.theme__icon-part:nth-child(4) {
  transform: rotate(90deg) translateY(0.35em);
}

.theme__icon-part:nth-child(5) {
  transform: rotate(135deg) translateY(0.35em);
}

.theme__icon-part:nth-child(6) {
  transform: rotate(180deg) translateY(0.35em);
}

.theme__icon-part:nth-child(7) {
  transform: rotate(225deg) translateY(0.35em);
}

.theme__icon-part:nth-child(8) {
  transform: rotate(270deg) translateY(0.35em);
}

.theme__icon-part:nth-child(9) {
  transform: rotate(315deg) translateY(0.35em);
}

.theme__label,
.theme__toggle,
.theme__toggle-wrap {
  position: relative;
}

.theme__toggle,
.theme__toggle:before {
  display: block;
}

.theme__toggle {
  cursor: pointer;
  background-color: hsl(48, 90%, 85%);
  border-radius: 25% / 50%;
  box-shadow: 0 0 0 0.125em hsla(223, 90%, 55%, 0);
  padding: 0.25em;
  width: 3.5em;
  height: 1.8em;
  -webkit-appearance: none;
  appearance: none;
  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.15s ease-in-out,
    transform 0.3s ease-in-out;
}

.theme__toggle:before {
  background-color: hsl(48, 90%, 55%);
  border-radius: 50%;
  content: "";
  width: 1.3em;
  height: 1.3em;
  transition:
    background-color 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}

.theme__toggle:focus {
  box-shadow: 0 0 0 0.125em hsl(223, 90%, 55%);
  outline: transparent;
}

/* Checked */
.theme__toggle:checked {
  background-color: hsl(198, 90%, 15%);
}

.theme__toggle:checked:before,
.theme__toggle:checked~.theme__icon {
  transform: translateX(1.755em);
}

.theme__toggle:checked:before {
  background-color: hsl(198, 90%, 55%);
}

.theme__toggle:checked~.theme__fill {
  transform: translateX(0);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(1) {
  box-shadow: 0.2em -0.12em 0 0.17em hsl(0, 0%, 100%) inset;
  transform: scale(1);
  left: calc(50% - 0.395em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part~.theme__icon-part {
  opacity: 0;
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(2) {
  transform: rotate(45deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(3) {
  transform: rotate(90deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(4) {
  transform: rotate(135deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(5) {
  transform: rotate(180deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(6) {
  transform: rotate(225deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(7) {
  transform: rotate(270deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(8) {
  transform: rotate(315deg) translateY(0.8em);
}

.theme__toggle:checked~.theme__icon .theme__icon-part:nth-child(9) {
  transform: rotate(360deg) translateY(0.8em);
}

.theme__toggle-wrap {
  margin: 0 0.75em;
}

@supports selector(:focus-visible) {
  .theme__toggle:focus {
    box-shadow: 0 0 0 0.125em hsla(223, 90%, 55%, 0);
  }

  .theme__toggle:focus-visible {
    box-shadow: 0 0 0 0.125em hsl(223, 90%, 55%);
  }
}
</style>