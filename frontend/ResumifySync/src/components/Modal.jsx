import React from 'react'

const Modal = ({
    children,
    isOpen, 
    onClose,
    title,
    hideHeader,
    showActionBtn,
    actionBtnIcon = null,
    actionBtnText,
    onActionBtnClick
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/40  bg-opacity-50' style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className={`relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden`}>
            {!hideHeader && (
                <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                    <h3 className='md:text-lg font-medium border-gray-900'>{title}</h3>
                    {showActionBtn && (
                        <button 
                            className='btn-small-light mr-12'
                            onClick={() => onActionBtnClick()}
                        >
                            {actionBtnIcon}
                            {actionBtnText}
                        </button>
                    )}
                </div>
            )}
            <button
                type='button'   
                className="bg-transparent text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center absolute top-3.5 right-3.5"
                onClick={onClose}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>

            <div className='flex-1 p-4 overflow-y-auto custom-scrollbar'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal