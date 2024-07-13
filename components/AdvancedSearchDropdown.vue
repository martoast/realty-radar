<template>
    <Menu as="div" class="relative inline-block text-left w-40">
      <div>
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Advanced
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
        <MenuItems class="absolute right-0 z-10 mt-2 w-96 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <!-- Property Characteristics -->
            <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Property Characteristics</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4 w-100">
                <div>
                  <p class="text-sm font-medium text-gray-700">Building Size (sq ft)</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.building_size_min" @input="updateField('building_size_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.building_size_max" @input="updateField('building_size_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Lot Size (sq ft)</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.lot_size_min" @input="updateField('lot_size_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.lot_size_max" @input="updateField('lot_size_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Year Built</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.year_built_min" @input="updateField('year_built_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.year_built_max" @input="updateField('year_built_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <!-- Foreclosure & Auction -->
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Foreclosure & Auction</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="foreclosure" :checked="form.foreclosure" @change="updateField('foreclosure', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="foreclosure" class="font-medium text-gray-700">Include Foreclosures</label>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="pre_foreclosure" :checked="form.pre_foreclosure" @change="updateField('pre_foreclosure', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="pre_foreclosure" class="font-medium text-gray-700">Include Pre-Foreclosures</label>
                  </div>
                </div>
                <div v-if="form.foreclosure || form.pre_foreclosure">
                  <p class="text-sm font-medium text-gray-700">Foreclosure Date Range</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="date" :value="form.foreclosure_date_min" @input="updateField('foreclosure_date_min', $event.target.value)" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <span class="text-gray-500">-</span>
                    <input type="date" :value="form.foreclosure_date_max" @input="updateField('foreclosure_date_max', $event.target.value)" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="auction" :checked="form.auction" @change="updateField('auction', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="auction" class="font-medium text-gray-700">Include Auctions</label>
                  </div>
                </div>
                <div v-if="form.auction">
                  <p class="text-sm font-medium text-gray-700">Auction Date Range</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="date" :value="form.auction_date_min" @input="updateField('auction_date_min', $event.target.value)" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <span class="text-gray-500">-</span>
                    <input type="date" :value="form.auction_date_max" @input="updateField('auction_date_max', $event.target.value)" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="reo" :checked="form.reo" @change="updateField('reo', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="reo" class="font-medium text-gray-700">Include REO Properties</label>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <!-- Ownership & Occupancy -->
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Ownership & Occupancy</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4 w-100">
                <div>
                  <p class="text-sm font-medium text-gray-700">Last Sale Date</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="date" :value="form.last_sale_date_min" @input="updateField('last_sale_date_min', $event.target.value)" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <span class="text-gray-500">-</span>
                    <input type="date" :value="form.last_sale_date_max" @input="updateField('last_sale_date_max', $event.target.value)" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Years Owned</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.years_owned_min" @input="updateField('years_owned_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.years_owned_max" @input="updateField('years_owned_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Last Sale Price ($)</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.last_sale_price_min" @input="updateField('last_sale_price_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.last_sale_price_max" @input="updateField('last_sale_price_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="absentee_owner" :checked="form.absentee_owner" @change="updateField('absentee_owner', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="absentee_owner" class="font-medium text-gray-700">Absentee Owner</label>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="vacant" :checked="form.vacant" @change="updateField('vacant', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="vacant" class="font-medium text-gray-700">Vacant Property</label>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Radius</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4 w-100">
                <label for="radius" class="block text-sm font-medium leading-6 text-gray-900">
                  Search Radius: {{ form.radius }} miles
                </label>
                <input
                  v-model="form.radius"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-gray-300"
                />
                
              </div>
            </DisclosurePanel>
          </Disclosure>
            <!-- Apply Button -->
          <div class="px-4 py-2">
            <button 
            @click="resetFilters"
            class="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Reset filters
          </button>
          </div>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>
  
  <script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
import { reactive, watch, ref, computed } from 'vue'

const emit = defineEmits(['update:advancedFilters', 'resetForm'])

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const initialForm = {
  // Property Characteristics fields
  building_size_min: null,
  building_size_max: null,
  lot_size_min: null,
  lot_size_max: null,
  year_built_min: null,
  year_built_max: null,

  // Foreclosure & Auction fields
  foreclosure: false,
  pre_foreclosure: false,
  auction: false,
  auction_date_min: null,
  auction_date_max: null,
  reo: false,

  // Ownership & Occupancy fields
  last_sale_date_min: null,
  last_sale_date_max: null,
  years_owned_min: null,
  years_owned_max: null,
  last_sale_price_min: null,
  last_sale_price_max: null,
  absentee_owner: false,
  vacant: false,

  radius: 1
};

const localForm = reactive({...initialForm});
const touchedFields = ref(new Set());

const updateField = (key, value) => {
  localForm[key] = value;
  touchedFields.value.add(key);
}

const updateLocalForm = () => {
  Object.keys(initialForm).forEach(key => {
    if (props.form[key] !== undefined && props.form[key] !== null) {
      localForm[key] = props.form[key];
      touchedFields.value.add(key);
    } else {
      localForm[key] = initialForm[key];
    }
  });
}

// Watch for changes in the form prop
watch(() => props.form, (newForm) => {
  updateLocalForm();
}, { immediate: true, deep: true })

// Watch for changes in localForm and emit updates
watch(localForm, (newValue) => {
  const changedFields = {};
  touchedFields.value.forEach(key => {
    if (newValue[key] !== null && newValue[key] !== '' && newValue[key] !== false || key === 'radius') {
      changedFields[key] = newValue[key];
    }
  });
  emit('update:advancedFilters', changedFields);
}, { deep: true });

const resetFilters = () => {
  Object.keys(localForm).forEach(key => {
    localForm[key] = initialForm[key];
    console.log(localForm[key])
  });
  touchedFields.value.clear();
  emit('resetForm'); 
}

const hasActiveFilters = computed(() => {
  return Object.entries(localForm).some(([key, value]) => 
    value !== null && value !== '' && value !== false && value !== initialForm[key]
  );
});



</script>