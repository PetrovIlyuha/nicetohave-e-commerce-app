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
    if (showSidebar) {
      setShowMenuIcon(false);
    } else {
      setShowMenuIcon(true);
    }
  }, [width]);
  return [showSidebar, setShowSidebar, showMenuIcon, setShowMenuIcon];
};

export default useShowSideMenu;
