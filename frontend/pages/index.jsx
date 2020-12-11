import { useState } from 'react'
import cn from 'classnames'
import { getId } from 'libs/youtube'
import { _lang } from 'libs/rus'

import pageStyles from 'styles/page.module.sass'

import Link from 'next/link'
import LayoutPage from 'components/common/layout-page'
import Youtube from 'components/youtube'
import { Form } from 'components/form'

export default function HomePage({pageData, services}) {

	const [ openedCategory, setOpenedCategory ] = useState(-1)

	return (
		<LayoutPage>
			<div className="big-text" style={{margin: "0.8em 0"}}>{pageData['short-description'].text}</div>
			<div className={pageStyles.fullVideo}><Youtube id={pageData.video.id}/></div>
			<div className="medium-text" style={{margin: "0.8em 0"}}>{pageData['about'].text}</div>
			<div>
				<h2>Мы разрабатываем</h2>
				<ul className={cn(pageStyles.services, "ml")}>
					{services && services.map((item, index) => (
						<li key={index}>
							<button className="a" onClick={() => setOpenedCategory(index)}>{_lang(item.title)}</button>
								{openedCategory === index && item.projects && (
								<div className={pageStyles.linkList}>
									{item.projects.map((project, index) => (
										<Link href={'/services/'+item.url+'/'+project.url} key={index}>
											<a className="a">
												{project.title.ru}
												<img src="/images/up-arrow.svg" alt="Стрелка"/>
											</a>							
										</Link>
									))}
								</div>
								)}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h2>Задайте вопрос</h2>
				<Form className="ml"/>
			</div>

		</LayoutPage>
	)
}

import { getData, getServices } from 'libs/get-static-data'

export async function getStaticProps(){
	const pageData = await getData('main-page', 'ru')

	const services = await getServices()

	if(pageData.video)
		pageData.video.id = getId(pageData.video.video)

	return { props: { pageData, services } }
}