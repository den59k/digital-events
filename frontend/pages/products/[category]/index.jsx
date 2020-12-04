import { useRouter } from 'next/router'

import Layout from 'components/common/layout'

export default function CategoryPage(props) {

	const router = useRouter();
	const { category } = router.query;

	return (
		<div>
			<h1>{category}</h1>
		</div>
	)
}
