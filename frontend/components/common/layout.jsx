import { useEffect, useRef, Fragment, useState } from 'react'
import { useImmer } from "use-immer";
import { useRouter } from 'next/router'
import cn from 'classnames'

import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.sass'

const menu = [
	{ href: "/", title: "Главная", className: styles.special },
	{ href: "/about", title: "О нас" },
	{ href: "/products", title: "Услуги" },
	{ href: "/contacts", title: "Контакты" }
]

const menuNull = menu.map(item => null);

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

export default function Layout (props){

	const router = useRouter();
	const pageRef = useRef();
	const mainRef = useRef();

	const page = menu.reduce((page, item, index) => router.pathname.startsWith(item.href)?index: page, 0);

	const [ lastChildren, setLastChildren ] = useImmer(menuNull); 
	const [ width, setWidth ] = useState(process.browser?window.innerWidth: 0);

	useEffect(() => {

		setLastChildren(children => { children[page] = props.children });
		pageRef.current = page;

	}, [page]);


	return (
		<div className={styles.main} ref={mainRef}>
			<Head>
				<title>{menu[page].title}</title>
			</Head>
			{menu.map((item, index) => (
				<div key={item.href}  className={cn(styles.contentWrapper)}
					style={getStyle(index, page)}>
					<Link href={item.href}>
						<a className={cn(menu.className, styles.navLink, page === index && styles.active)}>
							{item.title}
						</a>
					</Link>
					{ index === page? 
						<div className={styles.content} style={{width: `calc(100vw - ${linkHeight*menu.length}px)`}}>{props.children}</div>: 
						<div className={styles.content} style={{width: `calc(100vw - ${linkHeight*menu.length}px)`}}>{lastChildren[index] }</div>
					}
				</div>
			))}
		</div>
	)
}