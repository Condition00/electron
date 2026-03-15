import Link from 'next/link'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

export type Collection = {
    _id: string,
    title: string,
    description: string,
    image?: string
}

export default function CollectionCard({c} : {
    c: Collection
}) {
    return(
        <Card className='relative h-100 w-9/10 md:h-180 md:w-160 font-poppins p-4 md:p-6 mb-14 overflow-hidden'>
            <CardTitle className='font-bold text-xl md:text-3xl'>{c.title}</CardTitle>
            <CardDescription className='mb-4 text-md md:text-base md:mb-8'>{c.description}</CardDescription>
            <div className='absolute bottom-0 right-0 w-2/3 h-3/5 overflow-hidden'>
                <img
                src={c.image}
                className='w-[140%] h-[140%] object-cover object-top-left'
                />
                {/* <Button className='mt-8'>
                    <Link href={`/collection/${c.title}`}>View {c.title}</Link>
                </Button> */}
            
            </div>
        </Card>
    );
}

export function HeroCollectionCard({c} : {
    c: Collection
}) {
    return(
        <div className='relative flex flex-col justify-start bg-white h-84 w-78 wmd:h-108 md:w-96 p-6 rounded-2xl overflow-hidden'>
            <div className='text-2xl font-poppins font-semibold'>{c.title}</div>
            <div className='absolute bottom-0 right-0 w-2/3 h-3/5 overflow-hidden'>
            <img 
            src={c.image}
            className='w-[120%] h-[120%] object-cover object-left-top'
            />
            </div>
        </div>
    );
}