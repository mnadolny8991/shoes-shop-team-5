type Size = {
  id: number;
  name: string;
};

let allSizes: Size[] = [];
for (let i = 36; i <= 45; i++) {
  allSizes.push({
    id: i - 36,
    name: 'EU-' + i,
  });
}

export default allSizes;
