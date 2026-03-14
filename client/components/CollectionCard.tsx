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
        <Card className='font-poppins p-4 md:p-6 mb-14'>
            <CardTitle className='font-bold text-xl md:text-3xl'>{c.title}</CardTitle>
            <CardDescription className='mb-4 text-md md:text-base md:mb-8'>{c.description}</CardDescription>
            <CardFooter className='flex-col'>
                <img
                src={c.image}
                className='w-[12rem] md:w-sm md:ml-32'
                />
                <Button className='mt-8'>
                    <Link href={`/collection/${c.title}`}>View {c.title}</Link>
                </Button>
            
            </CardFooter>
        </Card>
    );
}

export function HeroCollectionCard({c} : {
    c: Collection
}) {
    return(
        <Card className='p-2'>
            <CardTitle>{c.title}</CardTitle>
            <CardFooter>
                <img
                src={c.image}
                className='w-32'
                />
            </CardFooter>
        </Card>
    );
}