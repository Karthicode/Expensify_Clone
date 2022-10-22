export const removeImageFromStorage = (state, action) => {
  return {
    ...state,
    uploadedImage: null,
  };
};
