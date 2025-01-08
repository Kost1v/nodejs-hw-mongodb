import { typeList } from '../../constants/contacts.js';

const parseContactType = ( contactType ) => {
  if (typeof contactType !== 'string') return;

  const parsedType = typeList.includes(contactType) ? contactType : typeList[0];

  return parsedType;
};


const parseFavourite = ( isFavourite ) => {

  if (typeof isFavourite !== 'string') return;

  const parsedFavorite = isFavourite.includes('true') ? true : false;

  return parsedFavorite;
};

export const parseFilterParams = ({ isFavourite, contactType }) => {

  const parsedFavorite = parseFavourite(isFavourite);
  const parsedType = parseContactType(contactType);

  return {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  };
};
