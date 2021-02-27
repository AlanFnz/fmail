import paths from '../../../../config/paths';

const isSelected = (pathname, path) => {
  const isRootPath = path === paths.inbox && pathname === paths.root;
  return path === pathname || isRootPath;
}

export default isSelected;
