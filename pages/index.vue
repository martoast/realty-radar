<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Main content container -->
    <div class="flex-grow overflow-auto transition-all duration-300 ease-in-out">
      <!-- Your main content goes here -->
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Main Content</h1>
        <p>This is your main content. It will shift when the drawer opens.</p>
        <button @click="toggleDrawer" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {{ isDrawerOpen ? 'Close' : 'Open' }} Drawer
        </button>
      </div>
    </div>

    <!-- Drawer component -->
    <div
      class="flex-shrink-0 overflow-x-hidden transition-all duration-300 ease-in-out"
      :class="{ 'w-0': !isDrawerOpen, 'w-64': isDrawerOpen }"
    >
      <div class="h-full w-64 bg-gray-300 shadow-xl overflow-y-auto">
        <div class="px-4 py-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-medium text-gray-900">Drawer Content</h2>
            <button
              @click="toggleDrawer"
              class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <!-- Drawer content goes here -->
          <div class="space-y-4">
            <p>This is the drawer content.</p>
            <p>It pushes the main content aside when open.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const isDrawerOpen = ref(false)

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>