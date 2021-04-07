import cn from 'classnames'
import styles from './page.module.sass'

import Footer from './footer'

export default function Page ({children, style}){

	return (
		<div className={cn(styles.content)} style={style}>
			<div className={styles.noise}>
				<img src="/images/full-logo.png" alt="Логотип DigitalEvents" className={styles.logo}/>
				{children}
			</div>
			<Footer/>
		</div>
	)
}