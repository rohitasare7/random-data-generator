<script setup>
import { ref } from 'vue';
import { fakerEN_IN as faker } from '@faker-js/faker';

const inputs = ref([])
const showModal = ref(false)
const inputLabel = ref('')
const selectedCategory = ref('')
const selectedAttribute = ref('')

const fakerCategories = Object.keys(faker)
const fakerAttributes = {}

for (const category of fakerCategories) {
  fakerAttributes[category] = Object.keys(faker[category])
}

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  inputLabel.value = ''
  selectedCategory.value = ''
  selectedAttribute.value = ''
}

const createInput = () => {
  const value = selectedAttribute.value ? faker[selectedCategory.value][selectedAttribute.value]() : ''
  inputs.value.push({ label: inputLabel.value, value, category: selectedCategory.value, attribute: selectedAttribute.value })
  closeModal()
}

const updateInput = (index, newValue) => {
  inputs.value[index].value = newValue
}

const copyValue = (value) => {
  navigator.clipboard.writeText(value)
  alert('Value copied to clipboard!')
}

const regenerateValues = () => {
  inputs.value = inputs.value.map(input => {
    const newValue = faker[input.category][input.attribute]()
    return { ...input, value: newValue }
  })
}

</script>

<template>

  <div class="flex flex-col items-center justify-center min-h-screen">
    <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Create Input
    </button>
    <button v-if="inputs.length" @click="regenerateValues"
      class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2">
      Re-generate
    </button>
    <div v-if="inputs.length" class="mt-4">
      <div v-for="(input, index) in inputs" :key="index" class="flex items-center mb-2">
        <label class="w-24 font-bold">{{ input.label }}</label>
        <input :value="input.value" class="border border-gray-300 rounded px-2 py-1 mr-2"
          @input="updateInput(index, $event.target.value)" />
        <button @click="copyValue(input.value)"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
          Copy
        </button>
      </div>
    </div>
    <teleport to="body">
      <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
          <div class="bg-white rounded-lg shadow-lg p-6" @click.stop>
            <h3 class="text-lg font-bold mb-4">Create Input</h3>
            <label class="block mb-2">
              Label:
              <input v-model="inputLabel" placeholder="Enter input label"
                class="border border-gray-300 rounded px-2 py-1 w-full" />
            </label>
            <label class="block mb-2">
              Faker Category:
              <select v-model="selectedCategory" class="border border-gray-300 rounded px-2 py-1 w-full">
                <option v-for="category in fakerCategories" :key="category" :value="category">{{ category }}</option>
              </select>
            </label>
            <div v-if="selectedCategory" class="mb-4">
              <label class="block mb-2">
                Faker Attribute:
                <select v-model="selectedAttribute" class="border border-gray-300 rounded px-2 py-1 w-full">
                  <option v-for="attribute in fakerAttributes[selectedCategory]" :key="attribute" :value="attribute">{{
      attribute }}</option>
                </select>
              </label>
            </div>
            <div class="flex justify-end">
              <button @click="createInput"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Create
              </button>
              <button @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>






</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}
</style>
