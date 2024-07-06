<template>
    <div class="h-screen flex flex-col xl:flex-row">
      <div class="xl:w-3/4 lg:order-2">
        <div id="map" class="h-[40vh] lg:h-screen w-full"></div>
      </div>
      <div class="xl:w-1/4 lg:order-1 h-screen overflow-y-auto px-3 py-6">
        <div class="space-y-6">
          <label for="address" class="block text-sm font-medium leading-6 text-gray-900 pb-3">Property Search:</label>
          <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
          <label for="radius" class="block text-sm font-medium leading-6 text-gray-900">
            Search Radius: {{ searchParams.radius }} miles
          </label>
          <input
            v-model="searchParams.radius"
            type="range"
            min="1"
            max="10"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-gray-300"
          />
          <div class="flex items-center">
            <input
              v-model="searchParams.mlsActive"
              type="checkbox"
              id="mlsActive"
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label for="mlsActive" class="ml-2 block text-sm text-gray-900">
              MLS Active
            </label>
          </div>
          <button
            @click="searchProperties"
            :disabled="isLoading"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm disabled:opacity-50 hover:bg-secondary"
          >
            <span v-if="!isLoading">Search Properties</span>
            <span v-else>Searching...</span>
          </button>
        </div>
        <div v-if="error" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ error }}
        </div>
        <div v-if="searchResults" class="mt-8">
          <h2 class="text-xl font-semibold mb-4">Search Results ({{ searchResults.resultCount }})</h2>
          <div class="space-y-4">
            <div v-for="property in paginatedResults" :key="property.id" class="border rounded-lg shadow-md p-4">
              <h3 class="text-lg font-semibold mb-2">{{ property.address.address }}</h3>
              <p class="text-gray-600 mb-2">{{ property.address.city }}, {{ property.address.state }} {{ property.address.zip }}</p>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <p><span class="font-medium">Beds:</span> {{ property.bedrooms }}</p>
                <p><span class="font-medium">Baths:</span> {{ property.bathrooms }}</p>
                <p><span class="font-medium">Sq Ft:</span> {{ property.squareFeet }}</p>
                <p><span class="font-medium">Year Built:</span> {{ property.yearBuilt }}</p>
              </div>
              <div class="mt-4">
                <p class="text-lg font-bold text-indigo-600">${{ property.mlsListingPrice.toLocaleString() }}</p>
                <p class="text-sm text-gray-500">Estimated Value: ${{ property.estimatedValue.toLocaleString() }}</p>
              </div>
            </div>
          </div>
          <!-- Pagination controls -->
          <div class="mt-4 flex justify-between items-center">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>

const config = useRuntimeConfig();
const accessToken = config.public.MAPBOX_API_TOKEN;

const nuxtApp = useNuxtApp();
const mapboxgl = nuxtApp.mapboxgl;

const searchParams = reactive({
  address: null,
  state: null,
  city: null,
  postalCode: null,
  radius: 5,
  mlsActive: true,
  lat: null,
  lng: null
});

let map = null;
let marker = null;

const isLoading = ref(false);
const error = ref(null);

const searchResults = ref(null);

const currentPage = ref(1);
const resultsPerPage = 5;

const searchProperties = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    searchResults.value = await $fetch('/api/property-search', {
      method: 'POST',
      body: searchParams
    });
    updatePropertyMarkers(); // This will now update based on paginatedResults
  } catch (err) {
    console.error('Error searching properties:', err);
    error.value = err.message || 'An error occurred while searching properties';
  } finally {
    isLoading.value = false;
  }
};

const initMap = () => {
  mapboxgl.accessToken = accessToken;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-98.5795, 39.8283], // Center of the US
    zoom: 3
  });

  map.addControl(new mapboxgl.NavigationControl());

  map.on('load', () => {
    map.addSource('circle', {
      type: 'geojson',
      data: createGeoJSONCircle([0, 0], 0)
    });

    map.addLayer({
      id: 'circle-fill',
      type: 'fill',
      source: 'circle',
      paint: {
        'fill-color': '#0058ff',
        'fill-opacity': 0.4
      }
    });

    map.addLayer({
      id: 'circle-outline',
      type: 'line',
      source: 'circle',
      paint: {
        'line-color': '#0058ff',
        'line-width': 2
      }
    });

    // Add a new source and layer for property markers
    map.addSource('properties', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    map.addLayer({
      id: 'property-markers',
      type: 'circle',
      source: 'properties',
      paint: {
        'circle-radius': 6,
        'circle-color': '#0058ff',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });
  });
};

const updatePropertyMarkers = () => {
  if (map.getSource('properties') && paginatedResults.value) {
    const geojson = {
      type: 'FeatureCollection',
      features: paginatedResults.value.map(property => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [property.longitude, property.latitude]
        },
        properties: {
          id: property.id,
          address: property.address.address,
          price: property.mlsListingPrice
        }
      }))
    };

    map.getSource('properties').setData(geojson);

    // Fit the map to the property markers
    const bounds = new mapboxgl.LngLatBounds();
    geojson.features.forEach(feature => {
      bounds.extend(feature.geometry.coordinates);
    });
    map.fitBounds(bounds, { padding: 50 });
  }
};

const updateMap = (lng, lat) => {
  if (marker) {
    marker.remove();
  }
  marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  map.flyTo({
    center: [lng, lat],
    zoom: 12
  });

  updateCircle(lng, lat, searchParams.radius);
};

const updateCircle = () => {
  if (map.getSource('circle')) {
    let lng, lat;
    if (marker) {
      const lngLat = marker.getLngLat();
      lng = lngLat.lng;
      lat = lngLat.lat;
    } else {
      lng = searchParams.lng;
      lat = searchParams.lat;
    }

    if (lng && lat) {
      const circleData = createGeoJSONCircle([lng, lat], searchParams.radius);
      map.getSource('circle').setData(circleData);
    }
  }
};

const createGeoJSONCircle = (center, radiusInMiles, points = 64) => {
  const km = radiusInMiles * 1.60934; // Convert miles to kilometers
  const coords = {
    latitude: center[1],
    longitude: center[0]
  };

  const ret = [];
  const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [ret]
    }
  };
};

const handleUpdateAddress = (data) => {
  const [streetAddress, city, stateZip] = data.address.split(', ');
  const [state, postalCode] = stateZip.split(' ');
  
  searchParams.address = streetAddress;
  searchParams.state = state;
  searchParams.city = city;
  searchParams.postalCode = postalCode;
  searchParams.lng = data.longitude;
  searchParams.lat = data.latitude;
  
  updateMap(data.longitude, data.latitude);
};


const paginatedResults = computed(() => {
  if (!searchResults.value || !searchResults.value.data) return [];
  const start = (currentPage.value - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return searchResults.value.data.slice(start, end);
});

const totalPages = computed(() => {
  if (!searchResults.value || !searchResults.value.data) return 0;
  return Math.ceil(searchResults.value.data.length / resultsPerPage);
});

watch(() => searchParams.radius, () => {
  updateCircle();
});

// Update the watch function for currentPage
watch([() => currentPage.value, paginatedResults], () => {
  updatePropertyMarkers();
});

onMounted(() => {
  initMap();
});
</script>

<style>
@import 'mapbox-gl/dist/mapbox-gl.css';
</style>