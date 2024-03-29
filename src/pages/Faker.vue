<script setup>
import { ref, computed, onMounted } from 'vue';
import { faker, allFakers, allLocales } from '@faker-js/faker';
import { LOCALE_NAMES } from '../assets/js/localeConstants';

import InputText from './components/InputText.vue';
import InputLabel from './components/InputLabel.vue';
import PrimaryButton from './components/PrimaryButton.vue';
//Add Toast
import toast from "../assets/js/toast";
const addToast = (toastText, toastType = null) => {
  toast.add({
    message: {
      text: toastText,
      type: toastType,
    },
  });
}

const localeOptions = computed(() => {
  const options = {};
  for (const locale in allLocales) {
    const fakerInstance = allFakers[locale];
    const localeName = LOCALE_NAMES[locale] || locale;
    options[locale] = { name: localeName, fakerInstance };
  }
  return options;
});

// Added exception check to avoid data issues
const getValue = (method, params = []) => {
  try {
    const parts = method.split('.');
    let result = fakerInstance.value;
    for (const part of parts) {
      result = result[part];
    }
    return result(...params);
  } catch (error) {
    console.error("Error generating random value:", error.message);
    //addToast('Error : '+ error.message.replace("If you think this is a bug, please report it at: https://github.com/faker-js/faker", ""),'Error');
    return 'N/A'; // Return a placeholder value
  }
};

const selectedLocale = ref('en_IN');

const fakerInstance = computed(() => {
  if (selectedLocale.value) {
    if (selectedLocale.value == 'base') {
      selectedLocale.value = 'en';
    }
    return localeOptions.value[selectedLocale.value].fakerInstance;
  }
  return faker;
});


const randomData = ref({});
const selectedGender = ref('male');

const updateRandomData = () => {
  //Define Constants
  const gender = getValue('person.sex');
  const firstName = getValue('person.firstName', [gender]);//fakerInstance.value.person.firstName();
  const lastName = getValue('person.lastName');//fakerInstance.value.person.lastName();
  const middleName = getValue('person.firstName', ['male']);
  const companyAddress = `${getValue('location.buildingNumber')}, ${getValue('location.city')}, ${getValue('location.state')}, ${getValue('location.zipCode')}`

  const data = {
    person: {
      fullName: `${firstName} ${middleName} ${lastName}`,
      firstName,
      lastName,
      middleName,
      gender,
    },
    address: {
      streetAddress: getValue('location.streetAddress'), //fakerInstance.value.location.streetAddress(),
      city: getValue('location.city'), //fakerInstance.value.location.city(),
      state: getValue('location.state'),
      zipCode: getValue('location.zipCode'),
    },
    company: {
      jobType: getValue('person.jobType'),
      companyName: getValue('company.name'),//fakerInstance.value.company.name(),
      companyAddress//fakerInstance.value.company.catchPhrase(),
    },
    // Add more items as needed
  }
  randomData.value = data;
}

// Change JSON Key names
const displayNames = {
  person: 'Personal',
  address: 'Address',
  company: 'Company',
  fullName: 'Full Name',
  firstName: 'First Name',
  lastName: 'Last Name',
  middleName: 'Middle Name',
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

//Show Display Name on UI
const getDisplayName = (key, subKey) => {
  if (subKey) {
    const itemDisplayName = displayNames[key] || key
    const subItemDisplayName = displayNames[subKey] || subKey
    return ` ${subItemDisplayName}`
  }

  return displayNames[key] || key
}

//Load Initial Data
onMounted(() => {
  updateRandomData();
  addToast('Data has been loaded');
}
);

</script>

<template>

  <!-- Top Container Starts-->
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 items-center text-center uppercase text-gray-700 mt-6">Random Data Generator</h2>
    <div class="flex items-center justify-center">
      <InputLabel value="Select Locale" class="mx-4" />
      <select id="locale-select" v-model="selectedLocale" @change="updateRandomData"
        class="w-56 md:w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !outline-none">
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
      <PrimaryButton @click="updateRandomData" class="my-4">
        Generate Data
      </PrimaryButton>
    </div>

    <!-- Main Random Data Container Starts -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div v-for="(item, key) in randomData" :key="key"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-lg font-bold mb-2">{{ getDisplayName(key) }}</h3>
        <div v-for="(subItem, subKey) in item" :key="subKey" class="text-gray-700">
          <!-- <template v-if="subKey == 'fullName'">
          </template> -->
          <InputLabel :value="getDisplayName(key, subKey)" class="my-1" />
          <InputText :value="subItem" :placeholder="getDisplayName(key, subKey)" class="mb-4" />
        </div>
      </div>
    </div>
    <!-- Main Random Data Container Ends -->
  </div>

</template>