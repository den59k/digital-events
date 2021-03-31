
export function getStyle (index, page, length, linkHeight){

	const right = (length-index-1)*linkHeight;
	const left = index*linkHeight

	if(index < page)
		return { left: left+'px', width: linkHeight+'px' };

	if(index === page)
		return { left: left+'px', width: `calc(100vw - ${right+left}px)` }

	if(index > page)
		return {left: `calc(100vw - ${right+linkHeight}px)`, width: linkHeight+'px'};
}