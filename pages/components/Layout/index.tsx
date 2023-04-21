// Libs
import PropTypes from "prop-types"
import Head from "next/head";
import Acceuil from "@/pages/components/Acceuil";
import { FC } from 'react'


interface Props{
    children: JSX.Element

}


const Layout: FC<Props> = ({children}) => {
    return <div>
        <Head>
            <title>Portefolio | Lenny Paul</title>
            <meta name="description" content="Portefolio de Lenny Paul Dévellopeur Web Fullstask" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Acceuil></Acceuil>
            {children}
        <footer>
            <div>Footer</div>
        </footer>
    </div>
}

export default Layout;

