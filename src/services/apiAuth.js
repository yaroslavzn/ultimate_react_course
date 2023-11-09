import supabase from './supabase';

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUser = async () => {
  let {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session || error) {
    return null;
  }

  let { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  return user;
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const createUser = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateUser = async ({ avatarFile, fullName, password }) => {
  let avatarImgName;

  if (avatarFile) {
    avatarImgName = `${crypto.randomUUID()}_${avatarFile.name}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(avatarImgName, avatarFile);

    if (error) {
      throw new Error('Something went wrong with avatar uploading');
    }
  }

  const updatedFields = {
    password,
    data: {
      fullName,
      avatar: avatarImgName,
    },
  };

  if (!password) {
    delete updatedFields['password'];
  }

  if (!fullName) {
    delete updatedFields['data']['fullName'];
  }

  if (!avatarImgName) {
    delete updatedFields['data']['avatar'];
  }

  if (!avatarFile && !fullName) {
    delete updatedFields['data'];
  }

  console.log(updatedFields);

  const { data, error } = await supabase.auth.updateUser(updatedFields);

  if (error) {
    throw new Error('Something went wrong with updating your details');
  }

  return data;
};
