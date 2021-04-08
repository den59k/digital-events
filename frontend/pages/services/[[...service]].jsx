
export default function ServicesPage() {
	return (
		<div>
			<h1>ServicesPage</h1>
		</div>
	)
}

import { getServices, getData } from 'server-side/get-static-data'

export async function getStaticProps(){

	const services = await getServices()
	const { contacts } = await getData('contacts-page', 'ru')

	return { 
		props: { services, contacts },
		revalidate: 1
	}
}

export async function getStaticPaths() {
	const services = await getServices()

	const paths = [{ params: { service: false } }];
	for(let service of services){
		if(Array.isArray(service.projects))
			for(let project of service.projects)
				paths.push({params: { service: [service.url, project.url] }})
		
		paths.push({params: { service: [service.url] }})
	}
	
	return { paths, fallback: true }
}