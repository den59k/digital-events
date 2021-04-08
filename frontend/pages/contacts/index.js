
export default function ContactPage() {
	return (
		<div>
			<h1>ContactPage</h1>
		</div>
	)
}


import { getData } from 'server-side/get-static-data'

export async function getStaticProps(){

	const { contacts } = await getData('contacts-page', 'ru')

	return { 
		props: { contacts },
		revalidate: 1
	}
}