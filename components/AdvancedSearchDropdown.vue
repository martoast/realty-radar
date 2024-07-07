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
        <MenuItems class="absolute left-0 z-10 mt-2 w-100 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <Disclosure v-slot="{ open }">
              <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Property Characteristics</span>
                <ChevronUpIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-gray-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div class="space-y-4">
                  <div>
                    <p class="text-sm font-medium text-gray-700">Square Feet</p>
                    <div class="mt-1 flex items-center space-x-2">
                      <input type="number" v-model="form.sqft_min" placeholder="Min" min="0" class="w-24 p-1 text-sm border rounded">
                      <span class="text-gray-500">-</span>
                      <input type="number" v-model="form.sqft_max" placeholder="Max" min="0" class="w-24 p-1 text-sm border rounded">
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700">Lot Size</p>
                    <div class="mt-1 flex items-center space-x-2">
                      <input type="number" v-model="form.lot_size_min" placeholder="Min" min="0" class="w-24 p-1 text-sm border rounded">
                      <span class="text-gray-500">-</span>
                      <input type="number" v-model="form.lot_size_max" placeholder="Max" min="0" class="w-24 p-1 text-sm border rounded">
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700">Year Built</p>
                    <div class="mt-1 flex items-center space-x-2">
                      <input type="number" v-model="form.year_built_min" placeholder="Min" min="0" class="w-24 p-1 text-sm border rounded">
                      <span class="text-gray-500">-</span>
                      <input type="number" v-model="form.year_built_max" placeholder="Max" min="0" class="w-24 p-1 text-sm border rounded">
                    </div>
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>

            <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Auctions & Pre-Foreclosure</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-medium text-gray-700">Foreclosure Status</p>
                  <select v-model="form.foreclosure_status" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option value="">Any</option>
                    <option value="pre_foreclosure">Pre-Foreclosure</option>
                    <option value="auction">Auction</option>
                    <option value="bank_owned">Bank Owned</option>
                  </select>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Recording Date</p>
                  <input type="date" v-model="form.recording_date" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="active_auction" v-model="form.active_auction" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="active_auction" class="font-medium text-gray-700">Active Auction</label>
                    <p class="text-gray-500">Used to include properties which are scheduled to go to auction.</p>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Auction Date</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="date" v-model="form.auction_date_min" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <span class="text-gray-500">-</span>
                    <input type="date" v-model="form.auction_date_max" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="exclude_foreclosures" v-model="form.exclude_foreclosures" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="exclude_foreclosures" class="font-medium text-gray-700">Exclude Foreclosures</label>
                    <p class="text-gray-500">Don't include properties with the foreclosure attribute.</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="bank_owned" v-model="form.bank_owned" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="bank_owned" class="font-medium text-gray-700">Bank Owned (REO)</label>
                    <p class="text-gray-500">Used to find properties which are owned by the bank.</p>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure v-slot="{ open }">
          <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>Ownership & Occupancy</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-gray-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div class="space-y-4">
              <div>
                <p class="text-sm font-medium text-gray-700">Owner Type</p>
                <select v-model="form.owner_type" multiple class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                  <option value="trust">Trust</option>
                  <!-- Add more options as needed -->
                </select>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Purchase Date</p>
                <div class="mt-1 flex items-center space-x-2">
                  <input type="date" v-model="form.purchase_date_min" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <span class="text-gray-500">-</span>
                  <input type="date" v-model="form.purchase_date_max" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Years Owned</p>
                <div class="mt-1 flex items-center space-x-2">
                  <input type="number" v-model="form.years_owned_min" placeholder="No Min" min="0" class="w-24 p-1 text-sm border rounded">
                  <span class="text-gray-500">-</span>
                  <input type="number" v-model="form.years_owned_max" placeholder="No Max" min="0" class="w-24 p-1 text-sm border rounded">
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Purchase Price ($)</p>
                <div class="mt-1 flex items-center space-x-2">
                  <input type="number" v-model="form.purchase_price_min" placeholder="No Min" min="0" class="w-24 p-1 text-sm border rounded">
                  <span class="text-gray-500">-</span>
                  <input type="number" v-model="form.purchase_price_max" placeholder="No Max" min="0" class="w-24 p-1 text-sm border rounded">
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Absentee Owner</p>
                <select v-model="form.absentee_owner" multiple class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Occupancy</p>
                <select v-model="form.occupancy" multiple class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="owner_occupied">Owner Occupied</option>
                  <option value="tenant_occupied">Tenant Occupied</option>
                  <option value="vacant">Vacant</option>
                </select>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
  
            
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>
  
  <script setup>
  import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
  import { reactive, watch } from 'vue'
  
  const emit = defineEmits(['update:advancedFilters'])
  
  const form = reactive({
    // Property Characteristics fields
    sqft_min: null,
    sqft_max: null,
    lot_size_min: null,
    lot_size_max: null,
    year_built_min: null,
    year_built_max: null,

    // Auctions & Pre-Foreclosure fields
    foreclosure_status: '',
    recording_date: null,
    active_auction: false,
    auction_date_min: null,
    auction_date_max: null,
    exclude_foreclosures: false,
    bank_owned: false,

    // Ownership & Occupancy fields
    owner_type: [],
    purchase_date_min: null,
    purchase_date_max: null,
    years_owned_min: null,
    years_owned_max: null,
    purchase_price_min: null,
    purchase_price_max: null,
    absentee_owner: [],
    occupancy: [],
  });
  
  watch(form, (newValue) => {
    emit('update:advancedFilters', newValue)
  }, { deep: true })
  
  </script>