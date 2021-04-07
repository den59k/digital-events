import Page from 'components/page'

import styles from './main.module.sass'

import Categories from 'components/page-components/categories'
import Video from 'components/page-components/video'

export default function HomePage({pageData, services}) {


	return (
		<>
			<div className="big-text" style={{margin: "2em 0"}}>{pageData['short-description'].text}</div>
			<Video/>
			<div className="medium-text" style={{margin: "0.8em 0"}}>{pageData['about'].text}</div>
			<Categories services={services}/>
		</>
	)
}


import { getData, getServices } from 'server-side/get-static-data'

export async function getStaticProps(){
	const pageData = await getData('main-page', 'ru')

	const services = await getServices()

	return { 
		props: { pageData, services },
		revalidate: 1
	}
}