// server/api/property-search.post.js

import { getStateAbbreviation } from '~/utils/stateAbbreviation';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();

  // Convert full state name to abbreviation
  const stateAbbreviation = getStateAbbreviation(body.state);

  try {
    const response = await $fetch('https://api.realestateapi.com/v2/PropertySearch', {
      method: 'POST',
      body: {
        address: body.address,
        state: stateAbbreviation,
        city: body.city,
        zip: body.postalCode,
        radius: body.radius,
        mls_active: body.mlsActive,
        // Add any other necessary parameters
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': runtimeConfig.REAL_ESTATE_API_KEY
      }
    });

    return response;
  } catch (error) {
    console.error('Error in property search API:', error);
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.statusText || 'Internal Server Error',
      message: error.data?.message || 'Error fetching property data'
    });
  }
});