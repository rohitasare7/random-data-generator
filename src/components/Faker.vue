<script setup>
import { ref, computed } from 'vue';
import { faker, allFakers, allLocales } from '@faker-js/faker';
import { LOCALE_NAMES } from '../assets/js/localeConstants';

const localeOptions = computed(() => {
    const options = {};
    for (const locale in allLocales) {
        const fakerInstance = allFakers[locale];
        const localeName = LOCALE_NAMES[locale] || locale;
        options[locale] = { name: localeName, fakerInstance };
    }
    return options;
})

const selectedLocale = ref('en_IN');
const localizedRandomName = ref('');
const localizedRandomAddress = ref('');

const fakerInstance = computed(() => {
    if (selectedLocale.value) {
        return localeOptions.value[selectedLocale.value].fakerInstance;
    }
    return faker;
});

const generateData = () => {
    updateRandomData();
}

const updateRandomData = () => {
    if (fakerInstance.value) {
        localizedRandomName.value = fakerInstance.value.person.fullName();
        localizedRandomAddress.value = fakerInstance.value.location.streetAddress();
    }
}


</script>

<template>
    <div class="container mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4">Random Data Generator</h2>
        <button @click="generateData"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Generate Data
        </button>

        <label for="locale-select" class="block my-2">Select Locale:</label>
        <select id="locale-select" v-model="selectedLocale" @change="updateRandomData"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" disabled>Select a locale</option>
            <option v-for="(option, locale) in localeOptions" :key="locale" :value="locale">
                {{ option.name }}
            </option>
        </select>

        <div v-if="faker" class="mt-4">
            <h2 class="text-xl font-bold mb-2">Random Data:</h2>
            <p>Name: {{ localizedRandomName }}</p>
            <p>Address: {{ localizedRandomAddress }}</p>
            <!-- Add more data as needed -->
        </div>
    </div>
</template>