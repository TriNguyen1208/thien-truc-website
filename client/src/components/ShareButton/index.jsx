import React from 'react'
import { useState } from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
} from 'react-share'
import {Modal, Button, message, Space} from 'antd'
import { ShareAltOutlined, CopyOutlined  } from '@ant-design/icons'
import logoZalo from '@/assets/images/logo_zalo.png';
import LazyLoad from 'react-lazyload';
const ShareButton = ({id}) => {
    const [open, setOpen] = useState(false);
    const currentUrl = window.location.href + `/${id}`
    const handleCopy = async () => {
        try{
            await navigator.clipboard.writeText(currentUrl)
            message.success('Copied to clipboard!')
        }catch{
            message.error('Failed to copy')
        }
    }
    return (
        <div 
            onClick={(e)=>e.stopPropagation()}
            onMouseDown={(e)=>e.stopPropagation}
        >
            <Button 
                type="primary" 
                onClick={(e) =>{
                    e.stopPropagation();   // Ngăn sự kiện lan ra thẻ Link
                    e.preventDefault();
                    setOpen(true);
                }}
                style={{backgroundColor: "var(--green-bg)"}}
            >
                <ShareAltOutlined
                    style={{ fontSize: '16px', cursor: 'pointer' }}
                    className="hover:text-gray-700"
                />
            </Button>
            <Modal
                title="Chia sẻ liên kết"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <p 
                    style={{ wordBreak: 'break-word', marginBottom: 8 }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e)=> e.stopPropagation()}
                >
                    {currentUrl}
                </p>
                <Button 
                    type="dashed" 
                    block 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCopy();
                    }} 
                    style={{ marginBottom: 16 }}
                >
                    <CopyOutlined /> Copy Link
                </Button>
                <Space wrap>
                    <FacebookShareButton url={currentUrl}><FacebookIcon size={40} round /></FacebookShareButton>
                    <TwitterShareButton url={currentUrl}><TwitterIcon size={40} round /></TwitterShareButton>
                    <TelegramShareButton url={currentUrl}><TelegramIcon size={40} round /></TelegramShareButton>

                    {/* Zalo Share */}
                    <a
                        href={`https://zalo.me/share?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={logoZalo}
                            alt="Zalo"
                            width={40}
                            height={40}
                            style={{ borderRadius: '50%', position: 'relative', top:'-3px'}}
                        />
                    </a>
                </Space>
            </Modal>
        </div>
    )
}

export default ShareButton