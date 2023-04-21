import { FC } from 'react';
import Link from "next/link";
import {useSession, signOut} from 'next-auth/react';
import { Dropdown } from 'flowbite';

const Acceuil: FC = () => {
    const {data : session} = useSession();
    return (
        <>
            <div className="flex flex-row px-10 place-content-between py-[3%]">
                <Link href={`/`}> Portefolio | Lenny Paul</Link>
                <div className="flex flex-row items-center gap-10">
                    <Link href={`/works`}> <span className="text-[#C778DD]">#</span>Project</Link>
                    <Link href={`/contact`}> <span className="text-[#C778DD]">#</span>Contact</Link>
                    <div>
                        &nbsp;
                        {session ? (
                            <>
                                <Link href={`/admin/works`}> <span className="text-[#C778DD]">#</span>Dashboard </Link>

                                <button onClick={() => signOut(
                                    { callbackUrl: '/' }
                                )}> <span className="text-[#C778DD]">#</span>Logout</button>
                            </>
                        ) : (
                            <Link className={"text-white-600 hover:text-primary-900 dark:text-white-400 dark:hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-primary"} href={`/api/auth/signin/crendentials`}><span className="text-[#C778DD]">#</span>Login</Link>
                        )}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Acceuil;
