import { isNonEmptyArray } from '@apollo/client/utilities'
import {isEmpty,isArray} from 'lodash'
import{sanitize} from '../../utils/miscellanous'
import Link from "next/link";
import {getIconComponentByName} from '../../utils/icon-map'


    

const Footer =({footer,footerMenus})=>{
    
    
    return(
        <footer className=" flex  w-full bottom-0  bg-secondary p-6 mb-auto">
        <div className="flex  flex-wrap -mx-2 overflow-hidden">

  <div class="my-2 px-2 w-1/3 overflow-hidden sm:w-1/3 lg:w-1/3 xl:w-1/3">
  <div className="text-white" dangerouslySetInnerHTML={{__html: sanitize(footer?.sidebarOne) }} /> 
  </div>    

  <div className="my-2 px-2 w-1/3 overflow-hidden sm:w-1/3 lg:w-1/3 xl:w-1/3">
  <div className="text-white" dangerouslySetInnerHTML={{__html: sanitize(footer?.sidebarTwo) }} /> 
    
  </div>

<div  className="my-2 px-2 w-1/3 overflow-hidden sm:w-1/3 lg:w-1/3 xl:w-1/3">
   

  </div>

</div>

<div class="flex flex-col  overflow-hidden justify-start items-center ">

  <div class="justify-center">
  { ! isEmpty(footer?.socialLinks) && isArray(footer?.socialLinks) ?
   (
     <ul className="flex items-center justify-end">
     {footer?.socialLinks.map(sociallink =>(
       <li key ={sociallink?.iconName} className="ml-2">
         <a href={sociallink?.iconUrl}>
           {getIconComponentByName(sociallink?.iconName)}

         </a>
       </li>
     ))}
</ul>
     ) :null
     
    }
  </div>

  <div class="text-white">
  {footer?.copyrightText ? footer?.copyrightText  : "@ Copyrighits aroma insider" }
  </div>

</div>

</footer>
    )
}

export default Footer