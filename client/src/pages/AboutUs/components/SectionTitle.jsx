export default function SectionTitle({ children, className = '' }) {
    return (
        <h2 className={`font-bold text-[20px] lg:text-[24px] text-[#14532D] text-center xl:text-[30px] ${className}`}>
            {children}
        </h2>
    );
}