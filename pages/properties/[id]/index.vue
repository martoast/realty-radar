<template>
  <div class="bg-white min-h-screen">
    <div class="container mx-auto">
      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        
        <div class="mb-4">
          <button @click="goBack" type="button" class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>

        <div v-if="propertyDetail && zillowData" class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <!-- Property image -->
          <div class="lg:col-span-4 lg:row-end-1">
            <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img :src="zillowData.imgSrc || 'https://via.placeholder.com/400x300'" :alt="propertyDetail?.propertyInfo?.address?.label" class="object-cover object-center" />
            </div>
          </div>

          <!-- Property details -->
          <div class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div class="flex flex-col-reverse">
              <div class="mt-4">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-3">{{ propertyDetail?.propertyInfo?.address?.label ?? "N/A" }}</h1>

                <p class="text-3xl font-semibold tracking-tight text-indigo-600 mb-3">
                  {{ formatCurrency(zillowData.price) }}
                </p>
                <p class="mt-2 text-sm text-gray-500">
                  Last updated: {{ formatDate(propertyDetail.lastUpdateDate) }}
                </p>
              </div>
            </div>

            <p class="mt-6 text-gray-500">{{ zillowData.description }}</p>

            <!-- Info Sections -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <!-- General Information -->
                <section>
                  <h3 class="text-xl font-semibold text-gray-900">General Information</h3>
                  <div class="space-y-2 text-sm text-gray-500 mt-2">
                    <p><span class="font-medium">Property Type:</span> {{ propertyDetail.propertyType }}</p>
                    <p><span class="font-medium">Bedrooms:</span> {{ propertyDetail.propertyInfo.bedrooms }}</p>
                    <p><span class="font-medium">Bathrooms:</span> {{ propertyDetail.propertyInfo.bathrooms }}</p>
                    <p><span class="font-medium">Year Built:</span> {{ propertyDetail.propertyInfo.yearBuilt ?? 'N/A' }}</p>
                    <p><span class="font-medium">Lot Size:</span> {{ formatNumber(propertyDetail.propertyInfo.lotSquareFeet) ?? 'N/A' }} sqft</p>
                    <p><span class="font-medium">Living Area:</span> {{ formatNumber(propertyDetail.propertyInfo.livingSquareFeet) ?? 'N/A' }} sqft</p>
                  </div>
                </section>
  
                <!-- Financial Information -->
                <section>
                  <h3 class="text-xl font-semibold text-gray-900">Financial Information</h3>
                  <div class="space-y-2 text-sm text-gray-500 mt-2">
                    <p><span class="font-medium">Rent Zestimate:</span> {{ formatCurrency(zillowData.rentZestimate) ?? 'N/A'}}</p>
                    <p><span class="font-medium">Zestimate:</span> {{ formatCurrency(zillowData.zestimate) ?? 'N/A'}}</p>
                    <p><span class="font-medium">Estimated Value:</span> {{ formatCurrency(propertyDetail.estimatedValue) ?? 'N/A'}}</p>
                    <p><span class="font-medium">Estimated Equity:</span> {{ formatCurrency(propertyDetail.estimatedEquity) ?? 'N/A'}}</p>
                    <p><span class="font-medium">Equity Percentage:</span> {{ propertyDetail.equityPercent ? `${propertyDetail.equityPercent}%` : 'N/A' }}</p>
                    <p><span class="font-medium">Estimated Mortgage Balance:</span> {{ formatCurrency(propertyDetail.estimatedMortgageBalance) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Estimated Mortgage Payment:</span> {{ formatCurrency(propertyDetail.estimatedMortgagePayment) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Deed in Lieu:</span> {{ propertyDetail.deedInLieu ? 'Yes' : 'No' }}</p>
                    <p><span class="font-medium">Lieu:</span> {{ propertyDetail.lien ? 'Yes' : 'No' }}</p>
                    <p><span class="font-medium">Tax Lien:</span> {{ propertyDetail.taxLien? 'Yes' : 'No' }}</p>
                    
                  </div>
                </section>
            </div>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <a :href="'https://www.zillow.com' + zillowData.url" target="_blank">
                <button type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">View on Zillow</button>
              </a>
              <button type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Contact Agent</button>
            </div>

            

            <div class="mt-10 border-t border-gray-200 pt-10">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Comparable Properties</h3>
              <div class="mt-16 space-y-20 lg:space-y-20">
                <article v-for="comp in displayedComps" :key="comp.id" class="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img :src="`https://maps.googleapis.com/maps/api/staticmap?center=${comp.latitude},${comp.longitude}&zoom=15&size=400x400&key=` + googlemapsApiKey" alt="Property Map" class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
                    <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div class="flex items-center gap-x-4 text-xs">
                      <time :datetime="comp.lastSaleDate" class="text-gray-500">{{ formatDate(comp.lastSaleDate) }}</time>
                      <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{{ comp.propertyType }}</span>
                    </div>
                    <div class="group relative max-w-xl">
                      <a :href="'/properties/' + comp.propertyId">
                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {{ comp.address.address }}, {{ comp.address.city }}, {{ comp.address.state }} {{ comp.address.zip }}
                      </h3>
                    </a>
                      
                      <p class="mt-5 text-sm leading-6 text-gray-600">
                        {{ removeTrailingZeros(comp.bedrooms) }} beds | {{ removeTrailingZeros(comp.bathrooms) }} baths | {{ comp.squareFeet }} sqft
                      </p>
                    </div>
                    <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div class="relative flex items-center gap-x-4">
                        <div class="text-sm leading-6">
                          <p class="font-semibold text-gray-900">Estimated Value</p>
                          <p class="text-gray-600">{{ formatCurrency(comp.estimatedValue) }}</p>
                        </div>
                      </div>
                      <div class="relative flex items-center gap-x-4 ml-6">
                        <div class="text-sm leading-6">
                          <p class="font-semibold text-gray-900">Last Sale Amount</p>
                          <p class="text-gray-600">{{ formatCurrency(comp.lastSaleAmount) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div class="border-b border-gray-200">
                <TabList class="-mb-px flex space-x-8">
                  <Tab v-slot="{ selected }">
                    <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">Lot Info</button>
                  </Tab>
                  <Tab v-slot="{ selected }">
                    <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">Nearby Places</button>
                  </Tab>
                  <Tab v-slot="{ selected }">
                    <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">Price History</button>
                  </Tab>
                </TabList>
              </div>
              <TabPanels>
                <TabPanel class="pt-10">
                  <h3 class="sr-only">Lot Info</h3>
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">APN (Assessor's Parcel Number)</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.apn }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Land Use</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.landUse }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Property Use</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.propertyUse }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Property Class</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.propertyClass }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Lot Number</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.lotNumber }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Lot Size (Square Feet)</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ formatNumber(propertyDetail.lotInfo.lotSquareFeet) }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Lot Size (Acres)</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ formatNumber(propertyDetail.lotInfo.lotAcres, 2) }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Subdivision</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.subdivision }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Zoning</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.zoning || 'N/A' }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Census Tract</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.censusTract }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Census Block</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.censusBlock }}</dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt class="text-sm font-medium text-gray-500">Legal Description</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ propertyDetail.lotInfo.legalDescription }}</dd>
                    </div>
                  </dl>
                </TabPanel>
                <TabPanel class="pt-10">
                  <h3 class="sr-only">Nearby Places</h3>
                  <ul role="list" class="divide-y divide-gray-200">
                    <li v-for="hospital in nearbyHospitals" :key="hospital.name" class="py-4 flex">
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">{{ hospital.name }}</p>
                        <p class="text-sm text-gray-500">{{ hospital.distance }} miles away</p>
                      </div>
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel class="pt-10">
                  <h3 class="sr-only">Price History</h3>
                  <div class="flow-root">
                    <ul role="list" class="-mb-8">
                      <li v-for="(event, eventIdx) in propertyDetail.priceHistory" :key="event.date">
                        <div class="relative pb-8">
                          <span v-if="eventIdx !== propertyDetail.priceHistory.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          <div class="relative flex space-x-3">
                            <div>
                              <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                                </svg>
                              </span>
                            </div>
                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p class="text-sm text-gray-500">{{ event.event }}: <span class="font-medium text-gray-900">{{ formatCurrency(event.price) }}</span></p>
                              </div>
                              <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                <time :datetime="event.date">{{ formatDate(event.date) }}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
        <div v-else-if="error" class="text-red-500">
          Error: {{ error }}
        </div>
        <div v-else class="text-gray-500">
          Loading property details...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const config = useRuntimeConfig()
const zillowApiKey = config.public.ZILLOW_API_KEY

const googlemapsApiKey = config.public.GOOGLE_MAPS_API_KEY

const route = useRoute()
const router = useRouter()
const propertyDetail = ref(null)
const error = ref(null)
const zillowData = ref(null)
const nearbyHospitals = ref([])

const fetchPropertyDetail = async () => {
  try {
    const response = await $fetch('/api/property-detail', {
      method: 'POST',
      body: { id: route.params.id, comps: true }
    })
    propertyDetail.value = response.data
    await triggerApiRequests()
  } catch (err) {
    console.error('Error fetching property detail:', err)
    error.value = err.message || 'An error occurred while fetching property details'
  }
}

const triggerApiRequests = async () => {
  if (propertyDetail.value?.propertyInfo?.address) {
    const fullAddress = propertyDetail.value.propertyInfo.address.label
    await fetchZillowData(fullAddress)
    await fetchNearbyPlaces(
      propertyDetail.value.propertyInfo.latitude,
      propertyDetail.value.propertyInfo.longitude,
      'hospital'
    )
  }
}

const fetchZillowData = async (address) => {
  try {
    const response = await $fetch(`https://zillow-com1.p.rapidapi.com/property?address=${encodeURIComponent(address)}`, {
      headers: {
        'X-RapidAPI-Key': zillowApiKey,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      },
    })
    zillowData.value = response
  } catch (err) {
    console.error('Error fetching Zillow data:', err)
  }
}

const fetchNearbyPlaces = async (latitude, longitude, type) => {
  try {
    // Implement the logic to fetch nearby places
    // This could be another API call or a different endpoint
    // For now, we'll just set some dummy data
    nearbyHospitals.value = [
      { name: 'Hospital A', distance: 2.5 },
      { name: 'Hospital B', distance: 3.7 },
    ]
  } catch (err) {
    console.error('Error fetching nearby places:', err)
  }
}

onMounted(fetchPropertyDetail)

const formatCurrency = (value) => {
  if (typeof value !== 'number' && typeof value !== 'string') return 'N/A'
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numValue)
}

const formatNumber = (value, decimalPlaces = 0) => {
  if (typeof value !== 'number') return 'N/A'
  return value.toLocaleString(undefined, { 
    minimumFractionDigits: decimalPlaces, 
    maximumFractionDigits: decimalPlaces 
  })
}

const removeTrailingZeros = (value) => {
  if (typeof value === 'string') {
    // First, trim any whitespace
    value = value.trim()
    // Check if the value is a valid number
    if (!isNaN(parseFloat(value))) {
      // Remove trailing zeros after the decimal point, but keep the decimal if there are non-zero digits after it
      return value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')
    }
  }
  return value
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const goBack = () => {
  router.back()
}

const displayedComps = computed(() => propertyDetail.value?.comps.slice(0, 5) || [])


</script>