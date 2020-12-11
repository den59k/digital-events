import { useRouter } from 'next/router'
import cn from 'classnames'

import Link from 'next/link'
import styles from 'styles/services.module.sass'
import LayoutPage from 'components/common/layout-page'

export default function HomePage({services}) {
	const router = useRouter()
	const { service } = router.query
	
	const categoryUrl = Array.isArray(service)?service[0]: ""
	const projectUrl = Array.isArray(service)?service[1]: ""
	
	const category = categoryUrl? services.find(item => item.url === categoryUrl): null
	const project = (projectUrl && category && category.projects)? category.projects.find(item => item.url === projectUrl): null

	return (
		<LayoutPage>
			<h1>Услуги</h1>
			<ul className={styles.categories}>
				{services.map((item, index) => (
					<li key={index}>
						<Link href={'/services/'+item.url}>
							<a className={cn(categoryUrl === item.url && styles.active)}>{item.title.ru}</a>
						</Link>
					</li>
				))}
			</ul>
			<Category category={category} projectUrl={projectUrl}/>
			{project && project.services && project.services.map((item, index) => <Service service={item} key={index}/>)}
			{project && project.cases && (
				<>
					<h2>Реализованные проекты</h2>
					<div className={styles.gallery}>
						{project.cases.map((item, index) => <Media item={item} key={index}/>)}
					</div>
				</>
			)}
		</LayoutPage>
	)
}

function Media({item}){

	if(item.type === 0)							//Если это изображение - просто выводим его
		return <img src={item.src}/>

	return (
		<div></div>
	)
}

function Category ({category, projectUrl}){
	if(!category) return <div></div>

	return (
		<>
			<div className="medium-text" style={{marginTop: "1em"}}>{category.text.ru}</div>
			<ul className={styles.projects}>
			{category.projects && category.projects.map((item, index) => (
				<li key={index}>
					<Link href={'/services/'+category.url+'/'+item.url}>
						<a className={cn(projectUrl === item.url && styles.active)}>{item.title.ru}</a>
					</Link>
				</li>
			))}
			</ul>
		</>
	)
}

function Service ({service}) {

	return (
		<>
			<h2>{service.title.ru}</h2>
			<div className="medium-text">{service.text.ru}</div>
			<div className={cn(styles.gallery, styles.bordered)}>{Array.isArray(service.gallery) && service.gallery.map((item, index) => (
				<img key={index} src={item.src} alt={service.title.ru}/>
			))}</div>
		</>
	)
}


import { getServices } from 'libs/get-static-data'

export async function getStaticProps(){

	const services = await getServices()

	return { props: { services } }
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