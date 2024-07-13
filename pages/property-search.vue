<template>
    <div class="h-screen flex flex-col">
      <div class="p-4 bg-white border-b">
        <div class="flex flex-wrap items-center gap-4 max-w-7xl mx-auto">

          <div class="flex-grow min-w-[300px] relative w-40">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="text-gray-400">
                <path d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <custom-places-auto-complete @updateAddress="handleUpdateAddress" :initialAddress="searchParams.address" />
          </div>
          
          <div class="w-40">
            <MarketStatusDropdown @update:marketStatus="handleMarketStatusUpdate" :form="searchParams"/>
          </div>
          
          <div class="w-40">
            <BedsAndBathsDropdown @update:bedsAndBaths="handleBedsAndBathsUpdate" :form="searchParams"/>
          </div>

          <div class="w-40">
            <AdvancedSearchDropdown @update:advancedFilters="handleAdvancedFiltersUpdate" :form="searchParams" @resetForm="handleResetForm" />
          </div>

          

          <div class="w-40">
            <button
            @click="searchProperties"
            :disabled="isLoading || isFormEmpty || !searchParams.latitude || !searchParams.longitude || !searchParams.radius"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm disabled:opacity-50 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span v-if="!isLoading">Search Properties</span>
            <span v-else>Searching...</span>
          </button>
          </div>

          
          
          <button class="p-2 text-primary hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.0587 5.99992C6.21543 5.55436 6.5248 5.17866 6.932 4.93934C7.3392 4.70002 7.81796 4.61254 8.28348 4.69239C8.749 4.77224 9.17124 5.01427 9.47542 5.3756C9.77959 5.73694 9.94607 6.19427 9.94536 6.66659C9.94536 7.99992 7.94536 8.66659 7.94536 8.66659M7.9987 11.3333H8.00536M14.6654 7.99992C14.6654 11.6818 11.6806 14.6666 7.9987 14.6666C4.3168 14.6666 1.33203 11.6818 1.33203 7.99992C1.33203 4.31802 4.3168 1.33325 7.9987 1.33325C11.6806 1.33325 14.6654 4.31802 14.6654 7.99992Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="map" class="flex-grow"></div>
      <!-- Search Results Drawer -->
    <SearchResultsDrawer
      :is-open="drawerOpen"
      :search-results="searchResults"
      :current-page="currentPage"
      :results-per-page="resultsPerPage"
      @close="closeDrawer"
      @update-page="updatePage"
    />
    </div>
  </template>
  
<script setup>
const router = useRouter()
const route = useRoute()

const config = useRuntimeConfig();
const accessToken = config.public.MAPBOX_API_TOKEN;

const nuxtApp = useNuxtApp();
const mapboxgl = nuxtApp.mapboxgl;

const searchParams = reactive({});

const searchParamsFull = reactive({
  address: null,
  latitude: null,
  longitude: null,
  radius: null,
  mls_active: null,
  mls_pending: null,
  beds_min: null,
  beds_max: null,
  baths_min: null,
  baths_max: null,
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
});

let map = null;
let marker = null;

const isLoading = ref(false);
const error = ref(null);

const searchResults = shallowRef(null);

const currentPage = ref(1);
const resultsPerPage = 5;

const drawerOpen = ref(false);

const closeDrawer = () => {
  drawerOpen.value = false
}

const updatePage = (newPage) => {
  currentPage.value = newPage
}

const isFormEmpty = computed(() => {
  return Object.values(searchParams).every(value => value === null)
})

