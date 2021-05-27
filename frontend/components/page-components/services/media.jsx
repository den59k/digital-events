import cn from 'classnames'
import styles from './services.module.sass'

export default function Media({item}){

	if(item.type === 0)							//Если это изображение - просто выводим его
		return <img className={styles.img} src={item.src}/>

	if(item.type === 1)
		return (
			<div className={styles.containerYoutube}>
				<div></div>
			<iframe 
				className={styles.youtube}
				width="100%" 
				height="100%" 
				src={`https://www.youtube.com/embed/${item.id}?autoplay=1&controls=1&rel=0&showinfo=0&modestbranding=1`}
				frameBorder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowFullScreen={true}
			></iframe>
			</div>
		)

	return (
		<div></div>
	)
}
