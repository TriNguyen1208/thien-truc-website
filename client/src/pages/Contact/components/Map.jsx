// Map Section
export default function Map ({data}) {
    const fixedIframe = data.googlemaps_embed_url
        ?.replace(/width="[^"]*"/, 'width="100%"')
        ?.replace(/height="[^"]*"/, 'height="100%"')
    return (
        <div className="container-fluid bg-[var(--light-green-banner)] py-[35px]">
            <div className="text-[30px] font-[600] text-[var(--dark-green)] mb-[30px]">
                Vị trí của chúng tôi
            </div>
            <div>
                <div 
                    className="h-[500px] break-words"
                    dangerouslySetInnerHTML={{ __html: fixedIframe }}
                />
            </div>
        </div>
    )
}