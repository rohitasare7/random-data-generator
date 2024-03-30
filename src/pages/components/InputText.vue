<script setup>
import { onMounted, ref } from 'vue';
//Add Toast
import toast from "../../assets/js/toast";
const addToast = (toastText, toastType = null) => {
    toast.add({
        message: {
            text: toastText,
            type: toastType,
        },
    });
}

const props = defineProps({
    value: String,
    copyContent: {
        type: Boolean,
        default: true
    }
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });

//copy the text inside input element
const copyValue = (value, isCopy) => {
    // console.log(value);
    if (isCopy) {
        navigator.clipboard.writeText(value);
        addToast('Value copied to clipboard.');
    }

}

</script>

<template>
    <div class="relative">
        <input ref="input"
            class="bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !outline-none text-ellipsis"
            :value="props.value" @input="$emit('update:modelValue', $event.target.value)">
        <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3"
            @click="copyValue(props.value, copyContent)">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-300 fill-current" width="24" height="24"
                viewBox="0 -960 960 960">
                <path
                    d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z" />
            </svg>
        </button>
    </div>

</template>