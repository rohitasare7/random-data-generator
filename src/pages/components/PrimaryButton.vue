<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
    cssStyle: '',
    isRed: Boolean,
});
</script>

<template>
    <button :type="type" :class="{
        'bg-gray-800 dark:text-gray-800 dark:hover:bg-white': !isRed, // Default background for non-red button
        'bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-700 dark:text-gray-100': isRed, // Red background for red button
        'inline-flex items-center px-4 py-2 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white  uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150': true,
    }">
        <slot />
    </button>
</template>