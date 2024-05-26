import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getUserSession } from '@/utils/getSessionUser';

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

export const POST = async (request) => {
  await connectDB();
  const session = await getUserSession();

  if (!session || !session.userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { userId } = session;

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    // Access all values from amenities and images
    const amenities = formData.getAll('amenities');

    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    // Create propertyData object for database
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    // read the images , turn it into array buffer
    // get the data from array buffer and upload it to cloudinary, which gives imageurl
    // save this to propertyData

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert imageData to base 64

      const imageBase64 = imageData.toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'propertyapp' }
      );
      imageUploadPromises.push(result.secure_url);
      // wait for all images to upload

      const uploadImages = await Promise.all(imageUploadPromises);

      // add upload Images to propertyData

      propertyData.images = uploadImages;
    }

    const newProperty = new Property(propertyData);
    newProperty.save();
    console.log(propertyData);
    return new Response(
      JSON.stringify({ message: 'Success' }, { status: 200 })
    );
  } catch (error) {
    return new Response(JSON.stringify('Failed to add property'), {
      status: 500,
    });
  }
};
