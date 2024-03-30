<script setup>
defineProps({
    value: String,
});
</script>

<template>
    <label class="block font-base text-sm text-gray-700 dark:text-gray-400">
        {{ value }}
        <span v-if="value"></span>
        <span v-else><slot /></span>
    </label>
</template>