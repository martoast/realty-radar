<template>
    <div class="relative">
      <div
        @click="isOpen = !isOpen"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
      >
        <span v-if="selectedLabels.length" class="block truncate">
          {{ selectedLabels.join(', ') }}
        </span>
        <span v-else class="block truncate text-gray-400">
          Select options
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
  
      <div v-if="isOpen" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <div
          v-for="option in options"
          :key="option.value"
          @click="toggleOption(option)"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
        >
          <span :class="[isSelected(option) ? 'font-semibold' : 'font-normal', 'block truncate']">
            {{ option.label }}
          </span>
          <span v-if="isSelected(option)" class="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: [Array, String],
      default: () => [],
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const isOpen = ref(false);
  
  const selectedLabels = computed(() => {
    if (props.multiple) {
      return props.options
        .filter(option => props.modelValue.includes(option.value))
        .map(option => option.label);
    } else {
      const selected = props.options.find(option => option.value === props.modelValue);
      return selected ? [selected.label] : [];
    }
  });
  
  const isSelected = (option) => {
    return props.multiple
      ? props.modelValue.includes(option.value)
      : props.modelValue === option.value;
  };
  
  const toggleOption = (option) => {
    if (props.multiple) {
      const newValue = [...props.modelValue];
      const index = newValue.indexOf(option.value);
      if (index === -1) {
        newValue.push(option.value);
      } else {
        newValue.splice(index, 1);
      }
      emit('update:modelValue', newValue);
    } else {
      emit('update:modelValue', option.value);
      isOpen.value = false;
    }
  };
  </script>