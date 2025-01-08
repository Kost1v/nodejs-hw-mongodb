export const parseFilterParams = ({isFavourite}) => {

  if (typeof isFavourite !== 'string') return;

  const favorite = isFavourite.includes("true") ? true : false;

  return favorite;
};
