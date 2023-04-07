// Libs
import PropTypes from "prop-types"
import Head from "next/head";
import Acceuil from "@/pages/components/Acceuil";

// Components



export function Layout({ children: pageContent }) {
    return <div>
        <Head>
            <title>Portefolio | Lenny Paul</title>
            <meta name="description" content="Portefolio de Lenny Paul Dévellopeur Web Fullstask" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Acceuil></Acceuil>
            {pageContent}
        <footer>
            <div>Footer</div>
        </footer>
    </div>
}

Layout.propTypes = {
    /**
     * Page content
     */
    children: PropTypes.node.isRequired,
}