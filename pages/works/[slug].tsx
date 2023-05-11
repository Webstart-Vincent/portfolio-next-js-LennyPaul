import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { IWork } from '@/@types/work'
import { ParsedUrlQuery } from 'querystring'
import { CldImage } from 'next-cloudinary';
interface Props {
    work: IWork
}
const SingleWorkPage: NextPage<Props> = ({ work }) => {
    return (
        <>
            <Head>
                <title>{work.title}</title>
            </Head>
            <header className="flex flex-row w-screen items-center gap-[5%] px-[5vw] py-[2%] ">
                <h1 className="text-xl font-extrabold"><span className="text-[#C778DD]">#</span>   {work.title}</h1>
                <div className="w-6/12 h-[2px] bg-[#C778DD]" ></div>
            </header>
            <section className=" container  md:pl-[10%] lg:pl-[10%] flex flex-col lg:flex-row md:flex-row sm: items-center gap-11 mt-16">
                <div className="">
                    <CldImage  width={300} height={200} src={work.coverImage} alt={work.title}/>
                </div>
                <div>
                    <h2><span className="text-[#C778DD]">#</span>Description :</h2>
                    <p className="pl-4 max-w-md">{work.description}</p>
                </div>
            </section>
        </>
    )
}
interface Params extends ParsedUrlQuery {
    slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const {slug} = context.params as Params

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/works/slug/${slug}`)
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
export const getStaticPaths = async () => {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/works`)
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
            notfound: true,

        }
    }
}
export default SingleWorkPage