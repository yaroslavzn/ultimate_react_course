import supabase from './supabase';

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
};

export const deleteCabin = async (id) => {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
};

export const createCabin = async (newCabin) => {
  let imageName = newCabin.image;
  const hasUpdatedImage = typeof imageName !== 'string';

  if (hasUpdatedImage) {
    imageName = `${crypto.randomUUID()}_${imageName[0].name.replaceAll(
      '/',
      ''
    )}`;

    const { error: imageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image[0]);

    if (imageError) {
      console.log(imageError);
      throw new Error('Cabin image could not be uploaded');
    }
  }

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imageName }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return data;
};

export const updateCabin = async (
  id,
  { createdAt, updatedAt, ...cabinData }
) => {
  let imageName = cabinData.image;
  const hasUpdatedImage = typeof imageName !== 'string';

  if (hasUpdatedImage) {
    imageName = `${crypto.randomUUID()}_${imageName[0].name.replaceAll(
      '/',
      ''
    )}`;

    const { error: imageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, cabinData.image[0]);

    if (imageError) {
      console.log(imageError);
      throw new Error('Cabin image could not be uploaded');
    }
  }

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...cabinData, image: imageName })
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be updated');
  }

  return data;
};