const searchProperties = async () => {
  isLoading.value = true;
  error.value = null;

  // Filter out null, empty, and false values from searchParams
  const apiParams = Object.entries(searchParams).reduce((acc, [key, value]) => {
    if (key !== 'address' && key !== 'mls_active' && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});


  // Ensure latitude, longitude, and radius are always included
  if (!apiParams.latitude || !apiParams.longitude || !apiParams.radius) {
    console.error('Missing required parameters');
    error.value = 'Missing required parameters: latitude, longitude, or radius';
    isLoading.value = false;
    return;
  }

  try {
    searchResults.value = await $fetch('/api/property-search', {
      method: 'POST',
      body: apiParams
    });
    drawerOpen.value = true; // Open the drawer when results are available
    currentPage.value = 1; // Reset to first page when new search is performed
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
    center: [-98.5795, 39.8283],
    zoom: 3
  });

  map.on('load', () => {
    addCircleToMap();
    // Add circle source and layers here
    if (searchParams.latitude && searchParams.longitude && searchParams.radius) {
      updateMap(searchParams.longitude, searchParams.latitude, searchParams.radius);
    }
  });
};

const addCircleToMap = () => {
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

const updateMap = (lng, lat, radius) => {
  if (marker) {
    marker.remove();
  }
  marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  map.flyTo({
    center: [lng, lat],
    zoom: 12
  });

  updateCircle(lng, lat, radius);
};

const updateCircle = () => {
  if (map.getSource('circle')) {
    const circleData = createGeoJSONCircle([searchParams.longitude, searchParams.latitude], searchParams.radius);
    map.getSource('circle').setData(circleData);
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
  searchParams.radius = searchParams.radius ?? 1;
  
  searchParams.address = data.address;
 
  searchParams.longitude = data.longitude;
  searchParams.latitude = data.latitude;
  
  updateMap(searchParams.longitude, searchParams.latitude, searchParams.radius );
};


const paginatedResults = computed(() => {
  if (!searchResults.value || !searchResults.value.data) return [];
  const start = (currentPage.value - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return searchResults.value.data.slice(start, end);
});

watch(() => searchParams.radius, () => {
  updateCircle();
});

// Update the watch function for currentPage
watch([() => currentPage.value, paginatedResults], () => {
  updatePropertyMarkers();
});

const handleBedsAndBathsUpdate = (newValue) => {
  // Handle the updated beds and baths values
  
  searchParams.beds_min = newValue.beds_min;
  searchParams.beds_max = newValue.beds_max;

  searchParams.baths_min = newValue.baths_min;
  searchParams.baths_max = newValue.baths_max;
}

const handleMarketStatusUpdate = (newStatus) => {
  Object.assign(searchParams, newStatus);
};

const handleAdvancedFiltersUpdate = (newFilters) => {
  Object.keys(newFilters).forEach(key => {
    if (newFilters[key] !== null && newFilters[key] !== undefined) {
      searchParams[key] = newFilters[key];
    } 
  });
};

  // Function to update URL query parameters
  const updateUrlParams = () => {
    const filteredParams = Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    router.replace({
      query: filteredParams
    });
  }

  watch(searchParams, updateUrlParams, { deep: true })

  const initializeFromUrl = () => {
  Object.keys(route.query).forEach(key => {
    if (key in searchParamsFull) {
      const value = route.query[key];
      if (value === 'true') {
        searchParams[key] = true;
      } else if (value === 'false') {
        searchParams[key] = false;
      } else if (value === '') {
        delete searchParams[key];
      } else if (!isNaN(Number(value))) {
        searchParams[key] = Number(value);
      } else {
        searchParams[key] = value;
      }
    }
  });
};

const handleResetForm = () => {
  const { address, latitude, longitude } = searchParams;
  
  // Reset searchParams to initial state
  Object.keys(searchParams).forEach(key => {
    if (key === 'radius') {
      searchParams[key] = 1;  // Set radius to 1 or the value provided
    } else if (typeof searchParams[key] === 'boolean') {
      searchParams[key] = false;  // Reset boolean fields to false
    } else {
      searchParams[key] = null;  // Reset other fields to null
    }
  });

  // Restore address-related fields
  searchParams.address = address;
  searchParams.latitude = latitude;
  searchParams.longitude = longitude;
}

onMounted(() => {
  initializeFromUrl();
  initMap();
  
});
</script>

<style>
@import 'mapbox-gl/dist/mapbox-gl.css';
</style>