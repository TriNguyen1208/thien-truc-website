import Switch from 'react-switch'
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading'
export default function SwitchButton({handleToggle, currentState}){
    const [checked, setChecked] = useState(currentState);
    //Cập nhật checked khi currentstate thay đổi
    useEffect(() => {
        setChecked(currentState);
    }, [currentState])

    const handleClick = () => {
        setChecked(!checked)
        handleToggle(!checked)
    }
    return(
        checked !== null ? 
        <div onClick={handleClick}>
            <Switch
                onChange={() => {}}
                checked={checked}
                onColor="#000000"    // màu khi bật
                offColor="#ccc"      // màu khi tắt
                uncheckedIcon={false} // ẩn chữ OFF
                checkedIcon={false}   // ẩn chữ ON
                height={24}           // chiều cao
                width={50}            // chiều rộng
                handleDiameter={20}   // đường kính nút tròn
          />
        </div>: <Loading/>
    )
}