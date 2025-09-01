import Card from '@/components/Card'
export default function DisplayCards ({data})
{
    return(
        <div className='flex flex-col'>
            <h1 className='text-black text-[20px] font-semibold my-[24px]'> { data.title } </h1>
            <div className='flex flex-row gap-[24px]'>
                {
                    data.cards.map((card, index) => {
                        return (
                            <div key={index} className='w-[370px] h-[130px] '>
                                <Card {...card}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}