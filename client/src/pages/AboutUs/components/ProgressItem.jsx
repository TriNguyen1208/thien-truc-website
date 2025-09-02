export default function ProgressItem({ icon, label, value, percent }) {
    return (
        <div className="mb-[30px] text-[14px] lg:text-[16px]">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-green-700">
                    {icon}
                    <span>{label}</span>
                </div>
                <span className="font-semibold text-green-800">{value}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-green-100">
                <div
                    className="h-full bg-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}