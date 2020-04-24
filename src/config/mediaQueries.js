const breakpoints = {
	largeDesktop: 1025,
	mediumDesktop: 900,
	desktop: 769,
	largeMobile: 540,
	mediumMobile: 380,
};

const mediaQueries = {
	mediumMobile: `screen and (min-width: ${breakpoints.mediumMobile}px)`,
	largeMobile: `screen and (min-width: ${breakpoints.largeMobile}px)`,
	desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
	mediumDesktop: `screen and (min-width: ${breakpoints.mediumDesktop}px)`,
	largeDesktop: `screen and (min-width: ${breakpoints.largeDesktop}px)`,
};

export default mediaQueries;
