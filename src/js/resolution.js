export const resolution = value => {
  switch (value) {
    case '0':
      return { width: 384, height: 704 };
    case '1':
      return { width: 384, height: 640 };
    case '2':
      return { width: 448, height: 576 };
    case '3':
      return { width: 512, height: 512 };
    case '4':
      return { width: 576, height: 448 };
    case '5':
      return { width: 610, height: 366 };
    case '6':
      return { width: 610, height: 333 };
    default:
      break;
  }
};
