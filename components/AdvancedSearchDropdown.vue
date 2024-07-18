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

            <!-- Updated Document Type Codes Section -->
        <Disclosure v-slot="{ open }">
          <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>Document Type</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-gray-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div class="space-y-4 w-full">
              <p class="text-sm text-gray-700">
                Filter your search properties based on how they were transacted. Find different Deed Types, Liens, Trustee Relationships, and more!
              </p>
              <div>
                <label for="document-type-code" class="block text-sm font-medium text-gray-700">Select Document Type Code</label>
                <select 
                  id="document-type-code"
                  :value="localForm.document_type_code"
                  @input="updateField('document_type_code', $event.target.value)"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a document type code</option>
                  <option v-for="option in documentTypeCodes" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
            
            <!-- Property Characteristics -->
            <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Property Value</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4 w-100">
                <div>
                  <p class="text-sm font-medium text-gray-700">Property Value</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.value_min" @input="updateField('value_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.value_max" @input="updateField('value_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Assessed Value</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <input type="number" :value="form.assessed_value_min" @input="updateField('assessed_value_min', $event.target.value)" placeholder="Min" min="0" class="p-1 text-sm border rounded">
                    <span class="text-gray-500">-</span>
                    <input type="number" :value="form.assessed_value_max" @input="updateField('assessed_value_max', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
              </div>
            </DisclosurePanel>
            </Disclosure>
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
              <span>Liens & Foreclosure</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="tax_lien" :checked="form.tax_lien" @change="updateField('tax_lien', $event.target.checked)" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="tax_lien" class="font-medium text-gray-700">Include Liens</label>
                  </div>
                </div>
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

          <!-- Operator Search Fields Section -->
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Equity</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-gray-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div class="space-y-4 w-full">
                <div>
                  <p class="text-sm font-medium text-gray-700">Estimated Equity</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <select :value="localForm.equity_operator" @input="updateField('equity_operator', $event.target.value)" class="p-1 text-sm border rounded flex-grow-0 flex-shrink-0 w-1/3">
                      <option value="gt">Greater than</option>
                      <option value="lt">Less than</option>
                      <option value="eq">Equal to</option>
                    </select>
                    <input type="number" :value="localForm.estimated_equity" @input="updateField('estimated_equity', $event.target.value)" placeholder="Value" class="p-1 text-sm border rounded flex-grow w-2/3">
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Equity Percent</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <select :value="localForm.equity_percent_operator" @input="updateField('equity_percent_operator', $event.target.value)" class="p-1 text-sm border rounded flex-grow-0 flex-shrink-0 w-1/3">
                      <option value="gt">Greater than</option>
                      <option value="lt">Less than</option>
                      <option value="eq">Equal to</option>
                    </select>
                    <div class="relative flex items-center flex-grow w-2/3">
                      <input 
                        type="number" 
                        :value="localForm.equity_percent" 
                        @input="updateField('equity_percent', $event.target.value)" 
                        placeholder="0-100" 
                        min="0" 
                        max="100" 
                        step="0.1"
                        class="p-1 pr-6 text-sm border rounded w-full"
                      >
                      <span class="absolute right-2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div class="flex items-end">
                    <p class="mt-1 text-xs text-gray-500">Enter a value between 0 and 100</p>

                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Radius & Size</span>
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
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-gray-300"
                />

                <div>
                  <p class="text-sm font-medium text-gray-700">Search Size</p>
                  <div class="mt-1">
                    <input type="number" :value="form.size" @input="updateField('size', $event.target.value)" placeholder="Max" min="0" class="p-1 text-sm border rounded">
                  </div>
                </div>
                
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
  //Property value
  value_min: null,
  value_max: null,
  assessed_value_min: null,
  assessed_value_max: null,
  // Property Characteristics fields
  building_size_min: null,
  building_size_max: null,
  lot_size_min: null,
  lot_size_max: null,
  year_built_min: null,
  year_built_max: null,

  // Foreclosure & Liens
  tax_lien: false,
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

  // Equity fields
  estimated_equity: null,
  equity_operator: null,
  equity_percent: null,
  equity_percent_operator: null,

  document_type_code: null,
 

  radius: 1,
  size: null
};

