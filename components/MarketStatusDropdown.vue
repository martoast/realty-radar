<template>
  <Menu as="div" class="relative inline-block text-left w-40">
    <div>
      <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {{ selectedStatusLabel }}
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
      <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-for="status in marketStatuses" :key="status.value" v-slot="{ active }">
            <a 
              href="#" 
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
              @click.prevent="selectStatus(status)"
            >
              {{ status.label }}
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['update:marketStatus'])

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const marketStatuses = [
  { label: 'On market', value: { mls_active: true } },
  { label: 'Off market', value: { mls_active: false } },
  { label: 'Pending', value: { mls_pending: true} }
]

const selectedStatus = ref(null)

const selectedStatusLabel = computed(() => selectedStatus.value?.label || 'Market Status')

const selectStatus = (status) => {
  selectedStatus.value = status
  emit('update:marketStatus', status.value)
}

const updateSelectedStatus = () => {
  const currentStatus = marketStatuses.find(status => 
    status.value.mls_pending === props.form.mls_pending && 
    status.value.mls_active === props.form.mls_active
  )
  selectedStatus.value = currentStatus || null
}

watch(() => props.form, updateSelectedStatus, { immediate: true, deep: true })
</script>