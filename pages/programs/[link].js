import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase/firebase";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
function CourseDetails({ renderer }) {
    const router = useRouter();
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Head>
                <title>{renderer?.title} | Ensight</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col h-full bg-sky-100 overflow-y-scroll scrollbar-hide">
                <Navbar />
                <div className=" w-[80%] mx-auto">
                    <h1 className="text-center text-4xl font-comicsans py-6">
                        {renderer?.title}
                    </h1>
                    <div className="flex">
                        <div className="w-1/2 flex flex-col justify-between">
                            <p className="text-lg">{renderer?.data}</p>
                            <button  onClick={()=>{router.push("/comingsoon/soon")}} className=" px-10 py-4 bg-blue-500 text-white rounded-xl ml-auto mr-4 mb-10">
                                Go to Course
                            </button>
                        </div>
                        <div className="w-1/2">
                            {/*  eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={
                                    "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/1646-GDU-Learn_to_Code_Blog_Header_.max-1000x1000.png"
                                }
                                objectFit="contain"
                                alt="image"
                                // className="my-auto"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CourseDetails;

export async function getServerSideProps(context) {
    const link = context.query.link;
    const ref = query(collection(db, "courses"), where("link", "==", link));

    const data = await getDocs(ref);

    const renderer = data?.docs?.[0].data();

    return {
        props: {
            renderer,
        },
    };
}
