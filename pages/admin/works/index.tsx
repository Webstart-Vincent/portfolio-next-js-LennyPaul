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
            <div className="p-4 flex flex-col">
                <header className="flex flex-row w-screen items-center gap-[5%] px-[5vw] py-[2%]">
                    <h1 className="text-xl font-extrabold"><span className="text-[#C778DD]">#</span>projets</h1>
                    <div className="w-6/12 h-[2px] bg-[#C778DD]" ></div>
                </header>
                <div className="flex flex-col gap-4">
                    <Link href="/admin/works/create"><button className="bg-transparent hover:bg-[#C778DD] text-white font-semibold hover:text-white py-2 px-4 border border-[#C778DD] hover:border-transparent rounded">Créer</button></Link>

                    {message && <p className="text-[#C778DD]">{message}</p>}

                    <section className="w-full px-[5vw] pb-[5vw]">
                        <div className="w-full box-border grid grid-cols-3 gap-[20px]">
                            {works.map((work) => (
                                <div className="rounded overflow-hidden border-r border-t border-b border-l border-gray-400 max-w-[18rem]" >
                                    <Link href={`/works/${work.slug}`}>
                                    <div className="border-b border-gray-400">
                                        <CldImage width={300} height={200} src={work.coverImage} alt={work.title}/>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2 ">{work.title}</div>
                                        <p className="text-[#abb2bf] text-base">
                                            {work.seo.description}
                                        </p>
                                    </div>
                                    </Link>
                                    <Link className="p-4" href={`/admin/works/update/${work._id}`}>Modifier</Link>
                                    <button className="p-4" onClick={() => deleteWork(work._id)}>Supprimer</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}