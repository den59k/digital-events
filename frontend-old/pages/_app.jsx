import 'styles/globals.sass'
import Layout from 'components/common/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
  	<Layout>
  		<Head>
  			<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"/>
  		</Head>
  		<Component {...pageProps} />
  	</Layout>
  );
}

export default MyApp
