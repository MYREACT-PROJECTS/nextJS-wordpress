import { gql } from '@apollo/client'
import {PAGES_COUNT} from '../utils/slugs'

/**
 * Get pages.
 *
 */
export const GET_PAGES = gql`
query MyQuery {
  pages: pages (first : 1) {  
     nodes {
       id
       slug
       uri
     }
   }
 }
 
 `