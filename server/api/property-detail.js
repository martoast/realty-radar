export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const runtimeConfig = useRuntimeConfig();
    
    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Property ID is required'
      });
    }
  
    try {
      const response = await $fetch('https://api.realestateapi.com/v2/PropertyDetail', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': runtimeConfig.REAL_ESTATE_API_KEY
        }
      });
      return response;
    } catch (error) {
      console.error('Error in property detail API:', error);
      throw createError({
        statusCode: error.status || 500,
        statusMessage: error.statusText || 'Internal Server Error',
        message: error.data?.message || 'Error fetching property detail data'
      });
    }
  });