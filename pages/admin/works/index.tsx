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
    const [ message, setMessage ] = useState("");
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

    const deleteWork = async(id: string) => {
        fetch(`/api/works/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then((json) => {

                setWorks(json.works)
                setMessage(`Le travail avec l'ID ${id} a été supprimé.`)
                setIsLoading(false)
            })


    }

    // if(!isLoading){
    //     return <> <h2>Chargement</h2></>
    // }


    if(works){
        return (
            <>
                <header>
                    <h1>Mes travaux</h1>
                </header>

                <Link href="/admin/works/create">Créer</Link>

                {message && <p>{message}</p>}

                <section className="w-full px-[5vw] pb-[5vw]">
                    <div className="w-full box-border grid grid-cols-3 gap-[20px]">
                        {works.map((work) => (
                        <Link href={`/admin/works/${work._id}`}>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white" >
                                <CldImage width={200} height={200} src={work.coverImage} alt={work.title}/>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl text-[#000000] mb-2 ">{work.title}</div>
                                        <p className="text-gray-700 text-base">
                                            {work.description}
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                        <span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                        <span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
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