const raw = {
  mobile: 684,
  desktop: 1121,
};

export const breakpoint = {
  mobile: `screen and (max-width: ${raw.mobile}px)`,
  tablet: `screen and (min-width: ${raw.mobile}px) and (max-width: ${raw.desktop}px)`,
  desktop: `screen and (min-width: ${raw.desktop}px)`,
  smallerThanDesktop: `screen and (max-width: ${raw.desktop}px)`,
};
