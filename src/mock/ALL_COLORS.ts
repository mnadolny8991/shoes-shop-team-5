export type Color = {
  id: number;
  name: string;
};

const ALL_COLORS: ReadonlyArray<Color> = [
  'beige',
  'black',
  'blue',
  'golden',
  'gray',
  'green',
  'indigo',
  'khaki',
  'magenta',
  'orange',
  'pink',
  'purple',
  'red',
  'taupe',
  'umber',
  'violet',
  'white',
  'yellow',
].map((name, id) => ({ id, name }));

export default ALL_COLORS;
