import cn from 'classnames'

import styles from './layout.module.sass'
import contacts from 'libs/contacts'

export default function Footer ({className}){

	return (
		<footer className={cn(styles.footer, className)}>
			<div className={cn("medium-text", styles.contacts)}>
				Контакты
				<a href={`mailto:`+contacts.email} className="a">{contacts.email}</a>
				<a href={`tel:`+contacts.phone} className="a">{contacts.phoneFull}</a>
				<div className={styles.copyright}>©2021 Digital Events</div>
			</div>

			<div className={cn("medium-text", styles.contacts, styles.right)}>
				Соц. сети
				<a href={contacts.instagram} target="_blank" className="a">Instagram</a>
				<a href={contacts.facebook} target="_blank" className="a">FaceBook</a>
				<a href={contacts.youtube} target="_blank" className="a">YouTube</a>
				<a href={contacts.telegram} target="_blank" className="a">Telegram</a>
				<a href={contacts.vk} target="_blank" className="a">VK</a>
			</div>
		</footer>
	)
}