<script setup>
import { ref, computed, onMounted } from 'vue';
import { faker, allFakers, allLocales } from '@faker-js/faker';
import { LOCALE_NAMES } from '../assets/js/localeConstants';

import InputText from './components/InputText.vue';
import InputLabel from './components/InputLabel.vue';
import PrimaryButton from './components/PrimaryButton.vue';

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
    if (selectedLocale.value == 'base') {
      selectedLocale.value = 'en';
    }
    return localeOptions.value[selectedLocale.value].fakerInstance;
  }
  return faker;
});

const generateData = () => {
  updateRandomData();
  //faker.person.
}

const randomData = ref({});

const updateRandomData = () => {
  const firstName = fakerInstance.value.person.firstName();
  const lastName = fakerInstance.value.person.lastName();

  const data = {
    person: {
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      gender: fakerInstance.value.person.gender(),
      // Add more person data as needed
    },
    address: {
      streetAddress: fakerInstance.value.location.streetAddress(),
      city: fakerInstance.value.location.city(),
      state: fakerInstance.value.location.state(),
      zipCode: fakerInstance.value.location.zipCode(),
      // Add more address data as needed
    },
    company: {
      companyName: fakerInstance.value.company.name(),
      catchPhrase: fakerInstance.value.company.catchPhrase(),
      //bs: fakerInstance.value.company.bs(),
      // Add more company data as needed
    },
    // Add more items as needed
  }
  //console.log('data -->' + JSON.stringify(data));
  randomData.value = data;
}

const updateRandomData_old = () => {
  if (fakerInstance.value) {
    localizedRandomName.value = fakerInstance.value.person.fullName();
    localizedRandomAddress.value = fakerInstance.value.location.streetAddress();
    //console.log('person --> ' + fakerInstance.value.person.firstName());
  }
}

const displayNames = {
  person: 'Personal Information',
  address: 'Address',
  company: 'Company Details',
  fullName: 'Full Name',
  firstName: 'First Name',
  lastName: 'Last Name',
  gender: 'Gender',
  streetAddress: 'Street Address',
  city: 'City',
  state: 'State',
  zipCode: 'ZIP Code',
  companyName: 'Company Name',
  catchPhrase: 'Catch Phrase',
  bs: 'BS',
  // Add more display names as needed
}

const getDisplayName = (key, subKey) => {
  if (subKey) {
    const itemDisplayName = displayNames[key] || key
    const subItemDisplayName = displayNames[subKey] || subKey
    return ` ${subItemDisplayName}`
  }

  return displayNames[key] || key
}

onMounted(() => updateRandomData());

</script>

<template>

  <!-- Top Container Starts-->
  <div class="container mx-auto p-4">

    <h2 class="text-2xl font-bold mb-4 items-center text-center uppercase text-gray-700 mt-6">Random Data Generator</h2>

    <div class="flex items-center justify-center">
      <InputLabel value="Select Locale" class="mx-4" />
      <select id="locale-select" v-model="selectedLocale" @change="updateRandomData"
        class="w-56 md:w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="" disabled>Select a locale</option>
        <option v-for="(option, locale) in localeOptions" :key="locale" :value="locale">
          {{ option.name }}
        </option>
      </select>
    </div>

  </div>
  <!-- Top Container Ends-->

  <div class="container mx-auto pb-4">
    <div class="text-center justify-center">
      <PrimaryButton @click="generateData" class="my-4">
        Generate Data
      </PrimaryButton>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(item, key) in randomData" :key="key"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-lg font-bold mb-2">{{ getDisplayName(key) }}</h3>
        <div v-for="(subItem, subKey) in item" :key="subKey" class="text-gray-700">
          <!-- <p>{{ getDisplayName(key, subKey) }}: {{ subItem }}</p> -->
          <InputLabel :value="getDisplayName(key, subKey)" class="my-1"/>
          <InputText :value="subItem" :placeholder="getDisplayName(key, subKey)" class="mb-4"/>
        </div>
      </div>
    </div>
  </div>

</template>