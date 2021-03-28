import { isEmpty } from "lodash";
import Link from "next/link";
import {useState} from 'react'

const Nav = ({headerMenus,header}) => {

	if ( isEmpty(headerMenus) ) {
		return null;
	}

	const [ isMenuVisible, setMenuVisibility ] = useState(false);
  console.warn("header",header)

	return (
		<div className=''>
		<nav className="flex  items-center justify-between flex-wrap bg-white box-border shadow-lg p-6 ">
			<div className="flex   items-center flex-shrink-0 text-white mr-6 ">
				<Link href="http://localhost:3000">
					<a>
				<img src={header.siteLogoUrl} width='150' height="100" className="mr-4"/>
				</a>
				</Link>
				<div className="flex flex-col items-center justify-start	">
				<span className="font-semibold text-xl tracking-tight has-text-color-black text-black">{header?.siteTitle}</span>
				<span className="text-black text-sm">{header?.siteTagLine}</span>
				</div>
			</div>
			<div className="block   lg:hidden">
				<button
					onClick={() => setMenuVisibility(! isMenuVisible)}
					className="flex sticky top-0 items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-black hover:border-secondary">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
					</svg>
				</button>
			</div>
			<div className={`${ isMenuVisible ? 'max-h-full' : 'h-0' }   overflow-hidden lg:h-auto text-color-blue-300 w-full block flex-grow lg:flex lg:items-center  justify-end lg:w-auto sticky top-0`}>
				{ headerMenus?.length ? (
					//<div className="text-m lg:flex-grow ml-7 justify-between-space  flex items-end ">
						 headerMenus?.map( menu => (
							<Link key={menu?.node.id} href={menu?.node?.path}>
								<a
									className="block   mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:color-blue-200 mr-4 text-m">
									{menu?.node?.label}
								</a>
							</Link>
						) ) 
					//</div>
				) : null }
				<div>
					<a href="#"
					   className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Contact</a>
				</div>
			</div>
		</nav>
		</div>
	)
}

export default Nav;