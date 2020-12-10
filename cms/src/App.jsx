import React from 'react'
//import useSWR from 'swr'
//import { GET, POST } from 'libs/fetch'
import Layout from 'components/layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { IoIosHome, IoMdBook, IoIosApps, IoMdPerson } from 'react-icons/io'


import MainPage from 'pages/main-page'
import ServicesPage from 'pages/services-page'

const menu = [
	{ icon: <IoIosHome/>, title: "Главная страница", to: "/", component: <MainPage/> },
	{ icon: <IoMdBook/>, title: "О нас", to: "/about", component: <MainPage/> },
	{ icon: <IoIosApps/>, title: "Услуги", to: "/services", component: <ServicesPage/> },
	{ icon: <IoMdPerson/>, title: "Контакты", to: "/contacts", component: <MainPage/> }
]


export default function App() {
	
	//const { data } = useSWR('/api', GET)

	return (
		<Router>
			<Layout menu={menu}>

			</Layout>
		</Router>
	);
}
