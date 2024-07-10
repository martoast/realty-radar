<template>
  <Menu as="div" class="relative inline-block text-left w-40">
    <div>
      <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {{ buttonText }}
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>
    
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <div class="px-4 py-2">
            <p class="text-sm font-medium text-gray-700">Bedrooms</p>
            <div class="mt-1 flex items-center space-x-2">
              <input type="number" v-model="form.beds_min" placeholder="Min" min="0" class="w-20 p-1 text-sm border rounded">
              <span class="text-gray-500">-</span>
              <input type="number" v-model="form.beds_max" placeholder="Max" min="0" class="w-20 p-1 text-sm border rounded">
            </div>
          </div>
          <div class="px-4 py-2">
            <p class="text-sm font-medium text-gray-700">Bathrooms</p>
            <div class="mt-1 flex items-center space-x-2">
              <input type="number" v-model="form.baths_min" placeholder="Min" min="0" step="0.5" class="w-20 p-1 text-sm border rounded">
              <span class="text-gray-500">-</span>
              <input type="number" v-model="form.baths_max" placeholder="Max" min="0" step="0.5" class="w-20 p-1 text-sm border rounded">
            </div>
          </div>
          
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['update:bedsAndBaths'])

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const localForm = reactive({
  beds_min: null,
  beds_max: null,
  baths_min: null,
  baths_max: null
})

const isFormEmpty = computed(() => {
  return Object.values(localForm).every(value => value === null || value === '')
})

const buttonText = computed(() => {
  const beds = localForm.beds_min || localForm.beds_max ? `${localForm.beds_min || ''}${localForm.beds_max ? '-' + localForm.beds_max : ''} b` : ''
  const baths = localForm.baths_min || localForm.baths_max ? `${localForm.baths_min || ''}${localForm.baths_max ? '-' + localForm.baths_max : ''} ba` : ''
  
  if (beds && baths) {
    return `${beds}, ${baths}`
  } else if (beds) {
    return beds
  } else if (baths) {
    return baths
  } else {
    return 'Beds & Baths'
  }
})

const updateLocalForm = () => {
  localForm.beds_min = props.form.beds_min ?? null
  localForm.beds_max = props.form.beds_max ?? null
  localForm.baths_min = props.form.baths_min ?? null
  localForm.baths_max = props.form.baths_max ?? null
}

// Watch for changes in the form prop
watch(() => props.form, updateLocalForm, { immediate: true, deep: true })

// Watch for changes in localForm and emit updates
watch(localForm, (newValue) => {
  const filteredValue = Object.entries(newValue).reduce((acc, [key, value]) => {
    if (value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});
  
  emit('update:bedsAndBaths', filteredValue)
}, { deep: true })

</script>