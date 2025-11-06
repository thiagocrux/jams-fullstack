import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export function useResponsive() {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  return {
    isSmallScreen: breakpoints.smaller('sm'),
    isMobile: breakpoints.smaller('md'),
    isTablet: breakpoints.between('md', 'lg'),
    isDesktop: breakpoints.greater('lg'),
  };
}
