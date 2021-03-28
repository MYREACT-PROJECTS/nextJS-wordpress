import client from "../apollo/client";
//import {GET_PAGE_BY_ID} from "../src/queries/pages/get-page";
import LOGIN from "../mutations/login";
import { v4 } from "uuid";




export async function loginUser({username, password}) {

    const { data, errors } = await client.query({
        query: LOGIN,
        variables: {
            input: {
                clientMutationId: v4(), // Generate a unique id
                username: username || '',
                password: password || '',
            },
        },
    });

    return data || {};
}
