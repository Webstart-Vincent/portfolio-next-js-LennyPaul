import { GetServerSideProps } from 'next'
import { IWork } from '@/@types/work'
import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary';



type Props = {
    work: IWork[];
}

export default function Works({ work }: Props){
    const [ works, setWorks ] = useState<IWork[] | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        fetch(`/api/works`)
            .then(response => response.json())
            .then((json) => {

                setWorks(json.works)
                setIsLoading(false)
            })
    }, [])

    if(works){
        return (
            <>
                <header className="flex flex-row w-screen items-center gap-[5%] px-[5vw] py-[2%]">
                    <h1 className="text-xl font-extrabold"><span className="text-[#C778DD]">#</span>projets</h1>
                    <div className="w-6/12 h-[2px] bg-[#C778DD]" ></div>
                </header>
                <section className="w-full px-[5vw] pb-[5vw]">
                    <div className="w-full box-border grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-[20px]">
                        {works.map((work) => (
                            <Link href={`/admin/works/${work.slug}`}>
                                <div className="rounded overflow-hidden border-r border-t border-b border-l border-gray-400 max-w-[18rem]" >
                                    <div className="border-b border-gray-400">
                                        <CldImage width={300} height={200} src={work.coverImage} alt={work.title}/>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2 ">{work.title}</div>
                                        <p className="text-[#abb2bf] text-base">
                                            {work.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </>
        )
    }
}