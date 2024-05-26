import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getUserSession } from '@/utils/getSessionUser';

/** 
 GET /api/properties/:id
*/

export const GET = async (request, { params }) => {
  await connectDB();
  const property = await Property.findById(params.id);

  if (!property) return new Response('Property not found', { status: 400 });

  try {
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

/** 
 DELETE /api/properties/:id
*/

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const propertyId = params.id;
    const sessionUser = await getUserSession();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) throw new Error('Property Not Found');

    console.log('property', property);
    // Verify ownership
    if (property.owner.toString() !== userId) {
      throw new Error('Unauthorized', { status: 401 });
    }

    // Proceed with property deletion
    await property.deleteOne();
    return new Response('Property Deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
