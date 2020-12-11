export default function Youtube ({id}){
	return (
		<iframe 
			width="100%" 
			height="600px" 
			src={`https://www.youtube.com/embed/${id}?controls=0&rel=0&showinfo=0&modestbranding=1`}
			frameBorder="0" 
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
			allowFullScreen={true}
			allow='autoplay'>
		</iframe>
	)
}