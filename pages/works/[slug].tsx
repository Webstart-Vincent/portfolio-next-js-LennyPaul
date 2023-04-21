
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { IWork } from '@/@types/work'
import { ParsedUrlQuery } from 'querystring'
interface Props {
    work: IWork | null
}
/*
const SingleWorkPage: NextPage<Props> = ({ work }) => {
    return (
        <>
            <Head>
                <title>Document</title>
            </Head>
            <h1>{work?.title ?? 'Pas de projet !'}</h1>
        </>
    )
}
interface Params extends ParsedUrlQuery {
    slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const {slug} = context.params as Params

        const response = await fetch(`${process.env.URL}/api/works/slug/${slug}`)
        const json = await response.json()
        const {work} = json

        return {
            props: {work}
        }
    } catch {
        return {
            props: {work: null},
        }
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const response = await fetch(`${process.env.URL}/api/works`)
        const json: { works?: IWork[] } = await response.json()
        const {works} = json
        if (!works) throw new Error('Pas de travaux')

        const paths = works.map((work) => ({
            params: {
                slug: work.slug ?? undefined,
            },
        }))
        return {
            paths,
            fallback: false
        }
    } catch (error) {
        console.log('pages/works/[slug].tsx > error ›', error)
        return {
            paths: "O",
            fallback: false,
        }
    }
}

 */

const SingleWorkPage: NextPage<Props> = () => {
    return (
        <>
            <Head>
                <title>Document</title>
            </Head>
            <h1>Pas de projet !</h1>
        </>
    )
}

export default SingleWorkPage
