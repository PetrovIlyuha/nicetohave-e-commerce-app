import React, { useEffect, useState } from 'react';
import { useWindowWidth } from './useWindowWidth';

const useShowSideMenu = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(false);

  const width = useWindowWidth();
  useEffect(() => {
    if (window.matchMedia('(max-width: 770px)').matches) {
      setShowMenuIcon(true);
    } else {
      setShowMenuIcon(false);
    }
  }, [width]);
  return [showSidebar, setShowSidebar, showMenuIcon];
};

export default useShowSideMenu;
