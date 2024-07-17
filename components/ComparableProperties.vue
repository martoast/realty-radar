<template>
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-3">Comparable Properties</h3>
      <div class="mt-8 space-y-20 lg:space-y-20">
        <article v-for="comp in comps" :key="comp.id" class="relative isolate flex flex-col gap-8 lg:flex-row">
          <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img :src="comp.imgSrc" alt="Property Image" class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div>
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="comp.lastSaleDate" class="text-gray-500">{{ formatDate(comp.lastSaleDate) }}</time>
              <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{{ comp.propertyUse }}</span>
            </div>
            <div class="group relative max-w-xl">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                {{ comp.address.address }}
              </h3>
              <p class="mt-5 text-sm leading-6 text-gray-600">
                {{ removeTrailingZeros(comp.bedrooms) }} beds | {{ removeTrailingZeros(comp.bathrooms) }} baths | {{ comp.squareFeet }} sqft | {{comp.lotSquareFeet}} lot sqft | {{comp.yearBuilt}} year built
              </p>
            </div>
            <div class="mt-6 flex border-t border-gray-900/5 pt-6">
              <div class="relative flex items-center gap-x-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Estimated value</p>
                  <p class="text-gray-600">{{ formatCurrency(comp.estimatedValue) }}</p>
                </div>
              </div>
              <div class="relative flex items-center gap-x-4 ml-6">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Price</p>
                  <p class="text-gray-600">{{ formatCurrency(comp.zillowPrice) }}</p>
                </div>
              </div>
              <div class="relative flex items-center gap-x-4 ml-6">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Rent</p>
                  <p class="text-gray-600">{{ formatCurrency(comp.zillowRentZestimate) }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    comps: {
      type: Array,
      required: true
    }
  })
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  const formatCurrency = (value) => {
    if (typeof value !== 'number' && typeof value !== 'string') return 'N/A'
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numValue)
  }
  
  const removeTrailingZeros = (value) => {
    if (typeof value === 'string') {
      value = value.trim()
      if (!isNaN(parseFloat(value))) {
        return value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')
      }
    }
    return value
  }
  </script>