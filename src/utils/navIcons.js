import Icons from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';

const preloadIcons = {
  menu: [30, theme.$navBarButtonColor],
  search: [30, theme.$navBarButtonColor],
  close: [30, theme.$navBarButtonColor],
  delete: [30, theme.$navBarButtonColor],
  comment: [30, theme.$navBarButtonColor],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  Promise.all(Object.keys(preloadIcons).map(iconName =>
    Icons.getImageSource(
      iconName,
      preloadIcons[iconName][0],
      preloadIcons[iconName][1],
    ))).then((sources) => {
    Object.keys(preloadIcons)
      .forEach((iconName, idx) => { iconsMap[iconName] = sources[idx]; });

    resolve(true);
  });
});

export {
  iconsMap,
  iconsLoaded,
};
