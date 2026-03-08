export default async function page({
    params,
} : {
    params: Promise<{slug : string}>
}) {
    const { slug } = await params
    return(
        <div className="font-poppins text-8xl text-white bg-black">
            {slug}
        </div>
    );
}