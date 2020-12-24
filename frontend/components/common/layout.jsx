import { useEffect, useRef, useState } from 'react'
import { useImmer } from "use-immer";
import { useRouter } from 'next/router'
import cn from 'classnames'

import Head from 'next/head'
import Link from 'next/link'
import Footer from 'components/common/footer'
import styles from './layout.module.sass'

const menu = [
	{ href: "/", title: "Главная", special: true },
	{ href: "/about", title: "О нас" },
	{ href: "/services", title: "Услуги" },
	{ href: "/contacts", title: "Контакты" }
]

const menuNull = menu.map(_item => null);

const menuMap = (item) => {
	return (
		<Link href={item.href} key={item.href}>
			<a className={cn(menu.className, styles.navLink)}>
				{item.title}
			</a>
		</Link>
	)
}

const linkHeight = 40
function getStyle (index, page, width){
	const style = {};
	const right = (menu.length-index-1)*linkHeight;
	const left = index*linkHeight

	if(index < page)
		return { left: left+'px', width: linkHeight+'px' };

	if(index === page)
		return { left: left+'px', width: `calc(100vw - ${right+left}px)` }

	if(index > page)
		return {left: `calc(100vw - ${right+linkHeight}px)`, width: linkHeight+'px'};
}

let setSearchGlobal
export function useSearch(){
	const [ search, setSearch ] = useState(false)
	setSearchGlobal = setSearch
	return search;
}

function openSearch () {
	setSearchGlobal(search => !search)
}

export default function Layout (props){

	const router = useRouter();
	const pageRef = useRef();
	const mainRef = useRef();

	//page - это индекс текущей страницы
	const page = menu.reduce((page, item, index) => router.pathname.startsWith(item.href)?index: page, 0);
	
	const [ lastChildren, setLastChildren ] = useImmer(menuNull); 
	const [ scroll, setScroll ] = useState(false)
	const [ arrow, setArrow ] = useState(false)
	const [ width, setWidth ] = useState(process.browser?window.innerWidth: 0);

	useEffect(() => {
		//Здесь мы запоминаем свойства текущей страницы, чтобы потом ее отрендерить при закрытии
		setLastChildren(children => { children[page] = props.children });
		setScroll(false)
	}, [page]);

	useEffect(() => {

		const toScroll = (e) => {
			if(!pageRef.current) return

			const delta = e.deltaY
			if(pageRef.current.scrollTop > 100)
				setArrow(true)
			else
				setArrow(false)
			
			if(delta < 0)
				setScroll(false)

			if(delta > 0 && pageRef.current.offsetHeight+pageRef.current.scrollTop > pageRef.current.scrollHeight-10)
				setScroll(true)
		}

		document.addEventListener('wheel', toScroll)

		return () => document.removeEventListener('wheel', toScroll)
	}, [])
	
	return (
		<div className={styles.main} ref={mainRef}>
			<Head>
				<title>{menu[page].title}</title>
			</Head>
			{menu.map((item, index) => (
				<div key={item.href}  className={cn(styles.contentWrapper)}
					style={getStyle(index, page)}>
					{item.special?(
						<div className={cn(styles.navLink, styles.special)}>
							<Link href={item.href}>
								<a className={styles.logo}><img src="/images/logo.png" alt="Логотип Digital-Events"/></a>
							</Link>
							<a className="a" onClick={openSearch}>Поиск</a>
							<a target="_blank" href="/presentation.pdf" className="a">Презентация</a>
							<button className={cn(styles.arrow, arrow && styles.active)}>
								<img src="/images/up-arrow.svg" alt="Вернуться наверх"/>
							</button>
						</div>
					):(
					<Link href={item.href}>
						<a className={cn(styles.navLink, page === index && styles.active)}>
							{item.title}
						</a>
					</Link>
					)}
					{ index === page? (
						<>
							<div 
								ref={pageRef} 
								className={cn(styles.content, scroll && styles.scrolled)} 
								style={{width: `calc(100vw - ${linkHeight*menu.length}px)`}}
							>
								{props.children}
								
							</div>
							<Footer className={cn(scroll && styles.scrolled)}/>
						</>
					):(
						<div className={styles.content} style={{width: `calc(100vw - ${linkHeight*menu.length}px)`}}>
							{/* {lastChildren[index] } */}
						</div>
					)}
				</div>
			))}
		</div>
	)
}