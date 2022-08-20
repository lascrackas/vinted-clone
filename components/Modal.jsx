import React,{Fragment, useRef, useState} from 'react'
import {useRecoilState} from 'recoil';
import {modalState} from '../atoms/ModalAtom';
import { Dialog,Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import Signup from '../components/Signup';

const Modal = () => {
    
    const [open,setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const {data:session} = useSession();


    const addImageToPost = (e) => {
        console.log(e.target.files)
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const uploadPost = async () => {
        if(loading) return

        setLoading(true);

        setOpen(false);


       

       


        setLoading(false);
        setSelectedFile(null);

    } 

    return (
        <>
          <>
          <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=> setOpen(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-60" />
              </Transition.Child>
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      
                        <Signup />
                      
                      
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
        </>
      )
}

export default Modal