const documentTypeCodes = [
  { value: 'NULL', label: 'Unknown or not provided' },
  { value: 'DTAA', label: 'ASSIGNMENT OF SUB AGREEMENT OF SALE' },
  { value: 'DTAB', label: 'ASSIGNMENT OF SUB LEASE' },
  { value: 'DTAC', label: 'ASSIGNMENT OF COMMERCIAL LEASE' },
  { value: 'DTAD', label: 'ADMINISTRATORS DEED' },
  { value: 'DTAF', label: 'AFFIDAVIT' },
  { value: 'DTAG', label: 'AGREEMENT OF SALE' },
  { value: 'DTAH', label: 'ASSESSOR SALES HISTORY' },
  { value: 'DTAL', label: 'QUIT CLAIM ARM\'S LENGTH FOR NE STATES' },
  { value: 'DTAO', label: 'ASSIGNMENT OF DEED OF TRUST' },
  { value: 'DTAR', label: 'ASSIGNMENT OF AGREEMENT OF SALE' },
  { value: 'DTAS', label: 'ASSIGNMENT OF DEED' },
  { value: 'DTAT', label: 'AFFIDAVIT OF TRUST OR TRUST AGGREMENT' },
  { value: 'DTAU', label: 'ASSIGNMENT OF SUB COMMERCIAL LEASE' },
  { value: 'DTBD', label: 'BENEFICIARY DEED' },
  { value: 'DTBK', label: 'BANKRUPTCY' },
  { value: 'DTBS', label: 'BARGAIN AND SALE DEED' },
  { value: 'DTCA', label: 'COMMISSIONERS ASSIGNMENT OF LEASE' },
  { value: 'DTCD', label: 'CONDOMINIUM DEED' },
  { value: 'DTCE', label: 'COMMITTEE' },
  { value: 'DTCF', label: 'ONE OF COMMITTEE, STRICT FORECLOSURE, SHERIFF, OR REDEMPTION DEEDS' },
  { value: 'DTCH', label: 'CASH SALE DEED' },
  { value: 'DTCL', label: 'COMMERCIAL LEASE' },
  { value: 'DTCM', label: 'COMMISSIONERS DEED' },
  { value: 'DTCN', label: 'CANCELLATION OF AGREEMENT OF SALE' },
  { value: 'DTCO', label: 'CONSERVATORS DEED' },
  { value: 'DTCP', label: 'CORPORATION DEED' },
  { value: 'DTCR', label: 'CORRECTION DEED' },
  { value: 'DTCS', label: 'CONTRACT SALE' },
  { value: 'DTCT', label: 'CERTIFICATE OF TRANSFER' },
  { value: 'DTCV', label: 'CONVEYANCE' },
  { value: 'DTDB', label: 'DEED OF DISTRIBUTION' },
  { value: 'DTDC', label: 'DECLARATION' },
  { value: 'DTDD', label: 'TRANSFER ON DEATH DEED' },
  { value: 'DTDE', label: 'DEED' },
  { value: 'DTDG', label: 'DEED OF GUARDIAN' },
  { value: 'DTDJ', label: 'AFFIDAVIT OF DEATH OF JOINT TENANT' },
  { value: 'DTDL', label: 'DEED IN LIEU OF FORECLOSURE' },
  { value: 'DTDP', label: 'DUAL PURPOSE DOCUMENT' },
  { value: 'DTDS', label: 'DISTRESS SALE' },
  { value: 'DTDT', label: 'AFFIDAVIT OF DEATH' },
  { value: 'DTDX', label: 'TAX DEED' },
  { value: 'DTEC', label: 'EXCHANGE' },
  { value: 'DTES', label: 'LIFE ESTATE' },
  { value: 'DTEX', label: 'EXECUTORS DEED' },
  { value: 'DTFC', label: 'FORECLOSURE' },
  { value: 'DTFD', label: 'FIDUCIARY DEED' },
  { value: 'DTFP', label: 'CERTIFICATE OF PURCHASE' },
  { value: 'DTGD', label: 'GRANT DEED' },
  { value: 'DTGE', label: 'ONE OF CONSERVATOR, EXECUTOR, GUARDIAN, GRANT, TAX COLLECTOR, OR TRUSTEE DEEDS' },
  { value: 'DTGF', label: 'GIFT DEED' },
  { value: 'DTGR', label: 'GROUND LEASE' },
  { value: 'DTID', label: 'INDIVIDUAL DEED' },
  { value: 'DTIT', label: 'INTRAFAMILY TRANSFER' },
  { value: 'DTJT', label: 'JOINT TENANCY DEED' },
  { value: 'DTLA', label: 'LEGAL ACTION/COURT ORDER' },
  { value: 'DTLC', label: 'LEASEHOLD CONV. WITH AGREEM. OF SALE (FEE PURCHASE)' },
  { value: 'DTLD', label: 'LAND CONTRACT' },
  { value: 'DTLE', label: 'LEASE' },
  { value: 'DTLH', label: 'ASSIGNMENT OF LEASE (LEASEHOLD SALE)' },
  { value: 'DTLS', label: 'LEASEHOLD CONV. W/AN AGREEMENT OF SALE' },
  { value: 'DTLT', label: 'LAND COURT' },
  { value: 'DTLW', label: 'LIMITED WARRANTY DEED' },
  { value: 'DTMD', label: 'SPECIAL MASTER DEED' },
  { value: 'DTMF', label: 'MANUF HOUSING' },
  { value: 'DTMG', label: 'MORTGAGEE' },
  { value: 'DTML', label: 'MORTGAGE LIEN' },
  { value: 'DTMN', label: 'MUNICIPAL' },
  { value: 'DTMO', label: 'LOAN MODIFICATION' },
  { value: 'DTMX', label: 'LOAN MODIFICATION, CONSOLIDATION AND EXTENSION' },
  { value: 'DTOT', label: 'OTHER' },
  { value: 'DTPA', label: 'PUBLIC ACTION' },
  { value: 'DTPD', label: 'PARTNERSHIP DEED' },
  { value: 'DTPR', label: 'PERSONAL REPRESENTATIVE DEED' },
  { value: 'DTQC', label: 'QUIT CLAIM DEED' },
  { value: 'DTR1', label: 'LOAN 1 (ONLY) IS A REVERSE MORTGAGE' },
  { value: 'DTR2', label: 'LOAN 2 (ONLY) IS A REVERSE MORTGAGE' },
  { value: 'DTR3', label: 'LOAN 3 (ONLY) IS A REVERSE MORTGAGE' },
  { value: 'DTR4', label: 'LOANS 1 AND 2 ARE BOTH REVERSE MORTGAGES' },
  { value: 'DTR5', label: 'LOANS 1 AND 3 ARE BOTH REVERSE MORTGAGES' },
  { value: 'DTR6', label: 'LOANS 1, 2 AND 3 ARE ALL REVERSE MORTGAGES' },
  { value: 'DTR7', label: 'LOANS 2 AND 3 ARE BOTH REVERSE MORTGAGES' },
  { value: 'DTRA', label: 'RELEASE/SATIS. OF AGREM. OF SALE (FEE PROPERTY)' },
  { value: 'DTRC', label: 'RECEIVERS DEED' },
  { value: 'DTRD', label: 'REDEMPTION DEED' },
  { value: 'DTRE', label: 'COMBINE TABLE REO DEED' },
  { value: 'DTRF', label: 'REFEREE\'S DEED - USED TO TRANSFER PROPERTY PURSUANT TO A FORECLOSURE SALE IN NEW YORK COUNTIES' },
  { value: 'DTRL', label: 'RELEASE/SATIS. OF AGREM. OF SALE (LEASEHOLD)' },
  { value: 'DTRR', label: 'RE-RECORDED DOCUMENT' },
  { value: 'DTRS', label: 'REO SALE (REO OUT)' },
  { value: 'DTSA', label: 'SUB AGREEMENT OF SALE' },
  { value: 'DTSC', label: 'SUB COMMERCIAL LEASE' },
  { value: 'DTSD', label: 'SHERIFFS DEED' },
  { value: 'DTSL', label: 'SUB LEASE' },
  { value: 'DTSS', label: 'ASSUMPTION DEED' },
  { value: 'DTST', label: 'AFFIDAVIT DEATH OF TRUSTEE/SUCCESSOR TRUSTEE' },
  { value: 'DTSV', label: 'SURVIVORSHIP DEED' },
  { value: 'DTSW', label: 'SPECIAL WARRANTY DEED' },
  { value: 'DTTC', label: 'TAX COLLECTOR' },
  { value: 'DTTD', label: 'TRUSTEES DEED' },
  { value: 'DTTR', label: 'DEED OF TRUST' },
  { value: 'DTVL', label: 'VENDERS LIEN' },
  { value: 'DTWD', label: 'WARRANTY DEED' },
  { value: 'DTXX', label: 'TRANSACTION HISTORY RECORD' },
  { value: 'XXXX', label: 'Unknown' }
];

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
    if (newValue[key] !== null && newValue[key] !== '') {
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