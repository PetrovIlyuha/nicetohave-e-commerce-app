export const slideInLeft = {
  hidden: { x: -200, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.75, ease: 'easeOut' } },
  exit: { x: -200, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
};

export const slideInRight = {
  hidden: { x: 200, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.75, ease: 'easeOut' } },
};

export const zoomIn = {
  hidden: { scale: 0.5, opacity: 0.5 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeIn' } },
};

export const rotateYLeftToRight = {
  hidden: {
    opacity: 0,
    rotateY: -90,
  },
  show: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    rotateY: 90,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
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
