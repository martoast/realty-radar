export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();

  try {
    const response = await $fetch('https://api.realestateapi.com/v2/PropertySearch', {
      method: 'POST',
      body: body,
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