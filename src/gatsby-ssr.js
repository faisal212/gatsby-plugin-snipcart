import React from 'react'

let warning = false
let linkToLangFile = null

exports.onRenderBody = ({ setPostBodyComponents }, options = {}) => {
	options = Object.assign({
		apiKey: process.env.GATSBY_SNIPCART_API_KEY,
		autopop: false,
		js: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
		styles: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
		language: `${linkToLangFile}`,
	}, options)

	if(!options.apiKey){
		if (!warning) {
			warning = true
			console.log('No Snipcart API key found')
		}
		return
	}

	const components = [
		<script key='snipcartJs' defer src={options.js} id="snipcart" data-api-key={options.apiKey} data-autopop={options.autopop}></script>
	]
	if(options.jquery){
		components.unshift(<script defer key='snipcartJquery' src={options.jquery}></script>)
	}
	if (options.styles){
		components.push(<link key='snipcartStyle' href={options.styles} type="text/css" rel="stylesheet" />)
	}
	if (options.language){
		components.push(<script key='snipcartLanguage' src={options.language}></script>)
	}

	return setPostBodyComponents(components)
}
