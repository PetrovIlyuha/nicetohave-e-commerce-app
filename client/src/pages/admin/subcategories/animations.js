export const slideInLeft = {
  hidden: { x: -200, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.75, ease: 'easeOut' } },
};

export const zoomIn = {
  hidden: { scale: 0.5, opacity: 0.5 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeIn' } },
};

export const slideDownFadeIn = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
  exit: {
    y: -100,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', when: 'beforeChildren' },
  },
};
