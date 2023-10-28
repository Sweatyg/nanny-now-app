export type FilterValue = {
  careType: string;
  gender: string;
  location: {
    district: string;
    city: string;
  };
  priceRange: {
    min: string;
    max: string;
  };
};
