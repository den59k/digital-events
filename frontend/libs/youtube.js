import { IoIosPlayCircle } from 'react-icons/io'

const paramExp = /[\?&]v=(.+?)(&.+)?\/?$/					//https://www.youtube.com/watch?v=RNAMNX2aUQo
const urlExp = /(.be\/|.com\/)(.+?)(\?.+)?\/?$/			//https://youtu.be/RNAMNX2aUQo

export const getId = (url) => {

	let res = (url).match(paramExp);
	if(res)
		return res[1];
	
	res = url.match(urlExp);
	if(res)
		return res[2];

	return '';
}

export const getPreview = (id) => {
	return `https://img.youtube.com/vi/${id}/0.jpg`
}

