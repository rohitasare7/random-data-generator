<script setup>
import { ref, computed, onMounted } from 'vue';
import { faker, allFakers, allLocales } from '@faker-js/faker';
import { LOCALE_NAMES } from '../assets/js/localeConstants';
import RandExp from 'randexp';

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

// Identity Section
// Generate a random string based on the provided regular expression pattern
const generateRandomString = (pattern) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === 'A') {
      // Append a random uppercase letter
      result += characters.charAt(Math.floor(Math.random() * 26));
    } else if (pattern[i] === '0') {
      // Append a random digit
      result += characters.charAt(Math.floor(Math.random() * 36) + 26);
    } else {
      // Append the character from the pattern
      result += pattern[i];
    }
  }
  return result;
};

const randomData = ref({});
const selectedGender = ref('male');

const updateRandomData = () => {
  //Define Constants
  const gender = getValue('person.sex');
  const firstName = getValue('person.firstName', [gender]);//fakerInstance.value.person.firstName();
  const lastName = getValue('person.lastName');//fakerInstance.value.person.lastName();
  const middleName = getValue('person.firstName', ['male']);
  const companyAddress = `${getValue('location.buildingNumber')}, ${getValue('location.city')}, ${getValue('location.state')}`
  const email = getValue('internet.email', [{ firstName: firstName, lastName: lastName, provider: 'test.example.com' }]);

  const licenseState = new RandExp(/^[A-Z]{2}$/).gen();
  const licenseRng = new RandExp(/^[1-9]{4}$/).gen();
  const randomnumber = Math.floor(Math.random() * 10)
  const today = new Date();
  const licenseYear = today.getFullYear() - randomnumber;

  const data = {
    person: {
      fullName: `${firstName} ${middleName} ${lastName}`,
      firstName,
      lastName,
      middleName,
      //gender,
      email,
      phone: getValue('phone.number'),
    },
    address: {
      buildingNumber: getValue('location.secondaryAddress'),
      streetAddress: getValue('location.streetAddress'), //fakerInstance.value.location.streetAddress(),
      city: getValue('location.city'), //fakerInstance.value.location.city(),
      state: getValue('location.state'),
      zipCode: getValue('location.zipCode'),
      gpsCoordinate: getValue('location.nearbyGPSCoordinate').toString(),
    },
    personalIdentity: {
      panCard: new RandExp(/[A-Z]{5}[0-9]{4}[A-Z]{1}/).gen(),
      voterId: new RandExp(/[A-Z]{3}[0-9]{6}/).gen(),
      passportNumber: new RandExp(/^[A-Z][0-9]{7}$/).gen(),
      aadharCard: new RandExp(/^[0-9]{4}[ ][0-9]{4}[ ][0-9]{4}$/).gen(),
      socialSecurityNumber: new RandExp(/[1-9]{3}-[1-9]{2}-[1-9]{4}/).gen(),
      drivingLicense: licenseState + licenseYear + '000' + licenseRng,
    },
    company: {
      jobType: getValue('person.jobType'),
      jobProfile: getValue('person.jobTitle'),
      companyName: getValue('company.name'),//fakerInstance.value.company.name(),
      companyAddress,//fakerInstance.value.company.catchPhrase(),
      ZipCode: getValue('location.zipCode'),
    },

    // Add more items as needed
  }
  randomData.value = data;
}

const formatDisplayName = (text) => {
  const formattedText = text.replace(/([a-z])([A-Z])/g, '$1 $2')
  return formattedText.charAt(0).toUpperCase() + formattedText.slice(1)
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div v-for="(item, key) in randomData" :key="key"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-lg font-bold mb-2">{{ formatDisplayName(key) }}</h3>
        <div v-for="(subItem, subKey) in item" :key="subKey" class="text-gray-700">
          <!-- <template v-if="subKey == 'fullName'">
          </template> -->
          <InputLabel :value="formatDisplayName(subKey)" class="my-1" />
          <InputText :value="subItem" class="mb-4" />
        </div>
      </div>
    </div>
    <!-- Main Random Data Container Ends -->

    <!-- <div class="container mx-auto p-4">
      <pre class="bg-gray-900 text-gray-50 rounded-md p-8">
        {{ randomData }}
      </pre>
    </div> -->


  </div>

</template>