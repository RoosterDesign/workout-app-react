const breakpoints = {
	tablet: 768,
	tabletLarge: 992,
	desktop: 1366,
	desktopLarge: 1920,
};

const mediaQueries = {
	tablet: `screen and (min-width: ${breakpoints.tablet}px)`,
	tabletLarge: `screen and (min-width: ${breakpoints.tabletLarge}px)`,
	desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
	desktopLarge: `screen and (min-width: ${breakpoints.desktopLarge}px)`,
};

export default mediaQueries;
