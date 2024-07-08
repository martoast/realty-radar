<template>
  <div>
      <mapbox-search-box
              ref="searchBoxRef"
              :access-token="access_token"
              :placeholder="placeholder"
              :options="{
                country: 'US',
                limit: 6,
                bbox: [-171.791110603, 18.91619, -66.96466, 71.3577635769],
              }"
              types="address"
              @retrieve="handleRetrieve"
              proximity="ip"
            >
          </mapbox-search-box>
  </div>
</template>

<script setup>

const config = useRuntimeConfig()

const access_token = config.public.MAPBOX_API_TOKEN;

const emit = defineEmits(['updateAddress'])

const props = defineProps({
initialAddress: {
  type: String,
  default: ''
}
})

const searchBoxRef = ref(null)
const placeholder = ref('Search address')

watch(() => props.initialAddress, (newValue) => {
if (newValue) {
  setSearchBoxValue(newValue)
} else {
  setSearchBoxValue('')
}
})

onMounted(() => {
if (props.initialAddress) {
  setSearchBoxValue(props.initialAddress)
}
})

const setSearchBoxValue = (value) => {
if (searchBoxRef.value) {
  // Try to set the value directly on the component
  if (typeof searchBoxRef.value.value !== 'undefined') {
    searchBoxRef.value.value = value
  } else {
    // If that doesn't work, try to find the input element
    const inputElement = searchBoxRef.value.$el.querySelector('input')
    if (inputElement) {
      inputElement.value = value
    }
  }
}
}

const handleRetrieve = async (event) => {
if (event.detail.features.length) {
  const latitude = event.detail.features[0].properties.coordinates.latitude;
  const longitude = event.detail.features[0].properties.coordinates.longitude;
  const address = event.detail.features[0].properties.full_address;

  emit('updateAddress', { latitude, longitude, address });
} else {
  alert('You must search a location and select from the dropdown menu.');
}
};
</script>