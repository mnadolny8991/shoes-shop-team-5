const searchParamsMock = {
  get: (key: string) => {
    switch (key) {
      case 'search':
        return 'defaultSearch'; // Default search value
      case 'brand':
        return JSON.stringify(['DefaultBrand']);
      case 'color':
        return JSON.stringify(['DefaultColor']);
      case 'gender':
        return JSON.stringify(['DefaultGender']);
      case 'price':
        return JSON.stringify([0, 999]);
      case 'size':
        return JSON.stringify(['DefaultSize']);
      default:
        return null;
    }
  },
};

export default searchParamsMock;
