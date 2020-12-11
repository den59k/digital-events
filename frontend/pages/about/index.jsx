import cn from 'classnames'
import PageLayout from 'components/common/layout-page'
import pageStyles from 'styles/page.module.sass'

export default function ContactsPage({pageData}) {
	return (
		<PageLayout>
			<h1>О нас</h1>
			<div className="medium-text ml">{pageData.first.text}</div>
			{pageData.first.image && (<img className={pageStyles.image} src={pageData.first.image.src} alt="Digital Events"/>)}

			<div className={pageStyles.flex}>
				<div className="medium-text">{pageData.second.text}</div>
				{pageData.second.image && (<img className={pageStyles.image} src={pageData.second.image.src} alt="Digital Events"/>)}
			</div>

			<div className="medium-text ml">{pageData.third.text}</div>
			{pageData.third.image && (<img className={pageStyles.image} src={pageData.third.image.src} alt="Digital Events"/>)}
		</PageLayout>
	)
}

import { getData } from 'libs/get-static-data'

export async function getStaticProps(){
	const pageData = await getData('about-page', 'ru')

	return { 
		props: { pageData },
		revalidate: 1
	}
}