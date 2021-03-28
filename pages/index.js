import Head from 'next/head'
import { isEmpty } from "lodash";

//import styles from '../styles/Home.module.css'
import client from '../src/apollo/Client'
import  GET_MENUS  from '../src/queries/get-menus'
import Layout from "../src/components/layout/index"
import { gql } from "@apollo/client";
import { handleRedirectsAndReturnData } from '../src/utils/slugs';
import {useEffect,useState} from 'react';
//import {getAuthToken} from "../src/utils/cookies";
import {useRouter} from "next/router";
import Video from '../src/components/layout'
import ReactPlayer from 'react-player';







export default function Home({data}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isControl, setIsControl] = useState(false);


  const router = useRouter();

 

   
 
  
  return (
    <Layout data={data}> 
     
     
      <img className="object-cover h-full w-full" alt="hero"
                                 src="https://tse4.mm.bing.net/th?id=OIP.ToBi7WwT6qh1IoOOsIWQLgHaEo"/> 

                              
     </Layout>
  )
}

export async function getStaticProps(context) {
   
  const{data,errors} = await client.query({
    query:GET_MENUS
  })
 const defaultProps = {

   props: {
     data: data || {},
   }, 
   revalidate : 1 ,
  // will be passed to the page component as props
 }
 return handleRedirectsAndReturnData(defaultProps, data, errors, 'page')
 
}


