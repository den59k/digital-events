import cn from 'classnames'
import contacts from 'libs/contacts'
import PageLayout from 'components/common/layout-page'
import styles from 'styles/contacts.module.sass'

export default function ContactsPage() {
	return (
		<PageLayout>
			<h1>Контакты</h1>
			<div className={styles.contacts}>
				<Contact title="Электронная почта">
					<a href={"mailto:"+contacts.email} className="a">{contacts.email}</a>
				</Contact>
				<Contact title="Соц. сети">
					<a href={contacts.instagram} className="a" target="_blank">Instagram</a>,
					<a href={contacts.facebook} className="a" target="_blank"> FaceBook</a>,
					<a href={contacts.youtube} className="a" target="_blank"> YouTube</a>,
					<a href={contacts.telegram} className="a" target="_blank"> Telegram</a>,
					<a href={contacts.vk} className="a" target="_blank"> VK</a>
				</Contact>
				<Contact title="Адрес">
					{contacts.address}
				</Contact>
				<Contact title="Телефон">
					<a href={"tel:"+contacts.phone} className="a">{contacts.phoneFull}</a>
				</Contact>
			</div>
		</PageLayout>
	)
}

function Contact ({title, children}){
	return (
		<div className={cn(styles.contact, "ml")}>
			<div className="medium-text">{title}</div>
			<div className={styles.sub}>{children}</div>
		</div>
	)
}

