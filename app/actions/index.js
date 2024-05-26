'use server';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data for given id ', id);
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchPropertiesByUser(id) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/user/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data for given id ', id);
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deletePropertiesById(propertyId) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${propertyId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data for given id ', propertyId);
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
