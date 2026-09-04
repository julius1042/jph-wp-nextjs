const WORDPRESS_HOME_URL=process.env.WORDPRESS_HOME_URL
const WORDPRESS_MAIN_MENU=process.env.WORDPRESS_MAIN_MENU

import { MenuItem } from './types'

export async function getPageDataByUrl( url: string ){


    if(!WORDPRESS_HOME_URL){
        console.log('Missing WORDPRESS_HOME_URL environment variable')
        return null
    }

    try{

        const response = await fetch(`${url}`)
        if(!response.ok) throw new Error(`HTTP error status: ${response.status}`)
        
        const contentType = response.headers.get('content-type');
       

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            return data[0] ?? null
        }else if ( contentType && contentType.includes('text/html') ){
            const text =  await response.text();
        //    data =  JSON.parse(text)
            return text
        }else{
            throw new Error(`Expected JSON but received: ${contentType}`);
        }
       

    }catch(error){
        console.log(`Failed to fetch data for the URL ${url}: ${error}`);
        return null
    }
}

export async function getPageDataBySlug( slug: string ){


    if(!WORDPRESS_HOME_URL){
        console.log('Missing WORDPRESS_HOME_URL environment variable')
        return null
    }

    try{

        const response = await fetch(`${WORDPRESS_HOME_URL}/wp-json/wp/v2/pages?slug=${slug}`)
       
        if(!response.ok) throw new Error(`HTTP error status: ${response.status}`)
        
        const contentType = response.headers.get('content-type');
       

        if (contentType && contentType.includes('application/json')) {
            
            const data = await response.json()
            return data[0] ?? null
        }else if ( contentType && contentType.includes('text/html') ){
            const text =  await response.text();
            return text
        }else{
            throw new Error(`Expected JSON but received: ${contentType}`);
        }
       

    }catch(error){
        console.log(`Failed to fetch data for the page ${slug}: ${error}`);
        return null
    }
}

export async function getPageDataByPageId( id: Number ){


    if(!WORDPRESS_HOME_URL){
        console.log('Missing WORDPRESS_HOME_URL environment variable')
        return null
    }

    try{

        const response = await fetch(`${WORDPRESS_HOME_URL}/wp-json/wp/v2/pages/${id}`)
       
        if(!response.ok) throw new Error(`HTTP error status: ${response.status}`)
        
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            
            const data = await response.json()
            return data ?? null
        }else if ( contentType && contentType.includes('text/html') ){
            const text =  await response.text();
        //    data =  JSON.parse(text)
            return text
        }else{
            throw new Error(`Expected JSON but received: ${contentType}`);
        }
       

    }catch(error){
        console.log(`Failed to fetch data for the page ID ${id}: ${error}`);
        return null
    }
}


export async function getMenuItems(): Promise<MenuItem[]>{
    if(!WORDPRESS_MAIN_MENU){
        console.log('Missing WORDPRESS_MAIN_MENU environment variable');
        return []
    }
    const response = await fetch(
        `${WORDPRESS_HOME_URL}${WORDPRESS_MAIN_MENU}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch Menu location, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}