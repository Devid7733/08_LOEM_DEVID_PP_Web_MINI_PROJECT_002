import React from 'react'
import { redirect } from 'next/navigation';
import { auth } from '../../../../auth';

export default async function page() {
    // const session = await auth();
    //   if (!session?.user){
    //     redirect("/login?callbackUrl=/products");
    //   }
  return (
    <div>page</div>
  )
}
