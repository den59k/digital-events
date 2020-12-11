import cn from 'classnames'
import styles from './layout-page.module.sass'
import { useSearch } from './layout'

export default function LayoutPage ({children}){

	const search = useSearch()

	return (
		<div className={styles.main}>
			<header>
				<img src="/images/full-logo.png" alt="Лого Digital Events"/>
				<Search className={cn(search && styles.opened)}/>
			</header>
			{children}
		</div>
	)
}

function Search({className}){
	return (
		<div className={cn(styles.search, className)}>
			<input placeholder="Поиск по сайту"/>
		</div>
	)
}