<template>
    <Transition name="slide">
      <div v-if="isOpen" class="inset-y-0 right-0 max-w-full flex z-50">
        <div class="w-screen max-w-md">
          <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div class="p-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Search Results: {{searchResults.data.length ?? 0}}</h2>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Close panel</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- List Size Feedback Section -->
              <div class="mt-6 p-4 bg-gray-100 rounded-lg">
                <h2 class="text-lg font-semibold mb-2">List Size</h2>
                <div class="flex items-start space-x-4">
                  <div class="flex-1">
                    <div class="relative h-4 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        :class="[
                          'absolute h-full rounded-full',
                          { 'bg-red-500': listSizeCategory === 'narrow',
                            'bg-green-500': listSizeCategory === 'optimal',
                            'bg-yellow-500': listSizeCategory === 'broad' }
                        ]"
                        :style="{ width: `${listSizePercentage}%` }"
                      ></div>
                    </div>
                    <div class="flex justify-between mt-1 text-sm text-gray-600">
                      <span>Specific</span>
                      <span>Broad</span>
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600 mb-1">Your list size is defined by your search and filters.</p>
                    <p class="font-semibold" :class="{
                      'text-red-600': listSizeCategory === 'narrow',
                      'text-green-500': listSizeCategory === 'optimal',
                      'text-yellow-600': listSizeCategory === 'broad'
                    }">
                      Your list is {{ listSizeCategory }}.
                    </p>
                  </div>
                </div>
                <div class="mt-4 flex justify-between items-center">
                  <p>Results: <strong>{{ searchResults.data.length }}</strong></p>
                  <button 
                    class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                    :disabled="!canCreateList"
                    @click="createList"
                  >
                    Create List
                  </button>
                </div>
              </div>

              <div v-if="searchResults" class="mt-6 space-y-4">
                <NuxtLink v-for="property in paginatedResults" 
                  :key="property.id" 
                  :to="'/properties/' + property.id"
                  class="block border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                  <div>
                    <h3 class="text-lg font-semibold mb-2">{{ property.address.address }}</h3>
                    <p class="text-gray-600 mb-2">{{ property.address.city }}, {{ property.address.state }} {{ property.address.zip }}</p>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                      <p><span class="font-medium">Beds:</span> {{ property.bedrooms }}</p>
                      <p><span class="font-medium">Baths:</span> {{ property.bathrooms }}</p>
                      <p><span class="font-medium">Sq Ft:</span> {{ property.squareFeet ? property.squareFeet.toLocaleString() : 'N/A' }}</p>
                      <p><span class="font-medium">Year Built:</span> {{ property.yearBuilt ? property.yearBuilt : 'N/A' }}</p>
                    </div>
                    <div class="mt-4">
                      <p class="text-lg font-bold text-indigo-600">Estimated Value: ${{ property.estimatedValue ? property.estimatedValue.toLocaleString() : 'N/A' }}</p>
                      <p class="text-sm text-gray-500">Suggested Rent: ${{ property.suggestedRent ? property.suggestedRent.toLocaleString() : 'N/A' }}/mo</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              <!-- Pagination controls -->
              <div v-if="totalPages > 1" class="mt-4 flex justify-between items-center">
                <button 
                  @click="$emit('updatePage', currentPage - 1)" 
                  :disabled="currentPage === 1"
                  class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button 
                  @click="$emit('updatePage', currentPage + 1)" 
                  :disabled="currentPage === totalPages"
                  class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
</template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    isOpen: Boolean,
    searchResults: Object,
    currentPage: Number,
    resultsPerPage: Number
  })
  
  const emit = defineEmits(['close', 'updatePage', 'createList'])

  const paginatedResults = computed(() => {
    if (!props.searchResults || !props.searchResults.data) return []
    const start = (props.currentPage - 1) * props.resultsPerPage
    const end = start + props.resultsPerPage

    console.log(props.searchResults.data.slice(start, end))
    return props.searchResults.data.slice(start, end)
  })
  
  
  const totalPages = computed(() => {
    if (!props.searchResults || !props.searchResults.data) return 0
    return Math.ceil(props.searchResults.data.length / props.resultsPerPage)
  })

  // New computed properties for list size feedback
  const listSizePercentage = computed(() => {
    const totalResults = props.searchResults?.data?.length || 0
    // Adjust these thresholds as needed
    if (totalResults <= 10) return 25
    if (totalResults <= 50) return 50
    if (totalResults <= 100) return 75
    return 100
  })

  const listSizeCategory = computed(() => {
    if (listSizePercentage.value <= 25) return 'narrow'
    if (listSizePercentage.value <= 75) return 'optimal'
    return 'broad'
  })

  const canCreateList = computed(() => {
    return props.searchResults?.data?.length > 0
  })

  const createList = () => {
    emit('createList')
  }
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-out;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  </style>