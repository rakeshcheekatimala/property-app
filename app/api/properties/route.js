import connectDB from '@/config/database';
import Property from '@/models/Property';

/** 
 GET /api/properties
*/

export const GET = async (request) => {
  await connectDB();
  const properties = await Property.find({});
  try {
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
