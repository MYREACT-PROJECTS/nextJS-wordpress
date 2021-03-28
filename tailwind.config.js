module.exports = {
	// @see https://tailwindcss.com/docs/upcoming-changes
	future: {
	//	removeDeprecatedGapUtilities: true,
		//purgeLayersByDefault: true,
	},
	purge: [
		'./src/components/**/*.js',
		'./pages/**/*.js'],
	theme: {

		extend: {
      height:{
        'almost-screen': 'calc(100vh - 10%)'
      }
    },
	backgroundColor: theme => ({
		...theme('colors'),
		'primary': '#90dc',
		'secondary': '#000033',
		'danger': '#e3342f',
	   })
	},
	variants: {},
	plugins: [
		require( 'tailwindcss' ),
		require( 'precss' ),
		require( 'autoprefixer' )
	]
}





