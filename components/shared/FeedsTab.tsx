

import { fetchUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Props{
  accountId:string, 
}

const FeedsTab = async({accountId}: Props) => {

  let result = await fetchUserPosts(accountId);  
  if(!result) redirect("/")
  result.sort((a:any, b:any) => b.createdAt - a.createdAt)

  return (
    <section className='mt-9 grid grid-cols-3 max-sm:gap-1 gap-4 w-full'>
      {result.map((post:any) => (
        <Link href={`/post/${post._id}`} key={post._id}>
          <div className='relative aspect-square h-auto w-auto'>            
            <Image src={post.image} alt="post" fill
              className=" object-cover"
            />
          </div>
        </Link>
      ))}      
    </section>
  )
}

export default FeedsTab